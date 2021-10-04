<template>
  <b-row>
    <b-col cols="12">
      <h1>
        {{ $t('my.profile') }}
      </h1>
    </b-col>
    <b-col cols="3">
      <MyNav />
    </b-col>
    <b-col>
      <b-row class="bg-white">
        <b-col>
          name: {{ user.name }}<br>
          email: {{ user.email }}<br>
          phone: {{ user.phone }}<br>
          image: {{ user.image }}<br>
          sms2fa: {{ user.sms2fa }}<br>
          email2fa: {{ user.email2fa }}<br>
          google2fa: {{ user.google2fa }}
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import MyNav from '~/components/MyNav.vue'
export default {
  layout: 'my',
  middleware: 'authenticated',
  data: () => ({
    user: {}
  }),
  components: {
    MyNav
  },
  computed: mapState(['myStore', 'locale']),
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.user = this.$auth.user
    }
  }
}
</script>
<style lang="sass">

</style>
