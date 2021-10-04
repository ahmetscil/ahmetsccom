<template>
  <div>
    <h1>
      {{ $t('auth.resetPass') }}
    </h1>
    <div class="asc_pariette-auth-form">
      <b-row v-if="loginError">
        <b-col cols="12" class="pb-3 text-danger">
          {{ $t('auth.loginTry') }}
        </b-col>
      </b-row>
      <b-row v-if="registeredUser">
        <b-col cols="12" class="pb-3 text-danger">
          {{ $t('auth.welcomeMessage', { val: registeredUser }) }}
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="asc_pariette-auth-form-inputs">
          <b-form-input
            v-model="form.password"
            type="password"
            :placeholder="$t('auth.login')"
            class="asc_pariette-auth-form-inputs-password"
            :class="{ 'input--alert': $v.form.password.$error }"
            required
          />
        </b-col>
      </b-row>
      <b-button id="authButton" type="button" class="asc_pariette-auth-form-btn" @click="loginForm()">
        {{ $t('auth.reset') }}
      </b-button>
      <b-row>
        <b-col class="text-center">
          {{ $t('auth.noAccount') }}
          <nuxt-link :to="localePath({ name: 'auth-register' })">
            {{ $t('auth.signUpHere') }}
          </nuxt-link>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  layout: 'auth',
  data: () => ({
    form: {
      password: ''
    },
    loginError: false
  }),
  computed: mapState(['registeredUser', 'myStore']),
  methods: {
    async loginForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('auth.fillError'))
      } else {
        this.loginError = false
        document.getElementById('authButton').setAttribute('disabled', true)
        try {
          const login = await this.$auth.loginWith('laravelJWT', { data: this.form })
          document.getElementById('authButton').removeAttribute('disabled')
          if (login.success) {
            this.$toast.success(this.$t('auth.pleaseWait'))
            setTimeout(() => {
              this.$router.push(this.localePath('index'))
            })
          }
        } catch (err) {
          document.getElementById('authButton').removeAttribute('disabled')
          this.$toast.error(this.$t('auth.loginError'))
          this.loginError = true
          console.log(err)
        }
      }
    },
    onReset () {
      this.form.password = ''
    }
  },
  head () {
    return {
      title: this.$t('auth.resetPass'),
      link: [
        { rel: 'canonical', href: 'auth/login' }
      ]
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      }
    }
  }
}
</script>
