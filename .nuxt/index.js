import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_pluginutils_61662e0a from 'nuxt_plugin_pluginutils_61662e0a' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_3491b8f4 from 'nuxt_plugin_pluginrouting_3491b8f4' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_3f11e5a9 from 'nuxt_plugin_pluginmain_3f11e5a9' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_googlegtag_6c0e6bef from 'nuxt_plugin_googlegtag_6c0e6bef' // Source: ./google-gtag.js (mode: 'client')
import nuxt_plugin_toast_2911f9ef from 'nuxt_plugin_toast_2911f9ef' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_workbox_2cfbd25c from 'nuxt_plugin_workbox_2cfbd25c' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_2efafd6f from 'nuxt_plugin_metaplugin_2efafd6f' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_33a2a2e3 from 'nuxt_plugin_iconplugin_33a2a2e3' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_5ce1ad40 from 'nuxt_plugin_axios_5ce1ad40' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_googleanalytics_6d1e3a34 from 'nuxt_plugin_googleanalytics_6d1e3a34' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_plugin_3be8d9ac from 'nuxt_plugin_plugin_3be8d9ac' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_63994b6f from 'nuxt_plugin_bootstrapvue_63994b6f' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_vuelidate_4be431c8 from 'nuxt_plugin_vuelidate_4be431c8' // Source: ../plugins/vuelidate.js (mode: 'all')
import nuxt_plugin_vselect_8425108a from 'nuxt_plugin_vselect_8425108a' // Source: ../plugins/vselect.js (mode: 'all')
import nuxt_plugin_smoth_317b8778 from 'nuxt_plugin_smoth_317b8778' // Source: ../plugins/smoth.js (mode: 'client')
import nuxt_plugin_scrollreveal_ff2c46b2 from 'nuxt_plugin_scrollreveal_ff2c46b2' // Source: ../plugins/scrollreveal.js (mode: 'client')
import nuxt_plugin_lightGalleryclient_235dd9a0 from 'nuxt_plugin_lightGalleryclient_235dd9a0' // Source: ../plugins/lightGallery.client.js (mode: 'client')
import nuxt_plugin_auth_03115820 from 'nuxt_plugin_auth_03115820' // Source: ./auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Canvas Teknoloji","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"theme-color","content":"#f7f7f7"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Ffontawesome\u002Fcss\u002Fall.min.css"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Titillium+Web:wght@100;200;400;600;700;900&family=Nunito:wght@100;200;400;600;700;900"}],"style":[],"script":[{"hid":"gf-script","innerHTML":"(function(){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Titillium+Web:wght@100;200;400;600;700;900&family=Nunito:wght@100;200;400;600;700;900\";document.querySelector(\"head\").appendChild(l);})();"}],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Titillium+Web:wght@100;200;400;600;700;900&family=Nunito:wght@100;200;400;600;700;900\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_pluginutils_61662e0a === 'function') {
    await nuxt_plugin_pluginutils_61662e0a(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_3491b8f4 === 'function') {
    await nuxt_plugin_pluginrouting_3491b8f4(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_3f11e5a9 === 'function') {
    await nuxt_plugin_pluginmain_3f11e5a9(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googlegtag_6c0e6bef === 'function') {
    await nuxt_plugin_googlegtag_6c0e6bef(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_2911f9ef === 'function') {
    await nuxt_plugin_toast_2911f9ef(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_2cfbd25c === 'function') {
    await nuxt_plugin_workbox_2cfbd25c(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_2efafd6f === 'function') {
    await nuxt_plugin_metaplugin_2efafd6f(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_33a2a2e3 === 'function') {
    await nuxt_plugin_iconplugin_33a2a2e3(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_5ce1ad40 === 'function') {
    await nuxt_plugin_axios_5ce1ad40(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_6d1e3a34 === 'function') {
    await nuxt_plugin_googleanalytics_6d1e3a34(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_3be8d9ac === 'function') {
    await nuxt_plugin_plugin_3be8d9ac(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_63994b6f === 'function') {
    await nuxt_plugin_bootstrapvue_63994b6f(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4be431c8 === 'function') {
    await nuxt_plugin_vuelidate_4be431c8(app.context, inject)
  }

  if (typeof nuxt_plugin_vselect_8425108a === 'function') {
    await nuxt_plugin_vselect_8425108a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_smoth_317b8778 === 'function') {
    await nuxt_plugin_smoth_317b8778(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_scrollreveal_ff2c46b2 === 'function') {
    await nuxt_plugin_scrollreveal_ff2c46b2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lightGalleryclient_235dd9a0 === 'function') {
    await nuxt_plugin_lightGalleryclient_235dd9a0(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_03115820 === 'function') {
    await nuxt_plugin_auth_03115820(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
