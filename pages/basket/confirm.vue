<template>
  <b-row>
    <b-col lg="12" md="12">
      <h1>{{ $t('basket.paymentDetails') }}</h1>
    </b-col>
    <b-col lg="4" class="asc_pariette-basket-summary">
      <b-row>
        <b-col cols="12">
          <div class="asc_pariette-basket-summary-head">
            {{ $t('basket.summary') }}
          </div>
        </b-col>
        <b-col cols="12">
          <div class="asc_pariette-basket-summary-box">
            <b-row>
              <b-col v-if="basketItems.item" cols="12">
                <h4>
                  {{ $t('basket.totalItem', { val: basketItems.item.length }) }}
                </h4>
              </b-col>
            </b-row>
            <b-row class="asc_pariette-basket-summary-box-list">
              <b-col cols="7">
                <b>{{ $t('basket.totalPrice') }}</b>
              </b-col>
              <b-col cols="5" class="text-right">
                {{ setCurrency(basketItems.net_price, basketItems.currency) }}
              </b-col>
              <b-col cols="7">
                <b>{{ $t('basket.totalVat') }}</b>
              </b-col>
              <b-col cols="5" class="text-right">
                {{ setCurrency(basketItems.total_tax, basketItems.currency) }}
              </b-col>
              <b-col cols="7">
                <b>{{ $t('basket.delivery') }}</b>
              </b-col>
              <b-col cols="5" class="text-right">
                {{ setCurrency(deliveryPrice, basketItems.currency) }}
              </b-col>
              <b-col cols="7">
                <b>{{ $t('basket.PaymentDue') }}</b>
              </b-col>
              <b-col cols="5" class="text-right">
                {{ setCurrency(parseFloat(basketItems.gross_price) + parseFloat(deliveryPrice), basketItems.currency) }}
              </b-col>
              <b-col cols="12" class="asc_pariette-basket-summary-box-agree">
                <b-form-checkbox id="confirmErrorT" v-model="agree" v-b-tooltip.hover.v-danger :title="$t('basket.confirmError')">
                  <span @click="showModal()" :class="agree ? '' : 'text-danger'">
                    {{ $t('basket.confirmOrderAgreement') }}
                  </span>
                </b-form-checkbox>
              </b-col>
              <!-- <b-col cols="12">
                <b-button id="confirmButton" class="asc_pariette-basket-summary-box-button" @click="confirmOrder()">
                  {{ $t('basket.makePayment') }}
                </b-button>
              </b-col> -->
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-col lg="8" class="asc_pariette-basket-summary">
      <div class="asc_pariette-basket-summary-head">
        {{ $t('basket.paymentMethod') }}
      </div>
      <div v-if="!agree" v-b-tooltip.hover.v-danger :title="$t('basket.confirmError')" class="asc_pariette-basket-summary-agree" />
      <PayPal :items="basketItemList" :client="paypal_client_id" />
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'basket',
  // middleware: 'auth',
  data: () => ({
    agree: false,
    deliveryPrice: 0,
    selectDeliveryText: '',
    selectInvoiceText: '',
    form: {
      delivery: null,
      billing: null
    },
    basketItemList: []
  }),
  computed: mapState(['myStore', 'basketItems', 'paypal_client_id', 'confirmPaymentMessage', 'myAddress', 'lookup', 'paypal_paid', 'paypal_error', 'paypal_success']),
  watch: {
    'confirmPaymentMessage' (newVal) {
      if (newVal) {
        this.$router.push(this.localePath({ name: 'basket-success' }))
      }
    },
    'paypal_success' (e) {
      console.log(e)
      if (e) {
        this.confirmOrder()
      } else {
        console.log(e)
        console.log(this.paypal_error)
      }
    }
  },
  mounted () {
    this.selectedPaymentType(1)
    this.getData()
    this.getDeliveryPrice(this.basketItems.amount)
  },
  methods: {
    getDeliveryPrice (e) {
      let price = 0
      if (e >= 1 && e <= 25) {
        price = 74.99
      } else if (e >= 26 && e <= 75) {
        price = 99.99
      } else if (e >= 66 && e <= 125) {
        price = 149.99
      } else if (e >= 126) {
        price = 199.99
      }
      this.deliveryPrice = price

      const items = []
      for (let i = 0; i < this.basketItems.item.length; i++) {
        const it = {
          description: this.basketItems.item[i].title,
          reference_id: Date.now() + i,
          amount: {
            currency_code: this.basketItems.item[i].currency,
            value: parseFloat(this.basketItems.item[i].purchase_price)
          }
        }
        items.push(it)
      }
      const del = {
        description: 'delivery cargo price',
        reference_id: Date.now() + '01',
        amount: {
          currency_code: 'USD',
          value: price
        }
      }
      items.push(del)

      this.basketItemList = items
      console.log(items)
    },
    selectedAddress (i, e) {
      switch (e) {
        case 'delivery':
          this.selectDeliveryText = i.title
          this.form.delivery = i.id
          break
        case 'invoice':
          this.selectInvoiceText = i.title
          this.form.billing = i.id
          break
        default:
          break
      }
      this.$store.dispatch('shippingAddresses', { ...this.data, delivery: this.form.delivery, billing: this.form.billing })
    },
    selectedPaymentType (i) {
      this.$store.dispatch('confirmPayment', { ...this.data, paymentType: i })
    },
    showModal () {
      this.$store.dispatch('getCanvas', { ...this.data, var: 'modal', query: 'distance-sales-agreement-1615364204', modal: true })
      this.$bvModal.show('canvasModal')
    },
    getData () {
      this.$store.dispatch('getLookup', { ...this.data, var: 'paymentType', query: '?type=payment-type' })
    },
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
    confirmOrder () {
      document.getElementById('confirmButton').setAttribute('disabled', true)
      this.$store.dispatch('confirmOrder')
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-basket-confirm
    & h4
      font-weight: 400
      font-size: 16px
      line-height: 130%
      letter-spacing: -0.02em
      color: #575757
    .asc_pariette-basket-confirm-address-select
      color: #575757
      width: 100%
      .dropdown-toggle
        border: 1px solid #D9D9D9
        text-align: left
        background: #fff
        color: #575757
        font-size: 14px
        line-height: 30px
        height: 50px
        &::after
          float: right
          margin-top: 4px
          border-top-color: #d9d9d9
      .dropdown-menu
        width: 100%
        font-size: 14px
      .dropdown-item
        width: 100%
        font-size: 14px
        color: #575757
        &:hover
          background-color: #EBEFEE
</style>
