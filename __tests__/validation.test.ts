import { validateImdbId } from "@/lib/validation";

describe("IMDb Validation", () => {
  it("accepts valid IMDb ID", () => {
    expect(validateImdbId("tt0133093")).toBe(true);
  });

  it("rejects invalid ID", () => {
    expect(validateImdbId("12345")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateImdbId("")).toBe(false);
  });
});