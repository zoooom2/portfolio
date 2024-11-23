import { BuyLogo, ItemSoldLogo, revenueLogo, visitorLogo } from '../assets';
import { SingleProductType } from '../types';

export const initialSingleProduct = {
	_id: '',
	productName: '',
	description: '',
	featured: false,
	price: 0,
	priceID: '',
	taxPrice: 0,
	sizes: [],
	discount: 0,
	category: 'all',
	collectionName: 'all',
	quantitySold: 0,
	reviews: [],
	images: [],
	numberOfReviews: 0,
	ratingsAverage: 0,
	totalQuantity: 0,
} as SingleProductType;

export const links = [
	{
		id: 1,
		text: 'Shop',
		url: '/shop',
	},
	{
		id: 2,
		text: 'Thesis',
		url: '/thesis',
	},
	{
		id: 3,
		text: 'Contact',
		url: '/contact',
	},
	{
		id: 4,
		text: 'Delivery',
		url: '/delivery',
	},
];

export const adminLinks = [
	{
		id: 1,
		text: 'Overview',
		url: '/admin/Overview',
	},
	{
		id: 2,
		text: 'Product',
		url: '/admin/product',
	},
	{
		id: 3,
		text: 'Order',
		url: '/admin/order',
	},
	{
		id: 4,
		text: 'Best Seller',
		url: '/admin/topProducts',
	},
];

export const checkoutStage = [
	{
		stage: 'information',
		id: 1,
	},
	// {
	//   stage: 'shipping',
	//   id: 2,
	// },
	{
		stage: 'payment',
		id: 3,
	},
];

export const placeholderStyle = {
	fontFamily: 'Poppins',
	fontWeight: 400,
	fontSize: '10px',
	lineHeight: '22px',
	color: 'black',
};

export const selectStyle = {
	fontFamily: 'Poppins',
	fontWeight: 400,
	letterSpacing: '0.05em',
	lineHeight: '22px',
	fontSize: '11px',
	color: 'black',
	border: '1.5px solid #a6a6a6',
	borderRadius: 'none',
	minHeight: '100%',
	paddingInline: '0.5em',
	backgroundColor: 'transparent',
	// textTransform: 'capitalize',
};

export const adminSidebarLinks = [
	{
		name: 'Overview',
		tag: 'overview',
		link: '/admin/overview/',
	},
	{
		name: 'Orders',
		tag: 'order',
		link: '/admin/order/',
	},
	{
		name: 'Product',
		tag: 'product',
		link: '/admin/product/',
	},
	{
		name: 'Best Seller',
		tag: 'bestSeller',
		link: '/admin/topProducts/',
	},
];

export const periodOption = [
	{ name: 'custom', value: 'custom' },
	{ name: 'today', value: 'daily' },
	{ name: 'This week', value: 'weekly' },
	{ name: 'This month', value: 'monthly' },
	{ name: 'This year', value: 'yearly' },
];

export type AdminAnalyticsType = {
	logo: string;
	topic: string;
	value: {
		current: 'totalRevenue' | 'totalOrder' | 'visitor' | 'totalSale';
		previous:
			| 'previousTotalRevenue'
			| 'previousTotalOrder'
			| 'previousVisitor'
			| 'previousTotalSales';
	};
	percentage:
		| 'percentageRevenue'
		| 'percentageOrder'
		| 'percentageVisitor'
		| 'percentageSales';
};

export const adminAnalytics = [
	{
		logo: revenueLogo,
		topic: 'Total Revenue',
		value: { current: 'totalRevenue', previous: 'previousTotalRevenue' },
		percentage: 'percentageRevenue',
	},
	{
		logo: BuyLogo,
		topic: 'Total Orders',
		value: { current: 'totalOrder', previous: 'previousTotalOrder' },
		percentage: 'percentageOrder',
	},
	{
		logo: visitorLogo,
		topic: 'Total Visitors',
		value: { current: 'visitor', previous: 'previousVisitor' },
		percentage: 'percentageVisitor',
	},
	{
		logo: ItemSoldLogo,
		topic: 'Total Items Sold',
		value: { current: 'totalSale', previous: 'previousTotalSales' },
		percentage: 'percentageSales',
	},
] as AdminAnalyticsType[];

export const priceFormat = (price: number) =>
	`₦${new Intl.NumberFormat('currency').format(price)}`;

export const featuredSlide1 = [
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028255/BAZ/qndw87gggu57u5ixi2vr.jpg',
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/v1732388757/BAZ/Homepage/hrsilivlpmsewjailhcf.webp',
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/f_webp/BAZ/Homepage/ea3xktn7wvcrozc5tdfr',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028241/BAZ/rewfxidldlsaoyafop2n.jpg',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028238/BAZ/jk6dtbzwljes5mzrq4hi.jpg',
];
export const featuredSlide2 = [
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/f_webp/v1732388597/BAZ/Homepage/nejbwrik2rmep28c1ovt',
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/f_webp/v1732388595/BAZ/Homepage/decgdzq5ijovuwcl9w4p',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028234/BAZ/zmfsbhvbsumhdr0pzmpd.jpg',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028249/BAZ/iyuqka7ylridrb5p2ztj.jpg',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028248/BAZ/hnueavbi3nmlkqutaxxe.jpg',
	// 'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_auto,f_webp/v1704028241/BAZ/rewfxidldlsaoyafop2n.jpg',
];

export const products_url = `${import.meta.env.VITE_BAZ_SERVER_URL}/products`;

export const single_product_url = `${
	import.meta.env.VITE_BAZ_SERVER_URL
}/products`;

export const auth_url = `${import.meta.env.VITE_BAZ_SERVER_URL}/auth/google`;

export const shippingChart = {
	abia: 6000,
	'abuja federal capital territory': 5000,
	adamawa: 6000,
	'akwa ibom': 6000,
	anambra: 6000,
	bauchi: 6000,
	bayelsa: 6000,
	benue: 6000,
	borno: 6000,
	'cross river': 6000,
	delta: 6000,
	ebonyi: 6000,
	edo: 5000,
	ekiti: 5000,
	enugu: 5000,
	gombe: 6000,
	imo: 6000,
	jigawa: 6000,
	kaduna: 6000,
	kano: 6000,
	katsina: 6000,
	kebbi: 6000,
	kogi: 6000,
	kwara: 1500,
	lagos: 5000,
	nasarawa: 6000,
	niger: 6000,
	ogun: 5000,
	ondo: 5000,
	osun: 5000,
	oyo: 5000,
	plateau: 6000,
	rivers: 6000,
	sokoto: 6000,
	taraba: 6000,
	yobe: 6000,
	zamfara: 6000,
} as Record<string, number>;

export const BAZLogo =
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/w_2500,f_webp/v1703932967/paywb2uewgpy0kylpskq.png';

export const sizeAbbr = {
	small: 'S',
	medium: 'M',
	large: 'L',
	'x-large': 'XL',
	'2x-large': 'XXL',
};

export const BAZLoading =
	'https://res.cloudinary.com/dlk2a6ppp/image/upload/f_webp,w_1000/BAZ/aulpntlh5winjyfxxo4v.jpg';
