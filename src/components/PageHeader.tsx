import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageHeader({ children }: Props) {
  return <div className="text-2xl font-bold">{children}</div>;
}
