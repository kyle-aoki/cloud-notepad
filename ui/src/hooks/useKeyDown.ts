import { useEffect } from "react";

type Handler = () => void;

const useKeyDown = (handler: Handler, deps: any[]) => useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, deps);

export default useKeyDown;
