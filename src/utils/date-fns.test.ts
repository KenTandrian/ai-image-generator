import { describe, expect, it } from "vitest";
import { relative } from "./date-fns";

describe("relative date formatter", () => {
  it("formats current time as just now", () => {
    const now = new Date();
    expect(relative(now)).toBe("just now");
  });

  it("formats past times in standard mode", () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    expect(relative(oneHourAgo)).toBe("1 hour ago");

    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(relative(twoDaysAgo)).toBe("2 days ago");
  });

  it("formats times in mini mode", () => {
    const now = new Date();
    expect(relative(now, true)).toBe("now");

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(relative(twoHoursAgo, true)).toBe("2h");
  });
});
