<template>
  <b-row class="asc_pariette-basket-summary-box-list">
    <b-col cols="7">
      <b>{{ $t('basket.totalPrice') }}</b>
    </b-col>
    <b-col cols="5" class="text-right">
      {{ setCurrency(basket.gross_price) }}
    </b-col>
    <!-- <b-col cols="7">
      <b>{{ $t('basket.totalVat') }}</b>
    </b-col>
    <b-col cols="5" class="text-right">
      {{ setCurrency(basket.total_tax) }}
    </b-col> -->
    <!-- <b-col cols="12">
      <span>
        {{ $t('basket.selectInfo') }}
      </span>
    </b-col> -->
    <b-col cols="4" class="my-3">
      <b>{{ $t('basket.totalVat') }}</b>
    </b-col>
    <b-col cols="8" class="my-3 text-right">
      <div v-if="showState">
        <b-form-group :label="$t('basket.country')">
          <v-select v-model="selectedCountry" :options="countryList" label="label" @input="selectCountry" />
        </b-form-group>
        <b-form-group :label="$t('basket.region')">
          <v-select v-model="selectedRegion" :options="regionList.region" label="label" @input="selectRegion" />
        </b-form-group>
        <b-form-group :label="$t('basket.state')">
          <v-select v-model="selectedState" :options="stateList.state" label="label" @input="selectState" />
        </b-form-group>
      </div>
      <div v-if="taxValue" class="w-100">
        {{ setCurrency(taxValue) }}
      </div>
    </b-col>
    <b-col cols="5">
      <b>{{ $t('basket.delivery') }}</b>
    </b-col>
    <b-col cols="7" class="text-right">
      <!-- {{ basket.delivery_price ? setCurrency(basket.delivery_price) : 0 }} -->
      {{ setCurrency(deliveryPrice) }}
    </b-col>
    <b-col cols="5">
      <b>{{ $t('basket.PaymentDue') }}</b>
    </b-col>
    <b-col cols="7" class="text-right">
      <span v-if="taxValue">
        {{ price }}
      </span>
      <span v-else>
        {{ $t('basket.selectState') }}
      </span>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    basket: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data: () => ({
    selectedCountry: null,
    selectedRegion: null,
    selectedState: null,
    taxValue: null,
    showState: true,
    price: 0,
    deliveryPrice: 0
  }),
  computed: {
    ...mapState(['countryList', 'regionList', 'stateList'])
  },
  mounted () {
    if (this.basket.amount) {
      if (this.$route.path === '/basket/address') {
        this.showState = false
      } else {
        this.showState = true
      }
      this.selectedControl()
      this.getDeliveryPrice(this.basket.amount)
      this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupCountry', query: '?', label: 'countryList' })
    }
  },
  methods: {
    formatCurrency (e) {
      let ret = '$'
      switch (e) {
        case 'USD':
          ret = '$'
          break
        case 'EUR':
          ret = '€'
          break
        case 'TRY':
          ret = '₺'
          break
        default:
          ret = '$'
          break
      }
      return ret
    },
    showTooltip (id, e) {
      if (e) {
        this.$root.$emit('bv::show::tooltip', id)
      } else {
        this.$root.$emit('bv::hide::tooltip', id)
      }
    },
    getDeliveryPrice (e) {
      if (this.basket.gross_price <= 2) {
        this.deliveryPrice = 1
      } else {
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
      }
    },
    setCurrency (p) {
      let currencyCode
      switch (this.basket.currency) {
        case 'USD':
          currencyCode = `$${p}`
          break
        default:
          currencyCode = `${p}₺`
          break
      }
      return currencyCode
    },
    selectedControl () {
      if (process.browser) {
        if (localStorage.getItem('selectedCountry')) {
          this.selectedCountry = JSON.parse(localStorage.getItem('selectedCountry')).label
        }
        if (localStorage.getItem('selectedRegion')) {
          this.selectedRegion = JSON.parse(localStorage.getItem('selectedRegion')).label
        }
        if (localStorage.getItem('selectedState')) {
          const d = JSON.parse(localStorage.getItem('selectedState'))
          this.selectedState = d.label
          this.calcPrice(d.tax)
        }
      }
    },
    selectCountry (e) {
      if (process.browser) {
        localStorage.setItem('selectedCountry', JSON.stringify(e))
        this.selectedControl()
      }
      this.selectedRegion = null
      this.selectedState = null
      this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupCountry', query: `/${e.value}`, label: 'regionList' })
    },
    selectRegion (e) {
      if (process.browser) {
        localStorage.setItem('selectedRegion', JSON.stringify(e))
        this.selectedControl()
      }
      this.selectedRegion = e.label
      this.selectedState = null
      this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupRegion', query: `/${e.value}`, label: 'stateList' })
    },
    selectState (e) {
      if (process.browser) {
        localStorage.setItem('selectedState', JSON.stringify(e))
        this.selectedControl()
      }
    },
    calcPrice (e) {
      const v = parseInt(e)
      const p = parseFloat(this.basket.gross_price)
      const tax = ((p * v) / 100).toFixed(2)
      this.taxValue = tax
      this.price = this.setCurrency(parseFloat(p) + parseFloat(tax))
    }
  }
}
</script>
