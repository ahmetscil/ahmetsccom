<template>
  <div data-scroll class="page page--layout-2">
    <div class="content content--full content--alternate">
      <div class="content__item content__item--wide">
        <span class="content__item-number">01</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/17.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Oh</h2>
        <p class="content__item-description">Little trees and bushes grow however makes them happy.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">02</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/21.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Ri</h2>
        <p class="content__item-description">We don't have to be committed. We are just playing here.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">03</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/19.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Nj</h2>
        <p class="content__item-description">I thought today we would do a happy little picture.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">04</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/20.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Mo</h2>
        <p class="content__item-description">Nature is so fantastic, enjoy it. Let it make you happy.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">05</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/18.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Ne</h2>
        <p class="content__item-description">We need a shadow side and a highlight side.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">06</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/16.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Wy</h2>
        <p class="content__item-description">We'll put some happy little leaves here and there.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">07</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/11.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Tx</h2>
        <p class="content__item-description">With something so strong, a little bit can go a long way.</p>
      </div>
      <div class="content__item content__item--wide">
        <span class="content__item-number">08</span>
        <div class="content__item-imgwrap"><div class="content__item-img" style="background-image: url(img/4.jpg);"></div></div>
        <div class="content__item-deco"></div>
        <h2 class="content__item-title">Sd</h2>
        <p class="content__item-description">There are no limits in this world.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    homeSection1: [],
    homeSection2: [],
    homeSection3: [],
    store: {},
    showContent: false,
    count: 0,
    navlist: [
      { lang: 'tr', title: 'DESIGN', route: 'n' },
      { lang: 'tr', title: 'DEVELOPMENT', route: 'n' },
      { lang: 'tr', title: 'USER EXPERIENCE', route: 'n' },
      { lang: 'tr', title: 'SEO', route: 'n' }
    ]
  }),
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.homeSection1 = await this.$axios.$get('p/canvas/home-section-1').then(res => res.data)
    if (this.homeSection1.status) {
      this.count = this.count + 1
    }
    this.homeSection2 = await this.$axios.$get('p/canvas/home-section-2').then(res => res.data)
    if (this.homeSection2.status) {
      this.count = this.count + 1
    }
    this.homeSection3 = await this.$axios.$get('p/canvas/home-section-3').then(res => res.data)
    if (this.homeSection3.status) {
      this.count = this.count + 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.showContent = false
      if (this.count === 3) {
        setTimeout(() => {
          this.$nuxt.$loading.finish()
        }, 900)
        setTimeout(() => {
          this.showContent = true
        }, 1000)
      }
    })
  }
  // head () {
  //   return {
  //     title: this.store.title,
  //     titleTemplate: `%s | ${this.store.meta_title}`,
  //     meta: [
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { name: 'description', content: this.store.meta_description }
  //     ],
  //     link: [
  //       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  //     ]
  //   }
  // }
}
</script>
<style lang="sass">
</style>
