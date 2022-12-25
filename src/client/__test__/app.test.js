import { oneDay } from "../js/day";

describe("Testing the date ", () => {
  test("Testing the oneDay() ", () => {
    expect(oneDay()).toBe(86400000);
  });
});
