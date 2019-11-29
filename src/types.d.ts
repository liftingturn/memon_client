import { string } from 'prop-types';

export interface Person {
  name: string;
  phone: string;
  id?: string;
  clicked: boolean;
}

export interface Payment {
  priceBook: {
    totalPrice: number;
    billImgSrc: string;
    count: number;
    partyDate: string;
    title: string;
    transCompleted: boolean;
  };
  email: string;
  participant: Person[];
}
