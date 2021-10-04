<template>
  <div>
    <b-row class="asc_pariette-orderbox" v-b-toggle="'orderbox' + index">
      <b-col cols="6" class="asc_pariette-orderbox-date">
        <h3>
          {{ convertHeader(order.created_at) }}
        </h3>
      </b-col>
      <b-col cols="6" class="asc_pariette-orderbox-code">
        <small>
          {{ $t('order.orderCode')}}
        </small>
        <h4>
          {{ order.order_code }}
        </h4>
      </b-col>
      <b-col v-for="(item, i) in order.item" :key="'item' + i" cols="12" class="asc_pariette-orderbox-product">
        <b-row class="asc_pariette-orderbox">
          <b-col cols="12" lg="2" class="asc_pariette-orderbox-img">
            <img v-if="myStore.cdn_url" :src="myStore.cdn_url + item.image_web" :alt="item.title" width="" height="">
          </b-col>
          <b-col cols="12" lg="4" class="asc_pariette-orderbox-text">
            <small>
              {{ $t('basket.sku') }}: {{ item.sku }}
            </small>
            <h5>
              {{ item.title }}
            </h5>
              <div v-for="(sel, s) in item.selected_options" :key="'selected' + s">
                <span v-if="sel">
                  <b>{{ sel.title }}:</b> {{ sel.value }}
                </span>
              </div>
          </b-col>
          <b-col cols="12" lg="3" class="asc_pariette-orderbox-opt">
            <div class="asc_pariette-orderbox-opt-amount">
            </div>
          </b-col>
          <b-col cols="12" lg="3" class="asc_pariette-orderbox-price">
            <h3>
              {{ setCurrency(item.purchase_price, item.currency) }}
            </h3>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-collapse :id="'orderbox' + index">
      <b-row class="asc_pariette-orderbox-delivery">
        <b-col cols="8">
          {{ $t('order.deliveryStatus') }}
        </b-col>
        <b-col cols="4">
          <!-- {{ $t('order.cargoTracking') }} -->
        </b-col>
        <b-col cols="12" class="asc_pariette-orderbox-delivery-timeline">
          <div
            class="asc_pariette-orderbox-delivery-timeline-box"
            :class="order.order_status <= 31 ? 'asc_pariette-orderbox-delivery-timeline-box-ok' : ''"
          >
            <div class="asc_pariette-orderbox-delivery-timeline-box-img">
              <img src="@/assets/order-orderreceived.svg" alt="Order Received" width="" height="">
            </div>
            {{ $t('order.orderReceived') }}
          </div>
          <div
            class="asc_pariette-orderbox-delivery-timeline-box"
            :class="order.order_status < 29 ? 'asc_pariette-orderbox-delivery-timeline-box-ok' : ''"
          >
            <div class="asc_pariette-orderbox-delivery-timeline-box-img">
              <img src="@/assets/order-giventoshipment.svg" alt="Order Given To Shipment" width="" height="">
            </div>
            {{ $t('order.givenToShipment') }}
          </div>
          <div
            class="asc_pariette-orderbox-delivery-timeline-box"
            :class="order.order_status < 27 ? 'asc_pariette-orderbox-delivery-timeline-box-ok' : ''"
          >
            <div class="asc_pariette-orderbox-delivery-timeline-box-img">
              <img src="@/assets/order-ontheway.svg" alt="Order On The Way" width="" height="">
            </div>
            {{ $t('order.onTheWay') }}
          </div>
          <div
            class="asc_pariette-orderbox-delivery-timeline-box"
            :class="order.order_status < 25 ? 'asc_pariette-orderbox-delivery-timeline-box-ok' : ''"
          >
            <div class="asc_pariette-orderbox-delivery-timeline-box-img">
              <img src="@/assets/order-deliveredtocustomer.svg" alt="Order Delivered" width="" height="">
            </div>
            {{ $t('order.deliveredToCustomer') }}
          </div>
          <div class="clearfix" />
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    order: {
      type: Array,
      required: false,
      default () {
        return [{}]
      }
    },
    index: {
      type: String,
      required: false,
      default: '1'
    }
  },
  computed: mapState(['myStore']),
  methods: {
    convertHeader (e, c) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const dateObj = new Date()
      const month = monthNames[dateObj.getMonth()]
      // const day = String(dateObj.getDate()).padStart(2, '0')
      const year = dateObj.getFullYear()
      const output = month + '\n' + year
      return output
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
    setQuantity (i, q) {
      console.log(i)
      console.log(q)
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-orderbox
    background: #fff
    margin-bottom: 1.5rem
    padding-top: 15px
    padding-bottom: 15px
    // .asc_pariette-orderbox-product
    .asc_pariette-orderbox-date
      & h3
        font-weight: 700
        letter-spacing: -0.02rem
        line-height: 40px
        font-size: 28px
        padding: 0px
        margin: 0px
    .asc_pariette-orderbox-code
      & small
        font-size: 12px
        line-height: 20px
        font-weight: 400
        letter-spacing: -0.02rem
        padding: 0px
        margin: 0px
        text-align: right
        font-style: italic
        display: block
      & h4
        font-size: 16px
        font-weight: 700
        letter-spacing: -0.02rem
        padding: 0px
        margin: 0px
        text-align: right
        font-style: italic
    .asc_pariette-orderbox-opt
      margin-top: 40px
      .asc_pariette-orderbox-opt-amount
        // border: 1px solid #D9D9D9
        height: 36px
        padding: 2px 4px
        border-radius: 2px
        .asc_pariette-orderbox-opt-amount-btn
          width: 30px
          height: 30px
          line-height: 30px
          background: #E8E8E8
          border-radius: 2px
          text-align: center
          display: inline-block
          position: relative
          cursor: pointer
          &:active
            background: darken(#e8e8e8, 5%)
          .asc_pariette-orderbox-opt-amount-btn-minus
            &::before
              position: absolute
              content: '-'
              top: 5px
              left: 5px
          .asc_pariette-orderbox-opt-amount-btn-plus
            float: right
        .asc_pariette-orderbox-opt-amount-amount
          width: 100%
          // width: calc( 100% - 70px )
          display: inline-block
          margin: auto
          text-align: center
          & input
            background: #fff
            border: none
            // line-height: 30px
            text-align: center
            width: 100%
    .asc_pariette-orderbox-price
      & h3
        color: #36241E
        font-weight: 700
        font-size: 20px
        letter-spacing: -0.04em
        line-height: 120px
        margin: 0px
        padding: 0px
    .asc_pariette-orderbox-img
      height: 130px
      width: 100%
      overflow: hidden
      & img
        height: 100%
    .asc_pariette-orderbox-text
      color: #575757
      font-size: 14px
      letter-spacing: -0.04em
      width: 70%
      float: left
      & h5
        color: #36241E
        font-weight: 600
        font-size: 20px
  .asc_pariette-orderbox-delivery
    .asc_pariette-orderbox-delivery-timeline
      position: relative
      display: flex
      padding-top: 2rem
      padding-bottom: 2rem
      .asc_pariette-orderbox-delivery-timeline-box-ok
        opacity: 1 !important
      .asc_pariette-orderbox-delivery-timeline-box
        position: relative
        flex-grow: 4
        width: 25%
        text-align: center
        color: #000
        font-weight: 400
        font-size: 14px
        letter-spacing: -0.02rem
        opacity: .5
        &:first-child
          &::before
            width: 0
        &::before
          position: absolute
          height: 2px
          background: #3D6E47
          content: ''
          width: 60%
          top: 32%
          left: -30%
        .asc_pariette-orderbox-delivery-timeline-box-img
          background: #E9EEEA
          width: 50px
          height: 50px
          margin: auto
          border-radius: 50px
          line-height: 46px
          text-align: center
</style>
