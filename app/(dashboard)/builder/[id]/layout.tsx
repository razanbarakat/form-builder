import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-grow mx-auto">{children}</div>;
}
