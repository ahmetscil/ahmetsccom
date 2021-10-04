<template>
  <b-container fluid class="asc_pariette-page py-5">
    <b-row>
      <b-col lg="10" md="12" offset-lg="1" offset-md="0">
        <b-row>
          <b-col cols="12">
            <div class="asc_pariette-page-header">
              <SectionBox :html="canvas.content" :showTitle="true" />
            </div>
          </b-col>
          <b-col xl="6" lg="6" cols="12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.972699161859!2d-84.14949478480641!3d33.94183028063615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a39ea032e385%3A0x7d19d41a7a312e75!2s1856%20Corporate%20Dr%20%23105%2C%20Norcross%2C%20GA%2030093%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1627501467912!5m2!1str!2str"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            />
          </b-col>
          <b-col
            xl="4"
            lg="6"
            cols="12"
            offset="0"
            offset-lg="0"
            offset-xl="2"
          >
            <b-row class="bg-white py-3 rounded asc_pariette-contactForm">
              <b-col cols="6">
                <b-form-group :label="$t('ticket.name')">
                  <b-form-input v-model="ticket.user" />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group :label="$t('ticket.subject')">
                  <b-form-input v-model="ticket.title" />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group :label="$t('ticket.email')">
                  <b-form-input v-model="ticket.email" />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group :label="$t('ticket.phone')">
                  <b-form-input v-model="ticket.phone" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group :label="$t('ticket.content')">
                  <b-form-textarea v-model="ticket.description" rows="6" />
                </b-form-group>
              </b-col>
              <b-col cols="12" class="text-right">
                <b-button variant="warning" @click="sendTicket()">
                  <i class="far fa-check-square" /> {{ $t('ticket.send') }}
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    canvas: [],
    ticket: {
      type: 'support',
      user: '',
      title: '',
      email: '',
      phone: '',
      description: ''
    }
  }),
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch () {
    this.canvas = await this.$axios.$get('p/canvas/contact-1614104831').then(res => res.data)
  },
  methods: {
    async sendTicket () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('auth.fillError'))
      } else {
        const sendTicket = await this.$axios.$post('p/ticket', this.ticket)
        if (sendTicket.status) {
          this.$toast.success(this.$t('ticket.sended'))
        } else {
          this.$toast.error(this.$t('ticket.error'))
        }
      }
    }
  },
  head () {
    return {
      title: this.$t('auth.forgotPass'),
      link: [
        { rel: 'canonical', href: '/' }
      ]
    }
  },
  validations: {
    ticket: {
      user: {
        required
      },
      title: {
        required
      },
      email: {
        required
      },
      phone: {
        required
      },
      description: {
        required
      }
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-contactForm
    font-size: 12px
</style>
