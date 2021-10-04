<template>
  <b-row>
    <b-col lg="12" md="12">
      <h1>{{ $t('basket.shipping') }}</h1>
    </b-col>
    <b-col v-if="$auth.loggedIn" lg="7">
      <b-row class="asc_pariette-basket-confirm">
        <b-col cols="12" lg="9">
          <h4>{{ $t('basket.selectDeliveryAddress') }}</h4>
          <b-dropdown
            variant="white"
            class="asc_pariette-basket-confirm-address-select"
            :class="{ 'input--alert': $v.form.delivery.$error }"
          >
            <template #button-content>
              {{ selectDeliveryText }}
            </template>
            <b-dropdown-item v-for="(add, i) in myAddress" :key="'address' + i" @click="selectedAddress(add, 'delivery')">
              {{ add.title }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="12" lg="3" class="mt-4">
          <b-button variant="light" size="sm" @click="addNewAddress('delivery')">
            <i class="fas fa-plus" /> {{ $t('basket.addNewAddress') }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="asc_pariette-basket-confirm mt-3">
        <b-col cols="12" lg="9">
          <h4>{{ $t('basket.selectInvoiceAddress') }}</h4>
          <b-dropdown
            variant="white"
            class="asc_pariette-basket-confirm-address-select"
            :class="{ 'input--alert': $v.form.billing.$error }"
          >
            <template #button-content>
              {{ selectInvoiceText }}
            </template>
            <b-dropdown-item v-for="(add, i) in myAddress" :key="'address' + i" @click="selectedAddress(add, 'invoice')">
              {{ add.title }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="12" lg="3" class="mt-4">
          <b-button variant="light" size="sm" @click="addNewAddress('invoice')">
            <i class="fas fa-plus" /> {{ $t('basket.addNewAddress') }}
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-else lg="7" class="bg-white d-block">
      <p class="my-3">
        {{ $t('basket.loginMessage') }} <nuxt-link :to="localePath({ name: 'auth-login' })">{{ $t('general.login') }}</nuxt-link>
      </p>
      <hr>
      <AddressBox />
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
            <BasketSummary :basket="basketItems" />
          </b-col>
          <b-col cols="12" class="mt-5">
            <b-button id="confirmButton" class="asc_pariette-basket-summary-box-button" @click="confirmOrder()">
              {{ $t('basket.proceedToPayment') }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-col>
    <b-modal id="newAddressModal" ref="newAddressModal" :title="$t('address.addNew')">
      <AddressBox />
    </b-modal>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  layout: 'basket',
  // middleware: 'auth',
  data: () => ({
    selectDeliveryText: '',
    selectInvoiceText: '',
    deliveryPrice: 0,
    form: {
      delivery: null,
      billing: null
    }
  }),
  computed: mapState(['myStore', 'basketItems', 'returnCount', 'confirmOrderMessage', 'myAddress', 'lookup']),
  watch: {
    'returnCount' (e) {
      switch (e) {
        case 1:
          this.$router.push(this.localePath({ name: 'basket-confirm' }))
          break
      }
    },
    'confirmOrderMessage' (newVal) {
      if (newVal) {
        this.$router.push(this.localePath({ name: 'basket-confirm' }))
      }
    }
  },
  mounted () {
    if (this.basketItems.item) {
      this.getDeliveryPrice(this.basketItems.item.length)
    }
    document.getElementById('confirmButton').removeAttribute('disabled')
    this.getData()
  },
  methods: {
    randomPass () {
      let password = ''
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (let i = 0; i <= 6; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
      }
      this.form.password = password
    },
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
      console.log(e + '-' + this.deliveryPrice)
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
    },
    getData () {
      this.$store.dispatch('getOrders')
      this.$store.dispatch('getAddress')
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('auth.fillError'))
      } else {
        document.getElementById('confirmButton').setAttribute('disabled', true)
        this.$store.dispatch('shippingAddresses', { ...this.data, delivery: this.form.delivery, billing: this.form.billing })
      }
    },
    addNewAddress (e) {
      this.$refs.newAddressModal.show()
    }
  },
  validations: {
    form: {
      delivery: {
        required
      },
      billing: {
        required
      }
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
