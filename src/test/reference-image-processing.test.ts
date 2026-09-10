import { describe, expect, it } from "vitest";
import {
  calculateAutoImageAdjustments,
  getReferenceTargetDimensions,
} from "@/lib/reference-image";

describe("reference image preparation", () => {
  it("preserves aspect ratio and never enlarges smaller photographs", () => {
    expect(getReferenceTargetDimensions(4000, 3000)).toEqual({ width: 1920, height: 1440 });
    expect(getReferenceTargetDimensions(1200, 800)).toEqual({ width: 1200, height: 800 });
    expect(getReferenceTargetDimensions(2000, 4000)).toEqual({ width: 960, height: 1920 });
  });

  it("keeps brightness and contrast correction deliberately subtle", () => {
    expect(calculateAutoImageAdjustments(40, 10)).toEqual({ brightness: 1.1, contrast: 1.079 });
    expect(calculateAutoImageAdjustments(132, 60)).toEqual({ brightness: 1, contrast: 1 });
    expect(calculateAutoImageAdjustments(240, 20)).toEqual({ brightness: 0.92, contrast: 1.058 });
  });
});
