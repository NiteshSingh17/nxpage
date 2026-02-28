"use client";

import { JSX, useEffect, useRef } from "react";

export const Iframe = ({ content }: { content: string }): JSX.Element => {
  const containerRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    window.setTimeout(() => {
      if (containerRef?.current?.contentDocument?.body) {
        containerRef.current.contentDocument.body.innerHTML = content;
      }
    }, 2000);
  }, [content]);

  return (
    <iframe
      ref={containerRef}
      className="h-full w-full border-0 bg-transparent"
    />
  );
};
