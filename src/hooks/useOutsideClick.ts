import { useEffect, useRef } from "react";

export const useOutsideClick = (
  handler: React.Dispatch<React.SetStateAction<string>>,
  listenCapturing: boolean = true
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler("");
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler]);

  return ref;
};
