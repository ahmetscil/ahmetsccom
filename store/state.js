export default () => ({
  version: '0.0.0.1',
  returnCount: 0,
  locales: ['en'],
  locale: 'en_EN',
  loading: false,
  showMegamenu: false,
  showHeaderBasket: false,
  showSearch: false,
  headerBasketClass: 'asc_pariette-header-basket',
  headerSearchClass: 'asc_pariette-header-search',
  myStore: {},
  countryList: [],
  regionList: [],
  stateList: [],
  // product list
  products: [],
  productsIsError: false,
  productsLoading: true,
  productFilterlist: [],
  // product list
  registeredUser: '',
  lookup: {},
  navigation: {},
  canvas: {},
  canvasModal: false,
  attribute: {},
  option: {},
  homeCollection: [],
  categoryType: [],
  collectionType: [],
  basketItems: [],
  orderCode: null,
  headerBasketAdded: 'asc_pariette-header-basket-basket',
  confirmAddressMessage: false,
  confirmOrderMessage: false,
  confirmPaymentMessage: false,
  myAddress: [],
  paypal_client_id: 'AZDuklD8UkTBxE_AVsRjjcprX1z2OkGVS5BtAGNwzBgbO8P3vEHKrU3W-P14wY6qolRFx-i57Xe2yF3U',
  paypal_paid: false,
  paypal_error: null,
  paypal_success: false
})