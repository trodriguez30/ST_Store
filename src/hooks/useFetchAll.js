import { useState, useEffect, useRef } from "react";
import { areArraysEqual } from "../utils/typeChecking";

export default function useFetchAll(urls) {
  const prevUrlsRef = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Run only if URLs passed are not same as previous URLs
    if (areArraysEqual(prevUrlsRef.current, urls)) {
      setLoading(false);
      return;
    }

    prevUrlsRef.current = urls;
    const promises = urls.map((url) =>
      fetch(url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { data, loading, error };
}
