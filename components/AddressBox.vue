<template>
  <div>
    <b-row v-if="!$auth.loggedIn">
      <b-col>
        <b-form-group :label="$t('auth.email')">
          <b-form-input v-model="form.email" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group :label="$t('auth.name')">
          <b-form-input v-model="form.name" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group :label="$t('auth.phone')">
          <b-form-input v-model="form.phone" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.name')">
          <b-form-input v-model="address.title" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.country')">
          <v-select v-model="selectedCountry" :options="countryList" label="label" @input="selectCountry" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.region')">
          <v-select v-model="selectedRegion" :options="regionList.region" label="label" @input="selectRegion" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.state')">
          <v-select v-model="selectedState" :options="stateList.state" label="label" @input="selectState" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.city')">
          <b-form-input v-model="address.city" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.post_code')">
          <b-form-input v-model="address.post_code" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.address_1')">
          <b-form-input v-model="address.address_1" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.address_2')">
          <b-form-input v-model="address.address_2" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-group :label="$t('address.note')">
          <b-form-input v-model="address.note" />
        </b-form-group>
      </b-col>
      <b-col cols="12" lg="6" class="mt-4">
        <small @click="cancel()">
          Cancel
        </small>
        <b-button size="sm" variant="success" class="float-right" @click="addNew()">
          OK
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    address: {
      title: null,
      country: null,
      state: null,
      city: null,
      address_1: null,
      address_2: null,
      post_code: null,
      note: null,
      status: 'publish'
    },
    selectedCountry: null,
    selectedRegion: null,
    selectedState: null,
    form: {
      name: '',
      email: '',
      password: '',
      image: 'no-avatar.png',
      phone: '',
      iAgree: null
    }
  }),
  computed: {
    ...mapState(['countryList', 'returnCount', 'regionList', 'stateList'])
  },
  watch: {
    'returnCount' (e) {
      console.log(e)
    }
  },
  mounted () {
    this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupCountry', query: '?', label: 'countryList' })
  },
  methods: {
    async addNew () {
      this.$store.commit('setReturn', 9)
      if (this.$auth.isLoggedIn) {
        const addAddress = await this.$axios.$post('address', this.address)
        if (addAddress.status) {
          this.$bvModal.hide('newAddressModal')
          this.$store.commit('setReturn', 1)
        } else {
          this.$store.commit('setReturn', 2)
          this.$toast.error(addAddress.error)
        }
      } else {
        const userData = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          type: 'userAutoCreate',
          image: this.form.image,
          phone: this.form.phone,
          status: 3
        }
        const reg = await this.$axios.$post('auth/register', userData)
        if (reg.status) {
          this.$store.commit('setNewUser', reg.data)
          const addrData = {
            user: reg.data.id,
            title: this.address.title,
            country: this.address.country,
            state: this.address.state,
            city: this.address.city,
            address_1: this.address.address_1,
            address_2: this.address.address_2,
            post_code: this.address.post_code,
            note: this.address.note,
            status: this.address.status
          }
          const addAddress = await this.$axios.$post('order/orderAddress', addrData)
          if (addAddress.status) {
            this.$store.commit('setReturn', 1)
            this.$bvModal.hide('newAddressModal')
          } else {
            this.$store.commit('setReturn', 2)
            this.$toast.error(addAddress.error)
          }
        } else {
          this.$store.commit('setReturn', 2)
          alert('olmadı')
        }
      }
    },
    selectCountry (e) {
      this.selectedRegion = null
      this.selectedState = null
      this.address.country = e.label
      this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupCountry', query: `/${e.value}`, label: 'regionList' })
    },
    selectRegion (e) {
      this.selectedRegion = e.label
      this.selectedState = null
      this.$store.dispatch('getLookupCountry', { ...this.data, api: 'lookupRegion', query: `/${e.value}`, label: 'stateList' })
    },
    selectState (e) {
      console.log()
      this.selectedState = e.label
    }
  }
}
</script>
