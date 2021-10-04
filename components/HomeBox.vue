<template>
  <b-overlay :show="homepage ? false : true" rounded="sm">
    <b-container fluid class="asc_pariette-homepage py-5 my-3">
      <b-row>
        <b-col lg="10" md="12" offset-lg="1" offset-md="0">
          <b-row v-if="homepage">
            <b-col
              v-for="(box, y) in homepage.filter(f => f.lang === locale)"
              :key="'box' + y"
              md="12"
              :lg="index[y]"
            >
              <div class="px-3 py-3" v-html="box.html" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-overlay>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    homepage: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    index: {
      type: Array,
      required: false,
      default () {
        return [6, 2, 2, 2]
      }
    }
  },
  computed: mapState(['locale'])
}
</script>
<style lang="sass">
  .asc_pariette-homepage
    min-height: 300px
    display: block
    & h1
      font-size: 32px
      font-weight: 600
      letter-spacing: -0.02em
      width: 90%
    & h2
      font-size: 20px
      letter-spacing: -0.02em
    & p
      font-size: 14px
      color: #575757
      font-weight: 300
      letter-spacing: -0.02em
    & img
      width: 36px
      height: 36px
</style>
