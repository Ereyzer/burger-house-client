import type React from 'react';
import { ModalCardContext } from './ModalContext';
import { useEffect, useState } from 'react';
import ModalCard from './ModalCard';
import { useCart } from '../../context/cartContext';

interface Props {
  children: React.ReactNode;
}
function ModalCardContextProvider({ children }: Props) {
  const [itemId, setItemId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const [inCart, setInCart] = useState<(typeof items)[number] | undefined>();
  useEffect(() => {
    if (!itemId) {
      setOpen(false);
      return;
    }
    setInCart(items.find(({ id }) => id === itemId));
    setOpen(true);
  }, [items, itemId]);

  const openModalCard = (id: string) => {
    setItemId(id);
  };
  const closeModalCard = () => {
    setItemId(null);
  };
  return (
    <ModalCardContext value={{ openModalCard, closeModalCard }}>
      {children}
      {itemId && open && (
        <ModalCard itemId={itemId} inCart={!!inCart} quantity={inCart?.quantity}></ModalCard>
      )}
    </ModalCardContext>
  );
}

export default ModalCardContextProvider;
