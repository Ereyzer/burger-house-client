import type { PaymentMethod } from './types';

export interface Selection {
  id: number;
  quantity: number;
}

interface BaseOrder {
  payment: PaymentMethod;
  amount: number;
  phone: string;
  customerName: string;
  description?: string;
  email?: string;
  selections: Selection[];
  deliveryPrice: number;
}
export interface DeliveryOrder extends BaseOrder {
  delivery: true;
  street: string;
  address: string;
  addressClarification?: string | null;
}

interface PickupOrder extends BaseOrder {
  delivery: false;
}

export type Order = DeliveryOrder | PickupOrder;
