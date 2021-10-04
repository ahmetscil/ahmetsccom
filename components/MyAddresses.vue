<template>
  <div>
    <b-row class="asc_pariette-addressbox-list" v-b-toggle="'addressbox' + index">
      <b-col>
        <h4>
          {{ address.title }}
        </h4>
        <p>
          {{ address.address_1 }}
          {{ address.address_2 }}
          {{ address.post_code }}
          {{ address.country }}
          {{ address.city }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    address: {
      type: Array,
      required: false,
      default () {
        return [{}]
      }
    },
    index: {
      type: String,
      required: false,
      default: '1'
    }
  },
  computed: mapState(['myStore']),
  methods: {
  }
}
</script>
<style lang="sass">
  .asc_pariette-addressbox-list
    background: #fff
    margin-bottom: 1.5rem
    padding-top: 15px
    padding-bottom: 15px
    & h4
      font-weight: 700
      letter-spacing: -0.02rem
      line-height: 40px
      font-size: 28px
      padding: 0px
      margin: 0px
    & p
      font-size: 14px
</style>
