<template>
  <b-overlay :show="html ? false : true" rounded="sm">
    <div v-for="(sec, i) in html.filter(f => f.lang === 'tr')" :key="'section' + i" class="asc_pariette-sectionBox">
      <h1 v-if="showTitle">{{ sec.title }}</h1>
      <!-- <Anime :content="sec.content" /> -->
      <div v-scroll-reveal.reset="scrollOptions" v-html="sec.content" />
    </div>
  </b-overlay>
</template>
<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      required: false,
      default: false
    },
    html: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data: () => ({
    scrollOptions: {
      delay: 250,
      distance: '10px',
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      rotate: {
        x: 50,
        y: 0,
        z: 0
      },
      scale: 1.2
    }
  })
}
</script>
<style lang="sass">
  .asc_pariette-sectionBox
    min-height: 100px
    display: block
    & h1
      font-family: 'Titillium Web', sans-serif
      font-weight: 700
      padding: 0
      margin: 0
      font-size: 70px
      line-height: .8
    & h2
      font-family: 'Nunito', sans-serif
      font-weight: 200
      padding: 0
      margin: 0
      font-size: 60px
      line-height: .8
    & h3
      font-family: 'Nunito', sans-serif
      font-weight: 200
      padding: 0
      margin: 0
      font-size: 30px
      line-height: 1
    & p
      font-family: 'Nunito', sans-serif
      font-weight: 200
      padding: 0
      margin: 0
      font-size: 22px
      line-height: 1
  .colorful
    background: conic-gradient(from 180deg at 50% 50%, #FFC51A 0deg, #D5FC0D 40.17deg, #45A1F7 90deg, #1F8C7E 143.12deg, #BDFFB3 180deg, #D20CF2 222.51deg, #FF3AE0 268.13deg, #EA5B62 311.21deg, #FFC51A 360deg)
    font-weight: 900 !important
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    padding: 10px 0 !important
</style>
