//Axios Request Types
// export type AxiosResponseType = Awaited<ReturnType<typeof axios.get>>['data'];

import { ChangeEvent, SyntheticEvent } from 'react';
import { IconType } from 'react-icons';
// import { sizeAbbr } from '../utils/constants';

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

export type UserStateType = {
  remove_auth_error: string;
  clicked: boolean;
  visitor_count: number;
  fetch_user_error: string;
  fetch_order_error: string;
  visitor_count_error: string;
  loading: boolean;
  isAuthenticated: boolean;
  authentication_error: string;
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
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  phoneNumber: string;
  postCode: string;
  country: string;
  shippingFee: number;
  shippingMethod: string;
  countryCode: string;
  state: string;
};

export type OrderItemType = {
  productName: string;
  amount: number;
  price: number;
  image: string;
  sizes: { size: string; quantity: string; _id: string }[];
  productID: string;
};

export type PaymentInfoType = {
  reference: string | JSX.Element;
  gateway: string;
  channel?: string;
  status?: string;
};

export type OrderType = {
  _id: string;
  shippingInfo: ShippingInfoTypes;
  // user: UserType;
  orderItems: OrderItemType[];
  paymentInfo: PaymentInfoType;
  createdAt: string;
  paidAt?: string;
  taxPrice: number;
  deliveredAt: string;
  total_amount: number;
  subtotal: number;
  orderStatus: 'pending' | 'completed';
  total_items: number;
};

export interface ChildrenProps {
  children: React.ReactNode;
}

//product types

export type CategoryType = string;

export type SingleProductType = {
  _id?: string;
  productName: string;
  description: string;
  featured: boolean;
  price: number;
  priceID: string;
  taxPrice: number;
  discount: number;
  category: CategoryType;
  collectionName: string;
  reviews: string[];
  images: string[];
  numberOfReviews: number;
  quantitySold: number;
  ratingsAverage: number;
  sizes: {
    // size: keyof typeof sizeAbbr;
    size: string;
    quantity: number;
    custom?: boolean;
  }[];
  totalQuantity: number;
};
export type ProductStateType = {
  isSidebarOpen: boolean;
  showModal: boolean;
  products_loading: boolean;
  products_error: string;
  products: SingleProductType[];
  featured_products: SingleProductType[];
  single_product_loading: boolean;
  single_product_error: string;
  single_product: SingleProductType;
};
export type ProductActionType = {
  type: string;
  payload?: SingleProductType[] | SingleProductType;
};
//filter types

export type FilterStatetype = {
  filtered_product: SingleProductType[];
  all_products: SingleProductType[];
  filtered_collection: SingleProductType[];
  grid_view: boolean;
  sort: string | undefined;
  openFilter: boolean;
  openSearchBar: boolean;
  filters: FilterType;
};

export type FilterType = {
  text: string;
  category: CategoryType;
  min_price?: number;
  max_price?: number;
  price: number;
  shipping: boolean;
  collection: string;
};
export type FilterActionType = {
  type: string;
  payload?:
    | { products: SingleProductType[] }
    | Pick<FilterStatetype, 'sort'>
    | { value: string }
    | Record<'name' | 'value', string | boolean | null>;
};
//Cart types

export type CartItemType = {
  productName: string;
  amount: number;
  size: string;
  image: string;
  price: number;
  max: number;
  productID: string;
};

export type CartStateType = {
  cart: CartItemType[];
  total_items: number;
  subtotal: number;
  loading: boolean;
  handle_paystack_error: string;
  total_amount: number;
  create_order_error: string;
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
    shippingMethod: string;
    shippingFee: number;
    additionalInfo: string;
  };
};

export type CartShippingTypes = CartStateType['shippingInfo'];

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

export type BestSellerType = {
  _id: string;
  sizes: { size: string; quantity: number }[];
  totalQuantitySold: number;
  productName: string;
  collectionName: string;
  productImage: string[];
  price: number;
}[];

export type AdminState = {
  loading: boolean;
  openModal: boolean;
  adminRoute: boolean;
  modalTitle: string;
  sideMenuValue: 'overview' | 'product' | 'order' | 'bestSeller';
  modalRef: string;
  showSidebar: boolean;
  showDelBtn: boolean;
  submit_product_error: string;
  fetch_order_error: string;
  fetch_order_stat_error: string;
  fetch_visitor_stat_error: string;
  fetch_single_order_error: string;
  fetch_best_seller_error: string;
  aggregateOrder_error: string;
  product_error: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  totalRevenue: number;
  previousTotalRevenue: number;
  totalOrder: number;
  previousTotalOrder: number;
  visitor: number;
  previousVisitor: number;
  totalSale: number;
  previousTotalSales: number;
  percentageRevenue: number;
  percentageOrder: number;
  percentageVisitor: number;
  percentageSales: number;
  singleOrder: OrderType;
  orders: OrderType[];
  bestSeller: BestSellerType;
  aggregateOrder: {
    _id: string;
    totalItemsSold: number;
    products: {
      productName: string;
      sizes: {
        // size: keyof typeof sizeAbbr;
        size: string;
        quantity: number;
      }[];
      images: string[];
      price: number;
    }[];
  }[];
  formTempProduct: Omit<SingleProductType, 'sizes'> & {
    sizes: { size: string; quantity: number; custom: boolean }[];
  };
  formErrorMessage: boolean;
  isFormValid: boolean;
  formFieldMode: 'fixed' | 'update';
  formImages: string[];
};
export type stats = {
  time: string;
  stats: {
    current: number;
    previous: number;
    percentageDifference: number;
  };
};

export type StoreType = {
  admin: AdminState;
  cart: CartStateType;
  filter: FilterStatetype;
  product: ProductStateType;
  user: UserStateType;
};

export type HeroProps = {
  title: string;
  subtitle?: string;
  description: string;
  timeBased?: boolean;
  buttonType?: boolean;
  customPeriod?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  periodChangeFn?: (e: ChangeEvent<HTMLSelectElement>) => void;
  button?: {
    icon: IconType;
    name: string;
    action: (e: SyntheticEvent<HTMLButtonElement>) => void;
  }[];
};

export type AdminPageType = 'overview' | 'product' | 'order' | 'bestSeller';
// export interface FormData {
//   productName: string;
//   price: number;
//   description: string;
//   sizes: { name: string; quantity: number }[];
//   coverImages: FileList | null;
//   category: string;
//   collectionName: string;
// }

export type orderTableDataProps = (Omit<OrderType, '_id' | 'total_amount'> & {
  total_amount: string;
})[];

export type OrderStateType = {
  loading: boolean;
  orders: OrderType[];
  create_order_error: string;
};

export type sideBarLinks = { id: number; text: string; url: string };
