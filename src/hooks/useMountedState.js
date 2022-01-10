import { useCallback, useEffect, useRef } from "react";

export default function useMountedState() {
  const isMountedRef = useRef(false);

  // Basically the same as "useDidMount" because it has no dependencies
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      // The cleanup function of useEffect is called by React on unmount
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}
