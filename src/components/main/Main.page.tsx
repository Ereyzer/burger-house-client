import type React from 'react';

interface Props {
  children: React.ReactNode;
}

function Main({ children }: Props) {
  return <main>{children}</main>;
}

export default Main;
