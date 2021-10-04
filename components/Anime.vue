<template>
  <div>
    <span v-html="content" />
    <!-- {{ content }} -->
  </div>
</template>
<script>
import anime from 'animejs/lib/anime.min.js'
export default {
  props: {
    content: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    html: {
      type: Array
    }
  },
  data: () => ({
  }),
  mounted () {
    this.animate('anime1')
  },
  methods: {
    animate (e) {
      switch (e) {
        case 'anime1':
          if (process.browser) {
            const textWrapper = document.querySelector('.' + e)
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, '<span class=\'letter\'>$&</span>')
            anime.timeline({ loop: false })
              .add({
                targets: '.anime1 .letter',
                translateX: [40, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
              })
          }
          break
        case 'anime2':
          anime({
            targets: '.anime2',
            translateX: [0, -30],
            opacity: [1, 0],
            easing: 'easeInExpo',
            duration: 1100,
            delay: (el, i) => 100 + 30 * i
          })
          break
      }
    }
  }
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
