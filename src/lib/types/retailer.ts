export interface RetailerDetails {
  price: number;
  url: string;
}

export interface Retailers {
  nike?: RetailerDetails;
  adidas?: RetailerDetails;
  stockx?: RetailerDetails;
  footlocker?: RetailerDetails;
}
