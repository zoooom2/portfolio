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
  address: string;
  city: string;
  phoneNumber: string;
  postCode: string;
  country: string;
};

export type OrderItemType = {
  firstname: string;
  lastname: string;
  amount: number;
  price: number;
  image: string;
  size: string;
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
  user: UserType;
  orderItems: OrderItemType[];
  paymentInfo: PaymentInfoType;
  createdAt: string;
  paidAt?: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  deliveredAt: string;
  total_amount: number;
  subtotal: number;
  orderStatus: 'processing' | 'shipped' | 'completed' | 'failed';
  total_items: number;
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
  category: CategoryType;
  collection: string;
  reviews: string[];
  images: string[];
  numberOfReviews: number;
  quantitySold: number;
  stock: number;
  ratingsAverage: number;
};
export type ProductStateType = {
  isSidebarOpen: boolean;
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
  grid_view: boolean;
  sort: string | undefined;
  openFilter: boolean;
  filters: FilterType;
};

export type FilterType = {
  text: string;
  category: CategoryType;
  min_price: number;
  max_price: number;
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
  name: string;
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

export type AdminState = {
  loading: boolean;
  fetch_order_stat_error: string;
  fetch_visitor_stat_error: string;
  fetch_recent_order_error: string;
  fetch_best_seller_error: string;
  period: string;
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
  recentOrders: OrderType[];
  bestSeller: SingleProductType[];
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
