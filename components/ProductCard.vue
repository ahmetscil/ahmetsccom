<template>
  <b-row>
    <b-col v-if="detail.unit_width" cols="12" class="asc_pariette-product-detail-box-row asc_pariette-box-line">
      <b-row class="asc_pariette-product-detail-box-row-calculate">
        <b-col cols="5">
          <div class="asc_pariette-product-detail-box-row-calculate-box">
            <b-form-input
              v-model.trim="calcWidth"
              :title="$v.calcWidth.required ? '' : 'min'"
              :placeholder="$t('product.width')"
              :class="{ 'input--alert': $v.calcWidth.$error }"
              @keyup="calculateSquare(calcWidth)"
            />
            <h6>
              {{ $t('product.sqft') }}
            </h6>
          </div>
        </b-col>
        <b-col cols="2" class="p-0 m-0">
          <h2 class="asc_pariette-product-detail-box-row-calculate-or">
            OR
          </h2>
        </b-col>
        <b-col cols="5">
          <div class="asc_pariette-product-detail-box-row-calculate-box">
            <b-form-input
              v-model.trim="pieces"
              :title="$v.pieces.required ? '' : 'min'"
              :placeholder="$t('product.width')"
              :class="{ 'input--alert': $v.pieces.$error }"
              @keyup="calculatePiece(pieces)"
            />
            <h6>
              {{ $t('product.pieces') }}
            </h6>
          </div>
        </b-col>
        <b-col cols="12">
          <b-form-checkbox v-model="tenPercent" name="check-button" switch button-variant="success" @change="addTenPercent()">
            {{ $t('product.addTen') }}
          </b-form-checkbox>
        </b-col>
        <b-col v-if="parseInt(detail.stock) && parseInt(detail.stock) >= 1" cols="12" class="my-3">
          <div class="asc_pariette-product-detail-box-row-calculate-sub-left">
            {{ $t('product.subtotal') }}
          </div>
          <div class="asc_pariette-product-detail-box-row-calculate-sub-right">
            {{ formatCurrency(detail.currency) + productPrice }}
          </div>
        </b-col>
        <b-col v-else cols="12">
          <span class="asc_pariette-product-stockTempError">
            <h3>{{ $t('product.stockError') }}</h3>
          </span>
        </b-col>
        <b-col cols="12" lg="4">
          <!-- order sample -->
        </b-col>
        <b-col cols="12" lg="8">
          <b-button id="addToCartBtn" variant="dark" :class="addCartClass" @click="addToCartControl(detail.slug)">
            <template v-if="addCartText == 1">
              <i class="fas fa-cart-plus" /> {{ $t('product.addToCart') }}
            </template>
            <template v-if="addCartText == 2">
              <i class="fas fa-check" /> {{ $t('product.addedToCart') }}
            </template>
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-else cols="12" class="asc_pariette-product-detail-box-row asc_pariette-box-line">
      <span class="asc_pariette-product-stockTempError">
        <h3>{{ $t('product.availableError') }}</h3>
      </span>
    </b-col>
  </b-row>
</template>
<script>
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
export default {
  props: {
    detail: {
      type: Object,
      required: false,
      default () {
        return null
      }
    }
  },
  data: () => ({
    optionError: false,
    calcWidth: 0,
    sqft: 0,
    unitsqft: 0,
    pieces: 0,
    neededQuantity: 1,
    tenPercent: false,
    addCartClass: 'asc_pariette-product-detail-box-addCart',
    addCartText: 1,
    selectedOptionIDs: '',
    selOpt: {},
    stockError: false,
    selectableOptions1: [],
    selectableOptions2: [],
    selectableOptions3: [],
    selectableOptions4: [],
    selectableOptions5: [],
    selectableOptions6: [],
    productPrice: 0,
    priceDiff: 0,
    priceDiffType: '+'
  }),
  watch: {
    'neededQuantity' (newVal) {
      this.stockInfo(this.detail.stock, parseInt(newVal))
      this.productPrice = (this.detail.sale_price * parseInt(newVal)).toFixed(2)
    }
  },
  mounted () {
    this.calculateSquare(this.calcWidth)
    this.cartBtn('active')
    this.productPrice = this.neededQuantity * this.detail.sale_price
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
    stockInfo (stock, need) {
      if (parseInt(stock)) {
        if (parseInt(stock) >= 1) {
          if (stock <= need) {
            this.stockError = true
            this.cartBtn('disabled')
            this.showTooltip('stockInput', true)
            this.$toast.error(this.$t('card.stockError', { val: stock }))
          } else {
            this.stockError = false
            this.cartBtn('active')
            this.showTooltip('stockInput', false)
            this.$toast.clear()
          }
        } else {
          this.$toast.error(this.$t('product.stockError', { val: stock }))
        }
      }
    },
    cartBtn (e) {
      switch (e) {
        case 'active':
          document.getElementById('addToCartBtn').removeAttribute('disabled')
          break
        case 'disabled':
          document.getElementById('addToCartBtn').setAttribute('disabled', true)
          break
        default:
          document.getElementById('addToCartBtn').removeAttribute('disabled')
          break
      }
    },
    showTooltip (id, e) {
      if (e) {
        this.$root.$emit('bv::show::tooltip', id)
      } else {
        this.$root.$emit('bv::hide::tooltip', id)
      }
    },
    calculateSquare (e) {
      if (this.detail.unit_width) {
        const pcs = e / this.detail.unit_width
        this.pieces = Math.ceil(pcs)
        this.neededQuantity = Math.ceil(pcs)
        this.productPrice = (this.detail.sale_price * this.neededQuantity).toFixed(2)
        this.stockInfo(this.detail.stock, this.neededQuantity)
      } else {
        this.stockInfo(this.detail.stock, 1)
      }
    },
    calculatePiece (e) {
      console.log(e)
      this.neededQuantity = e
      const clc = (e * this.detail.unit_width).toFixed(2)
      this.calculateSquare(clc)
      this.calcWidth = clc
    },
    addTenPercent () {
      const pie = parseInt(this.neededQuantity)
      if (this.tenPercent === true) {
        this.neededQuantity = Math.ceil(pie * 1.10)
      } else {
        this.neededQuantity = Math.ceil(pie / 1.10)
      }
      this.calculatePiece(this.neededQuantity)
    },
    addToCartControl (e) {
      this.stockInfo(this.detail.stock, parseInt(this.neededQuantity))
      // aşağıda kapanmış olan alan, seçeneklerin doğru seçildiğini kontrol ediyordu.
      // if (this.detail.option) {
      //   const minOpt = Object.keys(this.detail.option)
      //   const keys = Object.keys(this.selOpt)
      //   if (parseInt(minOpt.length) === keys.length) {
      //     this.addToCart()
      //     this.$toast.clear()
      //   } else {
      //     this.optionError = true
      //     this.$toast.error(this.$t('card.selectAnOption'))
      //   }
      // } else {
      //   this.addToCart()
      // }
      this.addToCart()
    },
    addToCart () {
      this.cartBtn('disabled')
      this.addCartClass = 'asc_pariette-product-detail-box-addCart asc_pariette-product-detail-box-addCart-active'
      this.addCartText = 2

      this.$store.dispatch('createOrder', { ...this.data, product: this.detail.slug, options: this.selectedOptionIDs, amount: this.neededQuantity })
      setTimeout(() => {
        this.cartBtn('active')
        this.addCartText = 1
        this.addCartClass = 'asc_pariette-product-detail-box-addCart'
        this.clearAllSelected()
      }, 1000)
    },
    clearAllSelected () {
      this.selOpt = {}
      // selectedOption = {} yukardaki tanımı da silmem gerekti. kullanılacaksa tekrar let selectedOption = {}
      this.neededQuantity = 1
      const selectedClass = document.querySelectorAll('.asc_pariette-product-detail-box-select-option-selected')
      selectedClass.forEach(function (el) {
        el.classList.remove('asc_pariette-product-detail-box-select-option-selected')
      })
    }
  },
  validations: {
    neededQuantity: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(15)
    },
    calcWidth: {
      between: between(15, 15000)
    },
    pieces: {
      between: between(15, 15000)
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-product-stockTempError
    text-align: center
    padding: 30px 0
    & p
      color: #FA6082 !important
      font-style: italic
      line-height: 20px
  .asc_pariette-box-line
    border-bottom: 1px #E4E4E4 solid
  .asc_pariette-product-detail-box-row
    margin-bottom: .6em
    padding-bottom: 1.5em
  .asc_pariette-product-detail-box-row-calculate
    position: relative
    .asc_pariette-product-detail-box-row-calculate-or
      line-height: 70px
      font-weight: 900
      text-align: center
    .asc_pariette-product-detail-box-row-calculate-box
      background: #dbdbdb
      border-radius: 5px
      padding: 5px
      width: 100%
      text-align: center
      .form-control
        font-size: 20px
        font-weight: 700
        background-color: transparent
        border: none
        text-align: center
        width: 100%
      & h6
        font-weight: 700
        color: #999
    .asc_pariette-product-detail-box-row-calculate-sub-left
      text-align: left
      float: left
      font-weight: 300
      font-size: 20px
    .asc_pariette-product-detail-box-row-calculate-sub-right
      text-align: right
      float: right
      font-weight: 900
      font-size: 22px
  .asc_pariette-product-detail-box-row-options
    .asc_pariette-product-detail-box-select
      .asc_pariette-product-detail-box-select-option
        background: #FFFFFF
        border: 1px solid #D8D8D8
        border-radius: 4px
        text-align: center
        padding: 10px
        font-size: 14px
        letter-spacing: -0.04em
        color: #575757
        cursor: pointer
        transition: .3s all
        margin-bottom: 1rem
        display: block
        & a
          color: #575757
        .asc_pariette-product-detail-box-select-option-img
          width: 100%
          height: 40px
          overflow: hidden
          border-radius: 4px
          & img
            width: 100%
            min-height: 100%
        &:hover
          background: #EBEFEE !important
          border: 1px solid #3D6E47 !important
          transition: .3s all
        &:focus
          background: lighten(#EBEFEE, 100%)
          border: 1px solid lighten(#3D6E47, 100%)
          transition: .1s all
    .asc_pariette-product-detail-box-select-option-selected
      background: #EBEFEE !important
      border: 1px solid #3D6E47 !important
  .asc_pariette-product-detail-box-addCart
    width: 100%
    height: 50px
    border-radius: 0px
    font-size: 16px
    transition: 300ms
  .asc_pariette-product-detail-box-addCart-active
    background-color: #3D6E47
    transition: 300ms
</style>
