import { useState, useEffect } from "react";

const baseUrl = "https://28dxn.sse.codesandbox.io/";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();

    /* const timer = setTimeout(() => {
      init();
    }, 1000);

    return () => clearTimeout(timer);
    */
  }, [url]);

  return {
    data,
    error,
    loading
  };
}
