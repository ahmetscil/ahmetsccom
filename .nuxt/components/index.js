export { default as AddressBox } from '../../components/AddressBox.vue'
export { default as Anime } from '../../components/Anime.vue'
export { default as BasketSummary } from '../../components/BasketSummary.vue'
export { default as Breadcrumb } from '../../components/Breadcrumb.vue'
export { default as Carousel } from '../../components/Carousel.vue'
export { default as CollectionBox } from '../../components/CollectionBox.vue'
export { default as Footer } from '../../components/Footer.vue'
export { default as Ghost } from '../../components/Ghost.vue'
export { default as Header } from '../../components/Header.vue'
export { default as HeaderBasket } from '../../components/HeaderBasket.vue'
export { default as HomeBox } from '../../components/HomeBox.vue'
export { default as Loading } from '../../components/Loading.vue'
export { default as Marquee } from '../../components/Marquee.vue'
export { default as MegaMenu } from '../../components/MegaMenu.vue'
export { default as MyAddresses } from '../../components/MyAddresses.vue'
export { default as MyNav } from '../../components/MyNav.vue'
export { default as MyOrders } from '../../components/MyOrders.vue'
export { default as NotFound } from '../../components/NotFound.vue'
export { default as PayPal } from '../../components/PayPal.vue'
export { default as ProductCard } from '../../components/ProductCard.vue'
export { default as ProductCardOld } from '../../components/ProductCardOld.vue'
export { default as ProductDetail } from '../../components/ProductDetail.vue'
export { default as ProductDetailOld } from '../../components/ProductDetailOld.vue'
export { default as ProductGhost } from '../../components/ProductGhost.vue'
export { default as ProductGrid } from '../../components/ProductGrid.vue'
export { default as ProductImages } from '../../components/ProductImages.vue'
export { default as ProductList } from '../../components/ProductList.vue'
export { default as SearchBar } from '../../components/SearchBar.vue'
export { default as SectionBox } from '../../components/SectionBox.vue'
export { default as SidebarFilter } from '../../components/SidebarFilter.vue'
export { default as Stars } from '../../components/Stars.vue'
export { default as TopTicker } from '../../components/TopTicker.vue'

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
