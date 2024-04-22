import { encoded, translations } from "./data.js";

console.log("Let's rock");
// console.log(encoded, translations);

const keysToDecode = Object.keys(encoded[0]).filter((key) => {
  if (
    encoded[0][key] &&
    key.indexOf("Id") != -1 &&
    key !== "groupId" &&
    key !== "service" &&
    key !== "formatSize" &&
    key !== "ca"
  ) {
    return key;
  }
});

// console.log("keysToDecode", keysToDecode);

const decoded = encoded.map((item) => {
  keysToDecode.forEach((key) => {
    if (translations[item[key]] !== undefined && item[key]) {
      item[key] = translations[item[key]];
    }
  });
  return item;
});

console.log(decoded);
