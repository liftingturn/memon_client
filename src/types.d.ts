import { string } from 'prop-types';

export interface Person {
  isView?: boolean;
  name: string;
  phone: string;
  id?: string;
  transId?: string;
  clicked: boolean;
  askConfirm?: boolean;
}

export interface Payment {
  priceBook: {
    totalPrice: number;
    billImgSrc: string;
    count: number;
    partyDate: string;
    title: string;
    transCompleted: boolean;
    fixedTotalPrice: number;
  };
  email: string;
  participant: Person[];
}
