import React, { useEffect, useRef } from "react";

function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 hidden md:block top-0 left-0"
      style={{
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(244,167,185,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        willChange: "transform",
        transform: "translate(-400px, -400px)",
      }}
    />
  );
}

export default CursorGlow;
