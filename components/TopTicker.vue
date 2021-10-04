<template>
  <div class="asc_pariette-topTicker">
    <ul>
      <li v-for="(t, i) in tickerList" :key="'ticker' + i">
        {{ t.title }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    tickerList: [
      { title: '$75 FLAT SHIPPING' }
    ]
  })
  // async fetch () {
  //   this.headerNav = await this.$axios.$get('p/navigation/header-navigation-1613914979').then(res => res.data)
  // },
}
</script>
<style lang="sass">
  .asc_pariette-topTicker
    position: fixed
    z-index: 99
    width: 100%
    height: 30px
    line-height: 30px
    text-align: center
    font-weight: 600
    background: #1d4732
    color: #fff
    & ul
      list-style: none
      padding: 0
      & li
        font-size: 12px
</style>
