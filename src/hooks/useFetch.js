import { useState, useEffect } from "react";
import useMountedState from "./useMountedState";

export default function useFetch(url) {
  const isMounted = useMountedState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted()) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted()) setError(e);
      } finally {
        if (isMounted()) setLoading(false);
      }
    }

    init();
  }, [url, isMounted]);

  return {
    data,
    error,
    loading
  };
}
