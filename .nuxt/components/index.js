export const AddressBox = () => import('../../components/AddressBox.vue' /* webpackChunkName: "components/address-box" */).then(c => wrapFunctional(c.default || c))
export const Anime = () => import('../../components/Anime.vue' /* webpackChunkName: "components/anime" */).then(c => wrapFunctional(c.default || c))
export const BasketSummary = () => import('../../components/BasketSummary.vue' /* webpackChunkName: "components/basket-summary" */).then(c => wrapFunctional(c.default || c))
export const Breadcrumb = () => import('../../components/Breadcrumb.vue' /* webpackChunkName: "components/breadcrumb" */).then(c => wrapFunctional(c.default || c))
export const Carousel = () => import('../../components/Carousel.vue' /* webpackChunkName: "components/carousel" */).then(c => wrapFunctional(c.default || c))
export const CollectionBox = () => import('../../components/CollectionBox.vue' /* webpackChunkName: "components/collection-box" */).then(c => wrapFunctional(c.default || c))
export const Footer = () => import('../../components/Footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const Ghost = () => import('../../components/Ghost.vue' /* webpackChunkName: "components/ghost" */).then(c => wrapFunctional(c.default || c))
export const Header = () => import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const HeaderBasket = () => import('../../components/HeaderBasket.vue' /* webpackChunkName: "components/header-basket" */).then(c => wrapFunctional(c.default || c))
export const HomeBox = () => import('../../components/HomeBox.vue' /* webpackChunkName: "components/home-box" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../../components/Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const Marquee = () => import('../../components/Marquee.vue' /* webpackChunkName: "components/marquee" */).then(c => wrapFunctional(c.default || c))
export const MegaMenu = () => import('../../components/MegaMenu.vue' /* webpackChunkName: "components/mega-menu" */).then(c => wrapFunctional(c.default || c))
export const MyAddresses = () => import('../../components/MyAddresses.vue' /* webpackChunkName: "components/my-addresses" */).then(c => wrapFunctional(c.default || c))
export const MyNav = () => import('../../components/MyNav.vue' /* webpackChunkName: "components/my-nav" */).then(c => wrapFunctional(c.default || c))
export const MyOrders = () => import('../../components/MyOrders.vue' /* webpackChunkName: "components/my-orders" */).then(c => wrapFunctional(c.default || c))
export const NotFound = () => import('../../components/NotFound.vue' /* webpackChunkName: "components/not-found" */).then(c => wrapFunctional(c.default || c))
export const PayPal = () => import('../../components/PayPal.vue' /* webpackChunkName: "components/pay-pal" */).then(c => wrapFunctional(c.default || c))
export const ProductCard = () => import('../../components/ProductCard.vue' /* webpackChunkName: "components/product-card" */).then(c => wrapFunctional(c.default || c))
export const ProductCardOld = () => import('../../components/ProductCardOld.vue' /* webpackChunkName: "components/product-card-old" */).then(c => wrapFunctional(c.default || c))
export const ProductDetail = () => import('../../components/ProductDetail.vue' /* webpackChunkName: "components/product-detail" */).then(c => wrapFunctional(c.default || c))
export const ProductDetailOld = () => import('../../components/ProductDetailOld.vue' /* webpackChunkName: "components/product-detail-old" */).then(c => wrapFunctional(c.default || c))
export const ProductGhost = () => import('../../components/ProductGhost.vue' /* webpackChunkName: "components/product-ghost" */).then(c => wrapFunctional(c.default || c))
export const ProductGrid = () => import('../../components/ProductGrid.vue' /* webpackChunkName: "components/product-grid" */).then(c => wrapFunctional(c.default || c))
export const ProductImages = () => import('../../components/ProductImages.vue' /* webpackChunkName: "components/product-images" */).then(c => wrapFunctional(c.default || c))
export const ProductList = () => import('../../components/ProductList.vue' /* webpackChunkName: "components/product-list" */).then(c => wrapFunctional(c.default || c))
export const SearchBar = () => import('../../components/SearchBar.vue' /* webpackChunkName: "components/search-bar" */).then(c => wrapFunctional(c.default || c))
export const SectionBox = () => import('../../components/SectionBox.vue' /* webpackChunkName: "components/section-box" */).then(c => wrapFunctional(c.default || c))
export const SidebarFilter = () => import('../../components/SidebarFilter.vue' /* webpackChunkName: "components/sidebar-filter" */).then(c => wrapFunctional(c.default || c))
export const Stars = () => import('../../components/Stars.vue' /* webpackChunkName: "components/stars" */).then(c => wrapFunctional(c.default || c))
export const TopTicker = () => import('../../components/TopTicker.vue' /* webpackChunkName: "components/top-ticker" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
