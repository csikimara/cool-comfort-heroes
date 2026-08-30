import { describe, expect, it } from "vitest";
import { safeHashTargetId } from "../hooks/useScrollToHash";

describe("hash-scroll target validation", () => {
  it("decodes ordinary anchors without treating them as CSS selectors", () => {
    expect(safeHashTargetId("#kapcsolat")).toBe("kapcsolat");
    expect(safeHashTargetId("#fisher-garancia")).toBe("fisher-garancia");
    expect(safeHashTargetId("#adatv%C3%A9delem")).toBe("adatvédelem");
  });

  it("rejects malformed, empty, control-character and oversized fragments", () => {
    expect(safeHashTargetId("#")).toBeNull();
    expect(safeHashTargetId("#%E0%A4%A")).toBeNull();
    expect(safeHashTargetId("#sor%0At%C3%B6r%C3%A9s")).toBeNull();
    expect(safeHashTargetId(`#${"a".repeat(129)}`)).toBeNull();
  });
});
