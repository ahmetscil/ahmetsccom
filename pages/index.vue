<template>
  <div>
    <b-container fluid="md">
      <b-row>
        <b-col cols="12" class="asc_pariette-h75">
          <SectionBox v-if="showContent" :html="homeSection1.content" />
        </b-col>
        <b-col cols="12" class="asc_pariette-h50">
          <SectionBox v-if="showContent" :html="homeSection2.content" />
        </b-col>
        <b-col cols="12" class="asc_pariette-h50">
          <SectionBox v-if="showContent" :html="homeSection3.content" />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <Marquee :list="navlist" />
          <!-- <div class="asc_pariette-stroke">
            <span>DESIGN</span>
          </div> -->
        </b-col>
      </b-row>
    </b-container>
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
      this.$nuxt.$loading.finish()
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
  .asc_pariette-stroke
    width: 100%
    overflow: hidden
    padding: 40px 0
    font-family: 'Nunito', sans-serif
    font-weight: 900
    &:nth-child(1)
      text-indent: 2%
    &:nth-child(2)
      text-indent: 15%
    &:nth-child(3)
      text-indent: 2%
    &:nth-child(4)
      text-indent: 10%
    & span
      white-space: nowrap
      letter-spacing: 10px
      -webkit-text-stroke: 1px black
      color: transparent
      font-size: 150px
      line-height: 1
      transition: .3s
      padding: 50px 0
    &:hover
      & span
        -webkit-text-stroke: 1px transparent
        color: #fff
        text-shadow: 0 0 10px #ccc
        letter-spacing: -10px
        transition: .3s
</style>
