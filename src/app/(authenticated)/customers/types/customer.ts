import { Order } from "./order";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address: string;
  orders: Order[];
}