export const REFERENCE_IMAGE_MAX_SOURCE_BYTES = 25 * 1024 * 1024;
export const REFERENCE_IMAGE_MAX_OUTPUT_BYTES = 5 * 1024 * 1024;
export const REFERENCE_IMAGE_MAX_EDGE = 1920;
export const REFERENCE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export type ImageAdjustments = {
  brightness: number;
  contrast: number;
};

export type ProcessedReferenceImage = ImageAdjustments & {
  file: File;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalBytes: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export const getReferenceTargetDimensions = (
  width: number,
  height: number,
  maxEdge = REFERENCE_IMAGE_MAX_EDGE,
) => {
  if (width <= 0 || height <= 0 || maxEdge <= 0) {
    throw new Error("Érvénytelen képméret.");
  }
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
};

/**
 * Conservative automatic correction: dark images get a small lift and flat
 * images a little contrast. Already balanced images remain nearly untouched.
 */
export const calculateAutoImageAdjustments = (
  meanLuminance: number,
  luminanceDeviation: number,
): ImageAdjustments => {
  const mean = clamp(meanLuminance, 1, 255);
  const deviation = clamp(luminanceDeviation, 0, 128);
  const brightness = clamp(132 / mean, 0.92, 1.1);
  const contrast = deviation < 48
    ? clamp(1 + ((48 - deviation) / 48) * 0.1, 1, 1.1)
    : 1;
  return {
    brightness: Number(brightness.toFixed(3)),
    contrast: Number(contrast.toFixed(3)),
  };
};

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("A kép átalakítása nem sikerült.")),
      "image/webp",
      quality,
    );
  });

const loadHtmlImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("A kép nem olvasható."));
    };
    image.src = url;
  });

const decodeImage = async (file: File): Promise<CanvasImageSource & { width: number; height: number; close?: () => void }> => {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Older browsers fall back to the image element decoder below.
    }
  }
  return loadHtmlImage(file);
};

const measureLuminance = (
  source: CanvasImageSource,
  width: number,
  height: number,
) => {
  const sampleSize = 96;
  const scale = Math.min(1, sampleSize / Math.max(width, height));
  const sampleWidth = Math.max(1, Math.round(width * scale));
  const sampleHeight = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("A böngésző nem tudja feldolgozni a képet.");
  context.drawImage(source, 0, 0, sampleWidth, sampleHeight);
  const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  let total = 0;
  let totalSquared = 0;
  let count = 0;
  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] === 0) continue;
    const luminance = 0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2];
    total += luminance;
    totalSquared += luminance * luminance;
    count += 1;
  }
  if (count === 0) return { mean: 132, deviation: 48 };
  const mean = total / count;
  return {
    mean,
    deviation: Math.sqrt(Math.max(0, totalSquared / count - mean * mean)),
  };
};

export const processReferenceImage = async (file: File): Promise<ProcessedReferenceImage> => {
  if (!REFERENCE_IMAGE_TYPES.includes(file.type as (typeof REFERENCE_IMAGE_TYPES)[number])) {
    throw new Error("JPG, PNG vagy WebP kép választható.");
  }
  if (file.size > REFERENCE_IMAGE_MAX_SOURCE_BYTES) {
    throw new Error("Az eredeti kép legfeljebb 25 MB lehet.");
  }

  const source = await decodeImage(file);
  try {
    const originalWidth = source.width;
    const originalHeight = source.height;
    const { width, height } = getReferenceTargetDimensions(originalWidth, originalHeight);
    const luminance = measureLuminance(source, originalWidth, originalHeight);
    const adjustments = calculateAutoImageAdjustments(luminance.mean, luminance.deviation);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("A böngésző nem tudja feldolgozni a képet.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.filter = `brightness(${adjustments.brightness}) contrast(${adjustments.contrast})`;
    context.drawImage(source, 0, 0, width, height);

    let blob: Blob | null = null;
    for (const quality of [0.86, 0.8, 0.74, 0.68]) {
      blob = await canvasToBlob(canvas, quality);
      if (blob.size <= REFERENCE_IMAGE_MAX_OUTPUT_BYTES) break;
    }
    if (!blob || blob.size > REFERENCE_IMAGE_MAX_OUTPUT_BYTES) {
      throw new Error("A kép az optimalizálás után is túl nagy.");
    }
    return {
      file: new File([blob], `${crypto.randomUUID()}.webp`, {
        type: "image/webp",
        lastModified: Date.now(),
      }),
      width,
      height,
      originalWidth,
      originalHeight,
      originalBytes: file.size,
      ...adjustments,
    };
  } finally {
    source.close?.();
  }
};
