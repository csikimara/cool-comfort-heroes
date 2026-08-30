export const GALLERY_BASE_URL = "https://northwind.hu/galeria";
export const MAX_GALLERY_MANIFEST_BYTES = 512 * 1024;
export const MAX_GALLERY_ITEMS_PER_MANIFEST = 500;
export const MAX_GALLERY_ITEMS_TOTAL = 1_000;

const ALLOWED_MEDIA_EXTENSION = /\.(?:avif|gif|jpe?g|png|webp|m4v|mov|mp4|ogg|webm)$/i;
const VIDEO_EXTENSION = /\.(?:m4v|mov|mp4|ogg|webm)$/i;

/**
 * Gallery manifests are content, not trusted code. Keep every media request on
 * the Northwind gallery origin and inside the requested folder; reject remote,
 * executable, path-traversal and unsupported file destinations.
 */
export const safeGalleryMediaUrl = (
  folderName: string,
  source: string,
): string | null => {
  if (!/^[a-z0-9-]{1,80}$/i.test(folderName) || !source || source.length > 500) {
    return null;
  }

  try {
    const folderUrl = new URL(`${GALLERY_BASE_URL}/${folderName}/`);
    const url = new URL(source, folderUrl);
    if (
      url.protocol !== "https:" ||
      url.origin !== folderUrl.origin ||
      url.username ||
      url.password ||
      /%(?:25|2f|5c)/i.test(url.pathname) ||
      !url.pathname.startsWith(folderUrl.pathname) ||
      !ALLOWED_MEDIA_EXTENSION.test(url.pathname)
    ) {
      return null;
    }
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
};

export const isGalleryVideoUrl = (url: string): boolean => {
  try {
    return VIDEO_EXTENSION.test(new URL(url).pathname);
  } catch {
    return false;
  }
};

/**
 * Response.text() has no size limit. Stream gallery manifests with a hard cap
 * so a compromised or misconfigured gallery endpoint cannot make the browser
 * allocate an unbounded response before JSON parsing.
 */
export const readGalleryManifestText = async (
  response: Response,
  maxBytes = MAX_GALLERY_MANIFEST_BYTES,
): Promise<string> => {
  const contentLength = response.headers.get("content-length");
  if (contentLength !== null) {
    const declaredBytes = Number(contentLength);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      throw new Error("Gallery manifest exceeds the size limit");
    }
  }

  if (!response.body) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > maxBytes) {
      throw new Error("Gallery manifest exceeds the size limit");
    }
    return text;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new Error("Gallery manifest exceeds the size limit");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
};
