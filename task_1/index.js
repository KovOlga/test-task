import { encoded, translations } from "./data.js";

console.log("Let's rock");

const keysToIgnore = ["groupId", "service", "formatSize", "ca"];

const decode = (arr, decodingObjList, keysToIgnore) => {
  const uniqueIdSet = new Set();

  for (let i = 0; i < arr.length; i++) {
    for (let [key, value] of Object.entries(arr[i])) {
      if (key.indexOf("Id") !== -1) {
        uniqueIdSet.add(value);
      }
      if (keysToIgnore.includes(key)) continue;
      arr[i][key] = decodingObjList[value] ?? value;
    }
  }
  return { arr, uniqueIdSet };
};

const decoded = decode(encoded, translations, keysToIgnore);

console.log("Раскодированный массив объектов:", decoded.arr);
console.log("Список уникальных id:", decoded.uniqueIdSet);
