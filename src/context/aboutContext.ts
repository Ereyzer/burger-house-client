import { createContext, use } from 'react';

export interface OpenDay {
  dayOfWeek: number;
  opensAt: string | null;
  closesAt: string | null;
}
export interface AboutPlaceData {
  id: number;
  facebook: string | null;
  instagram: string | null;
  email: string | null;
  phone: string | null;
  placeDescription: string | null;
  placeAddress: string | null;
  opennigHours: OpenDay[];
}

// export interface DefoultAboutPlaceContextValue {
//   aboutPlace: AboutPlaceData;
//   updatePlace?: (data: AboutPlaceData) => void;
// }

const defaultContaxtValue: AboutPlaceData = {
  id: 1,
  facebook: null,
  instagram: null,
  email: null,
  phone: null,
  placeDescription: null,
  placeAddress: null,
  opennigHours: [],
};

export const AboutPlaceContext = createContext<AboutPlaceData>(defaultContaxtValue);

export const useAboutPlace = () => use(AboutPlaceContext);
