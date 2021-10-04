<template>
  <b-row>
    <b-col lg="12" md="12">
      <h1>{{ $t('basket.cart') }}</h1>
    </b-col>
    <b-col v-if="basketItems.item" lg="7">
      <b-row class="asc_pariette-basket-info">
        <b-col cols="6" class="d-none d-lg-inline-block">
          <span>{{ $t('basket.title') }}</span>
        </b-col>
        <b-col cols="3" class="d-none d-lg-inline-block text-center">
          <span>{{ $t('basket.amount') }}</span>
        </b-col>
        <b-col cols="3" class="d-none d-lg-inline-block">
          <span>{{ $t('basket.price') }}</span>
        </b-col>
      </b-row>
      <b-row v-for="(or, o) in basketItems.item" :key="'myBasket' + o" class="asc_pariette-basket-list">
        <b-col cols="12" lg="2" class="asc_pariette-basket-list-img">
          <img v-if="myStore.cdn_url" :src="myStore.cdn_url + or.image_web" :alt="or.title" width="" height="">
        </b-col>
        <b-col cols="12" lg="4" class="asc_pariette-basket-list-text">
          <small>{{ $t('basket.sku') }}: {{ or.sku }}</small>
          <h5>{{ or.title }}</h5>
          <div v-for="(sel, s) in or.selected_options" :key="'selected' + s">
            <span v-if="sel">
              <b>{{ sel.title }}:</b> {{ sel.value }}
            </span>
          </div>
        </b-col>
        <b-col cols="12" lg="3" class="asc_pariette-basket-list-opt text-center">
          <div class="asc_pariette-basket-list-opt-amount">
            <!-- <div class="asc_pariette-basket-list-opt-amount-btn asc_pariette-basket-list-opt-amount-btn-minus" @click="or.amount > 1 ? parseInt(or.amount--) : parseInt(or.amount)" /> -->
            <div class="asc_pariette-basket-list-opt-amount-amount">
              <input v-model="or.amount" type="text" :maxlength="or.stock" readonly>
            </div>
            <!-- <div class="asc_pariette-basket-list-opt-amount-btn asc_pariette-basket-list-opt-amount-btn-plus" @click="or.amount <= or.stock ? parseInt(or.amount++) : parseInt(or.amount)" /> -->
            <!-- <small @click="setQuantity(or.id, or.amount)">
              {{ $t('basket.update') }} <i class="fas fa-pen" />
            </small> -->
            <!-- <span v-if="parseInt(or.amount) >= parseInt(or.stock)" class="d-block text-danger mt-1">
              {{ $t('card.stockError', { val: or.stock }) }}
            </span> -->
          </div>
        </b-col>
        <b-col cols="12" lg="3" class="asc_pariette-basket-list-price">
          <h3>{{ setCurrency(or.purchase_price, or.currency) }}</h3>
        </b-col>
        <b-col cols="12" class="text-right">
          <small class="text-right text-danger pointer" @click="deleteItem(or.id)">
            {{ $t('basket.delete') }} <i class="fas fa-trash" />
          </small>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-else lg="7">
      {{ $t('basket.notFound') }}
    </b-col>
    <b-col lg="5" class="asc_pariette-basket-summary">
      <b-row>
        <b-col cols="12">
          <div class="asc_pariette-basket-summary-head">
            <span>{{ $t('basket.summary') }}</span>
            <small v-if="basketItems.item">{{ $t('basket.totalItem', { val: basketItems.item.length }) }}</small>
          </div>
        </b-col>
      </b-row>
      <div class="asc_pariette-basket-summary-box">
        <b-row>
          <b-col cols="12">
            <BasketSummary v-if="basketItems.item" :basket="basketItems" />
          </b-col>
          <b-col cols="12" class="mt-5">
            <b-button
              id="confirmButton"
              class="asc_pariette-basket-summary-box-button"
              :disabled="basketItems.item ? false : true"
              @click="proceedToShipping()"
            >
              {{ $t('basket.proceedToShipping') }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'basket',
  data: () => ({
  }),
  computed: mapState(['myStore', 'basketItems', 'confirmAddressMessage', 'canvas']),
  watch: {
    'confirmAddressMessage' (newVal) {
      this.$router.push(this.localePath({ name: 'basket-address' }))
    }
  },
  methods: {
    setCurrency (p, c) {
      let currencyCode
      switch (c) {
        case 'USD':
          currencyCode = `$${p}`
          break
        default:
          currencyCode = `${p}₺`
          break
      }
      return currencyCode
    },
    async setQuantity (i, q) {
      const quantity = {
        amount: q,
        deleted: 0
      }
      const row = await this.$axios.$put(`order/item/${i}`, quantity)
      if (row.status) {
        this.$toast.success(this.$t('basket.amountUpdated'))
        this.$store.dispatch('getOrders')
      } else {
        this.$toast.error(row.error)
        console.log(row.error)
      }
    },
    async deleteItem (i) {
      const row = await this.$axios.$delete(`order/item/${i}`)
      if (row.status) {
        this.$toast.success(this.$t('basket.basketUpdated'))
        this.$store.dispatch('getOrders')
      } else {
        this.$toast.error(row.error)
        console.log(row.error)
      }
    },
    proceedToShipping () {
      document.getElementById('confirmButton').setAttribute('disabled', true)
      this.$store.dispatch('confirmBasket')
    }
  }
}
</script>
<style lang="sass">

</style>
