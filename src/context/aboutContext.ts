import { createContext, use } from 'react';
import type { WorkingStatus } from '../const/openState';

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
  openningHours: OpenDay[];
  placeLink: string | null;
  isLoaded: boolean;
  workingStatus?: WorkingStatus | null;
  warningMessage: string;
}

// export interface DefoultAboutPlaceContextValue {
//   aboutPlace: AboutPlaceData;
//   updatePlace?: (data: AboutPlaceData) => void;
// }

export const defaultContaxtValue: AboutPlaceData = {
  id: 1,
  facebook: null,
  instagram: null,
  email: null,
  phone: null,
  placeDescription: null,
  placeAddress: null,
  openningHours: [],
  placeLink: null,
  isLoaded: false,
  workingStatus: null,
  warningMessage: '',
};

export const AboutPlaceContext = createContext<AboutPlaceData>(defaultContaxtValue);

export const useAboutPlace = () => use(AboutPlaceContext);
