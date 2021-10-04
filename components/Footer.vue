<template>
  <div class="asc_pariette-footer">
    <b-container fluid>
      <b-row class="asc_pariette-footer-navigation">
        <b-col cols="12" md="3">
          <div class="asc_pariette-footer-logo">
            <img :src="myStore.cdn_url + myStore.logo_footer">
            <p v-html="myStore.footer_copyright" />
          </div>
        </b-col>
        <b-col lg="10" md="9" offset-lg="1" offset-md="0">
          <b-row>
            <!-- <b-col v-if="rightNav" md="12" lg="3">
              <ul>
                <li>
                  {{ rightNav.title }}
                  <ul v-for="(row, c) in rightNav.items" :key="'rightNav' + c">
                    {{ row.title }}
                  </ul>
                </li>
              </ul>
            </b-col>
            <b-col v-if="socialmedia" md="12" lg="5" class="text-right">
              <ul>
                <li v-for="(row, d) in socialmedia.items" :key="'socialmedia' + d" class="asc_pariette-socialmedia-links">
                  <a :href="row.link" :title="row.title">
                    <i :class="row.icon" />
                  </a>
                </li>
              </ul>
            </b-col> -->
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    leftNav: [],
    middleNav: [],
    rightNav: [],
    footerGreen: [],
    footerAddress: [],
    socialmedia: []
  }),
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.socialmedia = await this.$axios.$get('p/navigation/footer-socialmedia-1613947190').then(res => res.data)
  },
  computed: mapState(['locale', 'navigation', 'myStore', 'canvas'])
}
</script>
<style lang="sass">
  .asc_pariette-footer
    font-family: 'Nunito', sans-serif
    padding: 70px 30px 30px 30px
    background: linear-gradient(140.05deg, #2C2C2C 0%, #000000 100%)
    .asc_pariette-footer-bottom
      text-align: center
      font-size: 12px
      width: 100%
      padding: 10px 0
    .asc_pariette-footer-navigation
      padding-bottom: 50px
      & ul
        padding: 0
        & li
          list-style: none
          font-weight: 400
          color: #36241E
          line-height: 30px
          & ul
            padding: 0 0 0 20px
            & li
              padding: 0
              font-weight: 300
              line-height: 40px
          & a
            text-decoration: none
            color: #575757
  .asc_pariette-footer-logo
    color: #999999
    & a
      color: #999999
    & img
      width: 100px
      display: block
    & p
      font-weight: 100
      letter-spacing: 0.2rem
      width: 100%
      padding: 10px 0
      line-height: 1
      margin: 0
      font-size: 22px
  .asc_pariette-socialmedia-links
    display: inline-block
    padding: .5rem
    margin-top: 3rem
    font-size: 24px
</style>
