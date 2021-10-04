<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h1>
          {{ $t('my.addresses') }}
        </h1>
      </b-col>
      <b-col cols="3">
        <MyNav />
      </b-col>
      <b-col class="asc_pariette-addressbox">
        <MyAddresses v-for="(add, i) in myAddress" :key="'address' + i" :address="add" />
        <b-button variant="light" class="asc_pariette-addressbox-button" v-b-modal.newAddressModal>
          {{ $t('address.addNew') }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal id="newAddressModal" :title="$t('address.addNew')">
      <b-form-group :label="$t('address.name')">
        <b-form-input v-model="form.title" />
      </b-form-group>
      <b-form-group :label="$t('address.country')">
        <b-form-input v-model="form.country" />
      </b-form-group>
      <b-form-group :label="$t('address.city')">
        <b-form-input v-model="form.city" />
      </b-form-group>
      <b-form-group :label="$t('address.address_1')">
        <b-form-input v-model="form.address_1" />
      </b-form-group>
      <b-form-group :label="$t('address.address_2')">
        <b-form-input v-model="form.address_2" />
      </b-form-group>
      <b-form-group :label="$t('address.post_code')">
        <b-form-input v-model="form.post_code" />
      </b-form-group>
      <b-form-group :label="$t('address.note')">
        <b-form-input v-model="form.note" />
      </b-form-group>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="addNew()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MyNav from '~/components/MyNav.vue'
import MyAddresses from '~/components/MyAddresses.vue'
export default {
  layout: 'my',
  middleware: 'authenticated',
  components: {
    MyNav,
    MyAddresses
  },
  data: () => ({
    form: {
      title: '33',
      country: '3',
      city: '3',
      address_1: '3',
      address_2: '3',
      post_code: '3',
      note: '3',
      status: 'publish'
    }
  }),
  computed: mapState(['myStore', 'locale', 'myAddress']),
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getAddress')
    },
    async addNew () {
      const address = await this.$axios.$post('address', this.form)
      if (address.status) {
        this.getData()
        this.$bvModal.hide('newAddressModal')
      } else {
        this.$toast.error(address.error)
      }
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-addressbox
    .asc_pariette-addressbox-button
      border: 1px solid #3D6E47
      background: #fff
      color: #3D6E47
      width: 100%
</style>
