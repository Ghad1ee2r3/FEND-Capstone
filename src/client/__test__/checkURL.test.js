const { checkURL } = require("../js/checkURL");

test("check url format", () => {
  expect(checkURL("https://www.google.com")).toBe(true);
  expect(checkURL("http://www.google.com")).toBe(true);

  expect(checkURL("www.google.com")).not.toBe(true);
  expect(checkURL("google.com")).not.toBe(true);
  expect(checkURL("google")).not.toBe(true);
  expect(checkURL("google browser")).not.toBe(true);
});
