export const fetchExchangeRate = (codeEndPoint: string) => {
  return fetch(`https://open.er-api.com/v6/latest/${codeEndPoint}`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
