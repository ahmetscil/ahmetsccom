<template>
  <div>
    <h1>
      {{ $t('auth.register') }}
    </h1>
    <div class="asc_pariette-auth-form">
      <b-row v-if="loginError">
        <b-col cols="12" class="pb-3 text-danger">
          {{ $t('auth.registerTry') }}
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="asc_pariette-auth-form-inputs">
          <b-form-input
            v-model="form.name"
            type="text"
            :placeholder="$t('auth.name')"
            class="asc_pariette-auth-form-inputs-name"
            :class="{ 'input--alert': $v.form.name.$error }"
            required
          />
          <b-form-input
            v-model="form.email"
            type="email"
            :placeholder="$t('auth.email')"
            class="asc_pariette-auth-form-inputs-email"
            :class="{ 'input--alert': $v.form.email.$error }"
            required
          />
          <b-form-input
            v-model="form.password"
            type="password"
            :placeholder="$t('auth.password')"
            class="asc_pariette-auth-form-inputs-password"
            :class="{ 'input--alert': $v.form.password.$error }"
            required
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-checkbox v-model="form.iAgree" :class="{ 'input--alert-checkbox': $v.form.iAgree.$error }">
            {{ $t('auth.iRead') }}
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-button id="authButton" type="button" class="asc_pariette-auth-form-btn" @click="registerForm()">
        {{ $t('auth.signup') }}
      </b-button>
      <b-row>
        <b-col class="text-center">
          {{ $t('auth.haveAnAccount') }}
          <nuxt-link :to="localePath({ name: 'auth-login' })">
            {{ $t('auth.loginHere') }}
          </nuxt-link>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'auth',
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      image: 'no-avatar.png',
      phone: '',
      iAgree: null
    },
    loginError: false
  }),
  computed: mapState(['myStore', 'locale']),
  methods: {
    async registerForm () {
      this.loginError = false
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('auth.fillError'))
      } else {
        this.$nuxt.$loading.start()
        const userData = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          type: 'user',
          image: this.form.image,
          phone: this.form.phone,
          status: 'newUser'
        }
        const reg = await this.$axios.$post('auth/register', userData)
        if (reg.status) {
          this.$store.commit('setNewUser', reg.data)
          this.$router.push(this.localePath({ name: 'auth-login' }))
        } else {
          this.loginError = true
          this.$toast.error(reg.error)
        }
      }
    }
  },
  head () {
    return {
      title: this.$t('auth.register'),
      link: [
        { rel: 'canonical', href: 'auth/login' }
      ]
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        minLength: minLength(3),
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      iAgree: {
        required
      }
    }
  }
}
</script>
