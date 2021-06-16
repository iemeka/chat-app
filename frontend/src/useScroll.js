import { useEffect } from "react";

export default function useScroll(nodeRef) {
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
}
