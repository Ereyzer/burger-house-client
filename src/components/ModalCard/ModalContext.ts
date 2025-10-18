import { createContext, use } from 'react';

const defaultContext = {
  //   isOpen: false,
  openModalCard: (id: number) => {
    console.log(id);
  },
  closeModalCard: () => {},
};

export const ModalCardContext = createContext(defaultContext);

export const useModalCard = () => use(ModalCardContext);
