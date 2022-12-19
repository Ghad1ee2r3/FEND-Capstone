export function checkURL(input) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(input);
}
