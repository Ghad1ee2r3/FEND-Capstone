const { checkForName } = require("../js/nameChecker");

test("check for name", () => {
  expect(checkForName("Janeway")).toBe(true);
  expect(checkForName("Ghadeer")).not.toBe(true);
});
