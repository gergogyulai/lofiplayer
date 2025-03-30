import React from "react";

export default function Section(
  { title,
    description,
    children
  } : {
    title: string,
    description?: string,
    children: React.ReactNode
}) {
  return (
    <section className="last-child:border-b flex flex-col">
      <h1 className="text-xl font-semibold text-white/50 drop-shadow-md">
        {title}
      </h1>
      <p className="text-sm text-white/50">
        {description}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}
