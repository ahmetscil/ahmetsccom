<template>
  <b-list-group class="asc_pariette-me-links">
    <b-list-group-item :to="localePath({ name: 'me-my-orders'})" class="asc_pariette-me-links-orders" exact active-class="asc_pariette-me-links-orders-active">
      {{ $t('my.orders') }}
    </b-list-group-item>
    <b-list-group-item :to="localePath({ name: 'me-my-addresses'})" class="asc_pariette-me-links-addresses" exact active-class="asc_pariette-me-links-addresses-active">
      {{ $t('my.addresses') }}
    </b-list-group-item>
    <b-list-group-item :to="localePath({ name: 'me-my-profile'})" class="asc_pariette-me-links-profile" exact active-class="asc_pariette-me-links-profile-active">
      {{ $t('my.profile') }}
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['myStore'])
}
</script>
<style lang="sass">
  .asc_pariette-me-links
    font-size: 12px
    & a
      color: #888888
    .asc_pariette-me-links-orders
      background-image: url('@/assets/myOrders.svg')
      padding-left: 46px
      background-size: 22px
      background-position-x: 10px
      background-position-y: center
      background-repeat: no-repeat
    .asc_pariette-me-links-addresses
      background-image: url('@/assets/myAddresses.svg')
      padding-left: 46px
      background-size: 22px
      background-position-x: 10px
      background-position-y: center
      background-repeat: no-repeat
    .asc_pariette-me-links-profile
      background-image: url('@/assets/myProfile.svg')
      padding-left: 46px
      background-size: 22px
      background-position-x: 10px
      background-position-y: center
      background-repeat: no-repeat
    .asc_pariette-me-links-orders-active
      background-image: url('@/assets/myOrdersActive.svg') !important
      color: #000
    .asc_pariette-me-links-addresses-active
      background-image: url('@/assets/myAddressesActive.svg') !important
      color: #000
    .asc_pariette-me-links-profile-active
      background-image: url('@/assets/myProfileActive.svg') !important
      color: #000
</style>
