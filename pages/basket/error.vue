<template>
  <b-container class="asc_pariette-basket py-5 my-3">
    <b-row>
      <b-col lg="3" md="12">
        <img src="~/assets/baskets.svg" alt="Basket" width="" height="">
      </b-col>
      <b-col lg="9" md="12">
        <h1>{{ $t('basket.sometingWrongTitle') }}</h1>
        <p>{{ $t('basket.sometingWrongText') }}</p>
        <nuxt-link :to="localePath({ name: 'index' })" class="asc_pariette-basket-continue">
          <i class="fas fa-shopping-basket" /> {{ $t('basket.continueShopping') }}
        </nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>
<style lang="sass">
  .asc_pariette-basket-continue
    background: #FA6082
    color: #fff
    line-height: 40px
    border-radius: 2px
    height: 50px
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
