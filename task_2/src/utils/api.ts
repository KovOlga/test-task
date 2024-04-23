export const fetchExchangeRate = (endPoint: string) => {
  return fetch(`https://open.er-api.com/v6/latest/${endPoint}`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
