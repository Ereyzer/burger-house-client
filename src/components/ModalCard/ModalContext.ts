import { createContext, use } from 'react';

const defaultContext = {
  //   isOpen: false,
  openModalCard: (id: string) => {
    console.log(id);
  },
  closeModalCard: () => {},
};

export const ModalCardContext = createContext(defaultContext);

export const useModalCard = () => use(ModalCardContext);
