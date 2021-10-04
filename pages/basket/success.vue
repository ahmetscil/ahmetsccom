<template>
  <b-container class="asc_pariette-basket py-5 my-3">
    <b-row>
      <b-col lg="3" md="12">
        <img src="~/assets/baskets.svg" style="width: 100%" alt="Thank you for order" width="" height="">
      </b-col>
      <b-col lg="9" md="12">
        <h1>{{ $t('basket.cardSummary') }}</h1>
        <p>{{ $t('basket.thankU') }}</p>
        <nuxt-link :to="localePath({ name: 'index' })" class="asc_pariette-basket-continue">
          <i class="fas fa-shopping-basket" /> {{ $t('basket.continueShopping') }}
        </nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<style lang="sass">
  .asc_pariette-basket-continue
    background: #000
    color: #fff
    line-height: 40px
    border-radius: 2px
    height: 40px
    display: block
    text-align: center
    width: 300px
    &:hover
      text-decoration: none
      color: #d9d9d9
      background-color: #111
</style>
<script>
export default {
  layout: 'basket',
  middleware: 'auth'
}
</script>
