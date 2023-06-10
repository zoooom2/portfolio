import axios from 'axios';

//Axios Request Types
// export type AxiosResponseType = Awaited<ReturnType<typeof axios.get>>['data'];

//User Types
export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  photo: string;
  role: string;
};

export type UserInitialStateType = {
  loading: boolean;
  isAuthenticated: boolean;
  user: UserType;
  orders: OrderType[];
  imageFile: {
    file: File | undefined;
    filePreview: string | undefined;
  };
};

export type userActionType = {
  type: string;
  payload?: OrderType[] | UserType | File;
};

// Commerce Types
export type ShippingInfoTypes = {
  address: string;
  city: string;
  phoneNumber: string;
  postCode: string;
  country: string;
};

export type OrderItemType = {
  name: string;
  amount: number;
  price: number;
  image: string;
  size: number;
  product: string;
};

export type PaymentInfoType = {
  reference: string;
  gateway: string;
  channel?: string;
  status?: string;
};

export type OrderType = {
  shippingInfo: ShippingInfoTypes;
  user: string;
  orderItems: OrderItemType[];
  paymentInfo: PaymentInfoType;
  createdAt: string;
  paidAt?: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: string;
};

export interface ChildrenProps {
  children: React.ReactNode;
}

//product types

export type CategoryType =
  | 'bags'
  | 'bracelets'
  | 'waistbeads'
  | 'necklaces'
  | 'anklet'
  | 'earrings'
  | 'all'
  | 'body jewelry'
  | 'custom';

export type SingleProductType = {
  id: string;
  productName: string;
  description: string;
  featured: boolean;
  price: number;
  priceID: string;
  taxPrice: number;
  discount: number;
  color: string[];
  category: CategoryType;
  reviews: string[];
  images: string[];
  numberOfReviews: number;
  stock: number;
  ratingsAverage: number;
};
export type ProductContextStateType = {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: SingleProductType[];
  featured_products: SingleProductType[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: SingleProductType;
};
export type ProductActionType = {
  type: string;
  payload?: SingleProductType[] | SingleProductType;
};
//filter types

export type FilterContextStatetype = {
  filtered_product: SingleProductType[];
  all_products: SingleProductType[];
  grid_view: boolean;
  sort: string | undefined;
  filters: {
    text: string;
    category: string;
    color: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
};
export type FilterActionType = {
  type: string;
  payload?:
    | { products: SingleProductType[] }
    | Pick<FilterContextStatetype, 'sort'>
    | { value: string }
    | Record<'name' | 'value', string | boolean | null>;
};
//Cart types

export type CartItemType = {
  name: string;
  color: string;
  amount: number;
  size: number;
  image: string;
  price: number;
  max: number;
  productID: string;
};

export type CartContextStateType = {
  cart: CartItemType[];
  total_items: number;
  total_amount: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    phoneNumber: string;
    postCode: string;
    email: string;
  };
};

export type AddToCartProps = {
  color: string;
  amount: number;
  product: SingleProductType;
  size: number;
};

export type CartItemAndProduct = CartItemType & {
  product: SingleProductType;
};

export type CartActionType = {
  type: string;
  payload?:
    | Partial<CartItemType>
    | CartItemAndProduct
    | { product: SingleProductType; value: string }
    | { detail: string; info: string };
};

export type countryTypes = {
  value: string;
  label: string;
  countryCode: string;
};
