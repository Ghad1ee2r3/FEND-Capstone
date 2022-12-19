function checkForName(inputText) {
  console.log("::: Running checkForName :::", inputText);
  let names = ["Picard", "Janeway", "Kirk", "Archer", "Georgiou"];

  if (names.includes(inputText)) {
    // alert("Welcome, Captain!");
    return true;
  } else {
    // alert("Name not in list");
    return false;
  }
}

export { checkForName };
