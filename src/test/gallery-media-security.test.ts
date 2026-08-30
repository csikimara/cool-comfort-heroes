import { describe, expect, it } from "vitest";
import {
  isGalleryVideoUrl,
  MAX_GALLERY_MANIFEST_BYTES,
  readGalleryManifestText,
  safeGalleryMediaUrl,
} from "@/lib/gallery-media-url";

describe("gallery media URLs", () => {
  it("accepts supported media only inside the selected Northwind folder", () => {
    expect(safeGalleryMediaUrl("karbantartas", "munka 1.jpg")).toBe(
      "https://northwind.hu/galeria/karbantartas/munka%201.jpg",
    );
    expect(
      safeGalleryMediaUrl(
        "karbantartas",
        "https://northwind.hu/galeria/karbantartas/video.mp4?verzio=2#resz",
      ),
    ).toBe("https://northwind.hu/galeria/karbantartas/video.mp4?verzio=2");
  });

  it("rejects external, executable, traversal and unsupported sources", () => {
    for (const source of [
      "https://tracker.example/pixel.jpg",
      "//tracker.example/pixel.jpg",
      "javascript:alert(1)",
      "../masik/ugyfel.jpg",
      "%2e%2e/ugyfel.jpg",
      "..%2fmasik/ugyfel.jpg",
      "..%252fmasik/ugyfel.jpg",
      "..%5cmasik/ugyfel.jpg",
      "/galeria/masik/ugyfel.jpg",
      "tamadas.svg",
      "index.php",
    ]) {
      expect(safeGalleryMediaUrl("karbantartas", source)).toBeNull();
    }
    expect(safeGalleryMediaUrl("../karbantartas", "kep.jpg")).toBeNull();
  });

  it("detects video extensions without trusting query strings", () => {
    expect(isGalleryVideoUrl("https://northwind.hu/galeria/a/video.MP4?v=1")).toBe(true);
    expect(isGalleryVideoUrl("https://northwind.hu/galeria/a/kep.jpg?next=.mp4")).toBe(false);
  });

  it("streams manifests through a strict byte limit", async () => {
    await expect(
      readGalleryManifestText(new Response("123456"), 5),
    ).rejects.toThrow("size limit");

    await expect(
      readGalleryManifestText(new Response("[\"kep.jpg\"]")),
    ).resolves.toBe("[\"kep.jpg\"]");

    expect(MAX_GALLERY_MANIFEST_BYTES).toBe(512 * 1024);
  });

  it("rejects a manifest whose declared response size is too large", async () => {
    const response = new Response("[]", {
      headers: { "content-length": "999999" },
    });
    await expect(readGalleryManifestText(response, 100)).rejects.toThrow(
      "size limit",
    );
  });
});
