import { useEffect, useRef } from "react";

export function usePolling(callback: () => void, intervalMs: number): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = window.setInterval(() => savedCallback.current(), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
}
