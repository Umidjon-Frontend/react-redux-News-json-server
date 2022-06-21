import { useCallback } from "react";

export const useHttp = () => {
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          throw new Error(`Cloud not fetch ${url}, status ${response.status}`);
        } else {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  return { request };
};
