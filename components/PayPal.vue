<template>
  <div ref="paypal" />
</template>
<script>
export default {
  props: {
    client: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    items: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loaded: false,
      paidFor: false
    }
  },
  mounted () {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.client}`
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  methods: {
    setLoaded () {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: this.items
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.paidFor = true
            console.log(order)
          },
          onError: (err) => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    }
  }
}
</script>
