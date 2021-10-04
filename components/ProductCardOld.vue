<template>
  <section>
    <b-row>
      <b-col cols="12">
        <h2>{{ $t('product.addToCart') }}</h2>
      </b-col>
    </b-row>
    <b-row v-if="detail.group_name" class="asc_pariette-product-detail-box-row-options">
      <b-col
        v-for="(grp, g) in detail.group_products"
        :key="'groupProd' + g"
        cols="12"
        md="6"
        lg="6"
        xl="6"
        class="asc_pariette-product-detail-box-select"
      >
        <nuxt-link :to="localePath({ name: 'product-product', params: { product: grp.slug } })" :class="detail.slug === grp.slug ? 'asc_pariette-product-detail-box-select-option asc_pariette-product-detail-box-select-option-selected' : 'asc_pariette-product-detail-box-select-option'">
          {{ grp.title }}
        </nuxt-link>
      </b-col>
    </b-row>
    <b-row v-if="detail.option" class="asc_pariette-product-detail-box-row-options">
      <b-col v-if="optionError" cols="12">
        <span class="asc_pariette-product-stockTempError">
          <h3>{{ $t('card.selectAnOption') }}</h3>
        </span>
      </b-col>
      <!-- <b-col v-for="(prd, p) in JSON.parse(detail.option_tree)" :key="'prd' + p" cols="12" class="my-5">
        <b-row v-for="(opt, o0) in prd.options" :key="'prdopt' + o0">
          <b-col cols="12">
            <h3>{{ opt.label }}</h3>
          </b-col>
          <b-col v-for="(opt2, o1) in opt.options" :key="'prdopt' + o1" cols="3" class="asc_pariette-product-detail-box-select">
            <div :id="opt2.name + '-' + opt2.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(1, opt2)">
              <div :title="opt2.label">
                {{ opt2.label }}
              </div>
            </div>
          </b-col>
        </b-row>
        <template v-if="selectableOptions1">
          <b-row v-for="(sel11, s) in selectableOptions1.options" :key="'selectable1' + s">
            <b-col cols="12">
              <h3>{{ sel11.label }}</h3>
            </b-col>
            <b-col v-for="(sel12, o2) in sel11.options" :key="'sel11' + o2" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel12.name + '-' + sel12.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(2, sel12)">
                <div :title="sel12.label">
                  {{ sel12.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
        <template v-if="selectableOptions2">
          <b-row v-for="(sel21, s) in selectableOptions2.options" :key="'selectable2' + s">
            <b-col cols="12">
              <h3>{{ sel21.label }}</h3>
            </b-col>
            <b-col v-for="(sel22, o3) in sel21.options" :key="'sel2' + o3" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel22.name + '-' + sel22.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(3, sel22)">
                <div :title="sel22.label">
                  {{ sel22.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
        <template v-if="selectableOptions3">
          <b-row v-for="(sel31, s) in selectableOptions3.options" :key="'selectable3' + s">
            <b-col cols="12">
              <h3>{{ sel31.label }}</h3>
            </b-col>
            <b-col v-for="(sel32, o4) in sel31.options" :key="'sel3' + o4" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel32.name + '-' + sel32.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(4, sel32)">
                <div :title="sel32.label">
                  {{ sel32.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
        <template v-if="selectableOptions4">
          <b-row v-for="(sel41, s) in selectableOptions4.options" :key="'selectable4' + s">
            <b-col cols="12">
              <h3>{{ sel41.label }}</h3>
            </b-col>
            <b-col v-for="(sel42, o5) in sel41.options" :key="'sel4' + o5" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel42.name + '-' + sel42.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(5, sel42)">
                <div :title="sel42.label">
                  {{ sel42.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
        <template v-if="selectableOptions5">
          <b-row v-for="(sel51, s) in selectableOptions5.options" :key="'selectable5' + s">
            <b-col cols="12">
              <h3>{{ sel51.label }}</h3>
            </b-col>
            <b-col v-for="(sel52, o6) in sel51.options" :key="'sel5' + o6" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel52.name + '-' + sel52.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(6, sel52)">
                <div :title="sel52.label">
                  {{ sel52.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
        <template v-if="selectableOptions6">
          <b-row v-for="(sel61, s) in selectableOptions6.options" :key="'selectable5' + s">
            <b-col cols="12">
              <h3>{{ sel61.label }}</h3>
            </b-col>
            <b-col v-for="(sel62, o7) in sel61.options" :key="'sel6' + o7" cols="3" class="asc_pariette-product-detail-box-select">
              <div :id="sel62.name + '-' + sel62.value" class="asc_pariette-product-detail-box-select-option" @click="setOption(7, sel62)">
                <div :title="sel62.label">
                  {{ sel62.label }}
                </div>
              </div>
            </b-col>
          </b-row>
        </template>
      </b-col> -->
      <!--
      bu alan seçilebilir olan her şeyi listeliyordu
      <b-col v-for="(opt, o8) in detail.option" :key="'option' + o8" cols="12">
        <b-row>
          <b-col cols="12">
            <h3>{{ o8 }} <span class="text-danger">*</span></h3>
          </b-col>
          <b-col
            v-for="(item, it) in opt"
            :key="'items' + it"
            cols="12"
            md="6"
            lg="6"
            xl="3"
            class="asc_pariette-product-detail-box-select"
          >
            <div v-if="item.option.photo" :id="item.option.name + '-' + item.option.value" class="asc_pariette-product-detail-box-select-option" @click="selectOption(item.option.id, item.option.name, item.option.value)">
              <div class="asc_pariette-product-detail-box-select-option-img" :title="item.title + ' ' + item.option.label">
                <img v-if="myStore.cdn_url" :src="myStore.cdn_url + item.option.photo" :alt="item.title + ' ' + item.option.label" width="" height="">
              </div>
            </div>
            <div v-else :id="item.option.name + '-' + item.option.value" class="asc_pariette-product-detail-box-select-option" @click="selectOption(item.option.id, item.option.name, item.option.value)">
              <div :title="item.title + ' ' + item.option.label">
                {{ item.option.label }}
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col> -->
    </b-row>
    <b-row v-if="detail.unit_width" class="asc_pariette-product-detail-box-row asc_pariette-box-line">
      <b-col cols="12">
        <h2 v-html="$t('product.calculate', { val: detail.unit_type })" />
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col v-if="detail.unit_type === 'inch'" class="asc_pariette-product-detail-box-row-calculate" cols="12" md="12" lg="8">
            <b-form-input
              v-model.trim="calcWidth"
              :title="$v.calcWidth.required ? '' : 'min'"
              :placeholder="$t('product.width')"
              :class="{ 'input--alert': $v.calcWidth.$error }"
              class="asc_pariette-product-detail-box-row-calculate-inch"
              @keyup="calculate(detail.unit_type)"
            />
            <h2 class="d-none d-lg-inline-block">
              =
            </h2>
          </b-col>
          <b-col v-else class="asc_pariette-product-detail-box-row-calculate" cols="12" md="12" lg="8">
            <b-form-input
              v-model.trim="calcWidth"
              :placeholder="$t('product.width')"
              :class="{ 'input--alert': $v.calcWidth.$error }"
              class="asc_pariette-product-detail-box-row-calculate-width"
              :title="$v.calcWidth.required ? '' : 'min'"
              @keyup="calculate(detail.unit_type)"
            />
            <h2>
              X
            </h2>
            <b-form-input
              v-model.trim="calcHeight"
              :placeholder="$t('product.height')"
              :class="{ 'input--alert': $v.calcHeight.$error }"
              class="asc_pariette-product-detail-box-row-calculate-height"
              @keyup="calculate(detail.unit_type)"
            />
            <h2 class="d-none d-lg-inline-block">
              =
            </h2>
          </b-col>
          <b-col class="asc_pariette-product-detail-box-row-calculate" cols="12" md="12" lg="4">
            <b-row class="text-center">
              <b-col cols="6">
                <h1>{{ sqft }}</h1>
                <small>{{ $t('product.sqft') }}</small>
              </b-col>
              <b-col cols="6">
                <h1>{{ pieces }}</h1>
                <small>{{ $t('product.pieces') }}</small>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <template v-if="detail.available === 1">
      <b-row v-if="parseInt(detail.stock) && parseInt(detail.stock) >= 1" class="asc_pariette-product-detail-box-row">
        <b-col cols="12">
          <h3>{{ $t('product.selectQuantity') }} <span class="text-danger">*</span></h3>
        </b-col>
        <b-col cols="12" lg="12" xl="2">
          <b-form-input
            id="stockInput"
            v-model="neededQuantity"
            v-b-tooltip.hover.v-danger
            :title="$t('card.stockError', { val: detail.stock })"
            :class="stockError ? 'input--alert' : ''"
            @click="neededQuantity = null"
          />
        </b-col>
        <b-col v-if="detail.unit_width" cols="12" lg="12" :xl="detail.unit_width ? 2 : 0">
          <p>{{ $t('product.sqfeet') }}: {{ unitsqft }} {{ detail.unit_type }}</p>
        </b-col>
        <b-col cols="12" lg="12" :xl="detail.unit_width ? 2 : 4">
          <p>{{ $t('product.subtotal') }}: {{ formatCurrency(detail.currency) + this.productPrice }}</p>
        </b-col>

        <b-col cols="12" xl="6">
          <b-form-checkbox v-model="tenPercent" name="check-button" switch button-variant="success" @change="addTenPercent()">
            {{ $t('product.addTen') }}
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row v-else class="asc_pariette-product-detail-box-row asc_pariette-box-line">
        <b-col cols="12">
          <span class="asc_pariette-product-stockTempError">
            <h3>{{ $t('product.stockError') }}</h3>
          </span>
        </b-col>
      </b-row>
      <b-row class="asc_pariette-product-detail-box-row">
        <b-col cols="12" lg="8" class="mx-auto">
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
    </template>
    <template v-else class="asc_pariette-product-detail-box-row asc_pariette-box-line">
      <b-col cols="12">
        <span class="asc_pariette-product-stockTempError">
          <h3>{{ $t('product.availableError') }}</h3>
        </span>
      </b-col>
    </template>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
const touchMap = new WeakMap()
let selectedOption = {}
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
    calcWidth: 5,
    calcHeight: 5,
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
  computed: {
    ...mapState(['myStore'])
  },
  watch: {
    'neededQuantity' (newVal) {
      this.stockInfo(this.detail.stock, parseInt(newVal))
      this.productPrice = (this.detail.sale_price * parseInt(newVal)).toFixed(2)
    }
  },
  mounted () {
    this.calculate(this.detail.unit_type)
    this.cartBtn(true)
    this.productPrice = this.neededQuantity * this.detail.sale_price
  },
  methods: {
    setOption (index, e) {
      switch (index) {
        case 1:
          this.selectableOptions1 = e
          this.selectableOptions2 = []
          this.selectableOptions3 = []
          this.selectableOptions4 = []
          this.selectableOptions5 = []
          this.selectableOptions6 = []
          break
        case 2:
          this.selectableOptions2 = e
          this.selectableOptions3 = []
          this.selectableOptions4 = []
          this.selectableOptions5 = []
          this.selectableOptions6 = []
          break
        case 3:
          this.selectableOptions3 = e
          this.selectableOptions4 = []
          this.selectableOptions5 = []
          this.selectableOptions6 = []
          break
        case 4:
          this.selectableOptions4 = e
          this.selectableOptions5 = []
          this.selectableOptions6 = []
          break
        case 5:
          this.selectableOptions5 = e
          this.selectableOptions6 = []
          break
        case 6:
          this.selectableOptions6 = e
          break
      }
      const i = e.id
      const n = e.name
      const v = e.value
      if (typeof selectedOption[n] === 'undefined') {
        selectedOption[n] = v
      } else {
        const newID = n + '-' + selectedOption[n]
        const elem = document.getElementById(newID)
        if (elem) {
          elem.classList.remove('asc_pariette-product-detail-box-select-option-selected')
        }
        selectedOption[n] = v
      }
      const box = document.getElementById(n + '-' + v)
      box.classList.add('asc_pariette-product-detail-box-select-option-selected')
      this.selOpt = selectedOption
      this.selectedOptionIDs = i + ',' + this.selectedOptionIDs

      console.log(this.selOpt)
      if (e.price_diff) {
        let newTotal = 0
        if (e.diff_type === '+') {
          newTotal = parseFloat(this.productPrice) + parseFloat(e.price_diff)
        } else {
          newTotal = parseFloat(this.productPrice) - parseFloat(e.price_diff)
        }
        this.productPrice = newTotal
      }
    },
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
            this.cartBtn(false)
            this.showTooltip('stockInput', true)
            this.$toast.error(this.$t('card.stockError', { val: stock }))
          } else {
            this.stockError = false
            this.cartBtn(true)
            this.showTooltip('stockInput', false)
            this.$toast.clear()
          }
        } else {
          this.$toast.error(this.$t('product.stockError', { val: stock }))
        }
      }
    },
    cartBtn (e) {
      if (e) {
        document.getElementById('addToCartBtn').removeAttribute('disabled')
      } else {
        document.getElementById('addToCartBtn').setAttribute('disabled', true)
      }
    },
    showTooltip (id, e) {
      if (e) {
        this.$root.$emit('bv::show::tooltip', id)
      } else {
        this.$root.$emit('bv::hide::tooltip', id)
      }
    },
    selectOption (i, n, v) {
      if (typeof selectedOption[n] === 'undefined') {
        selectedOption[n] = v
      } else {
        document.getElementById(n + '-' + selectedOption[n]).classList.remove('asc_pariette-product-detail-box-select-option-selected')
        selectedOption[n] = v
      }
      const box = document.getElementById(n + '-' + v)
      box.classList.add('asc_pariette-product-detail-box-select-option-selected')
      this.selOpt = selectedOption
      this.selectedOptionIDs = i + ',' + this.selectedOptionIDs
    },
    calculate (e) {
      if (this.detail.unit_width) {
        console.log(e)
        let unitsquare
        let pcs
        switch (e) {
          case 'mm':
            pcs = (this.sqft * 1000) / unitsquare
            this.sqft = this.calcWidth * this.calcHeight
            unitsquare = this.detail.unit_width * this.detail.unit_height / 1000
            console.log(pcs)
            break
          case 'inch':
            this.sqft = this.calcWidth
            unitsquare = this.detail.unit_width
            pcs = this.sqft / unitsquare
            break
          default:
            break
        }
        this.unitsqft = unitsquare
        this.pieces = Math.ceil(pcs)
        this.neededQuantity = Math.ceil(pcs)
        this.productPrice = (this.detail.sale_price * this.neededQuantity).toFixed(2)
        this.stockInfo(this.detail.stock, this.neededQuantity)
      } else {
        this.stockInfo(this.detail.stock, 1)
      }
    },
    addTenPercent () {
      const pie = parseInt(this.neededQuantity)
      if (this.tenPercent === true) {
        this.neededQuantity = Math.ceil(pie + ((pie * 10) / 100))
      } else {
        this.neededQuantity = Math.ceil(pie - ((pie * 10) / 100))
      }
      this.productPrice = (this.detail.sale_price * this.neededQuantity).toFixed(2)
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
      this.cartBtn(true)
      this.addCartClass = 'asc_pariette-product-detail-box-addCart asc_pariette-product-detail-box-addCart-active'
      this.addCartText = 2

      this.$store.dispatch('createOrder', { ...this.data, product: this.detail.slug, options: this.selectedOptionIDs, amount: this.neededQuantity })
      setTimeout(() => {
        this.cartBtn(false)
        this.addCartText = 1
        this.addCartClass = 'asc_pariette-product-detail-box-addCart'
        this.clearAllSelected()
      }, 1000)
    },
    clearAllSelected () {
      this.selOpt = {}
      selectedOption = {}
      this.neededQuantity = 1
      const selectedClass = document.querySelectorAll('.asc_pariette-product-detail-box-select-option-selected')
      selectedClass.forEach(function (el) {
        el.classList.remove('asc_pariette-product-detail-box-select-option-selected')
      })
    },
    delayTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 100))
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
    calcHeight: {
      between: between(15, 15000)
    }
  }
}
</script>
<style lang="sass">
//   .asc_pariette-product-stockTempError
//     text-align: center
//     padding: 30px 0
//     & p
//       color: #FA6082 !important
//       font-style: italic
//       line-height: 20px
//   .asc_pariette-box-line
//     border-bottom: 1px #E4E4E4 solid
//   .asc_pariette-product-detail-box-row
//     margin-bottom: .6em
//     padding-bottom: 1.5em
//   .asc_pariette-product-detail-box-row-calculate
//     position: relative
//     .form-control
//       width: 38% !important
//       display: inline-block !important
//       background-position: right
//       background-repeat: no-repeat
//       background-size: 24px
//     .asc_pariette-product-detail-box-row-calculate-width
//       background-image: url('@/assets/fullwidth.svg')
//     .asc_pariette-product-detail-box-row-calculate-height
//       background-image: url('@/assets/fullheight.svg')
//     .asc_pariette-product-detail-box-row-calculate-inch
//       background-image: url('@/assets/fullInch.svg')
//   .asc_pariette-product-detail-box-row-options
//     .asc_pariette-product-detail-box-select
//       .asc_pariette-product-detail-box-select-option
//         background: #FFFFFF
//         border: 1px solid #D8D8D8
//         border-radius: 4px
//         text-align: center
//         padding: 10px
//         font-size: 14px
//         letter-spacing: -0.04em
//         color: #575757
//         cursor: pointer
//         transition: .3s all
//         margin-bottom: 1rem
//         display: block
//         & a
//           color: #575757
//         .asc_pariette-product-detail-box-select-option-img
//           width: 100%
//           height: 40px
//           overflow: hidden
//           border-radius: 4px
//           & img
//             width: 100%
//             min-height: 100%
//         &:hover
//           background: #EBEFEE !important
//           border: 1px solid #3D6E47 !important
//           transition: .3s all
//         &:focus
//           background: lighten(#EBEFEE, 100%)
//           border: 1px solid lighten(#3D6E47, 100%)
//           transition: .1s all
//     .asc_pariette-product-detail-box-select-option-selected
//       background: #EBEFEE !important
//       border: 1px solid #3D6E47 !important
//   .asc_pariette-product-detail-box-addCart
//     width: 100%
//     height: 50px
//     border-radius: 0px
//     font-size: 16px
//     transition: 300ms
//   .asc_pariette-product-detail-box-addCart-active
//     background-color: #3D6E47
//     transition: 300ms
</style>
