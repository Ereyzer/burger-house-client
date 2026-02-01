import type React from 'react';
import { useAboutPlace } from '../../context/aboutContext';
import OpenLine from '../openLine/OpenLine';

interface Props {
  children: React.ReactNode;
}

function Main({ children }: Props) {
  const aboutPlace = useAboutPlace();
  return (
    <main className="container">
      {!aboutPlace.isLoaded || <OpenLine />}
      {children}
    </main>
  );
}

export default Main;
