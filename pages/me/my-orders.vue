<template>
  <b-row>
    <b-col cols="12">
      <h1>
        {{ $t('my.orders') }}
      </h1>
    </b-col>
    <b-col cols="12" lg="3">
      <MyNav />
    </b-col>
    <b-col>
      <MyOrders v-for="(o, i) in myOrders" :key="'order' + i" :order="o" :index="i" />
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import MyNav from '~/components/MyNav.vue'
import MyOrders from '~/components/MyOrders.vue'
export default {
  layout: 'my',
  middleware: 'authenticated',
  components: {
    MyNav,
    MyOrders
  },
  async asyncData ({ $axios, params }) {
    const order = await $axios.$get('order/myOrders')
    return {
      myOrders: order.status ? order.data : []
    }
  },
  computed: mapState(['myStore', 'locale'])
}
</script>
<style lang="sass">

</style>
