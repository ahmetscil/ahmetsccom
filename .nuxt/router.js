import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7c6cc2ae = () => interopDefault(import('../pages/basket/index.vue' /* webpackChunkName: "pages/basket/index" */))
const _5a24c720 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _2ac5c43a = () => interopDefault(import('../pages/maintenance.vue' /* webpackChunkName: "pages/maintenance" */))
const _6ad916c7 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _846f4fea = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _1cf0647e = () => interopDefault(import('../pages/auth/forgot-password.vue' /* webpackChunkName: "pages/auth/forgot-password" */))
const _211c2522 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _6ed36f0c = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _da8ca620 = () => interopDefault(import('../pages/auth/reset-password.vue' /* webpackChunkName: "pages/auth/reset-password" */))
const _12a59d0b = () => interopDefault(import('../pages/basket/address.vue' /* webpackChunkName: "pages/basket/address" */))
const _7944a1d7 = () => interopDefault(import('../pages/basket/confirm.vue' /* webpackChunkName: "pages/basket/confirm" */))
const _058fbcdf = () => interopDefault(import('../pages/basket/error.vue' /* webpackChunkName: "pages/basket/error" */))
const _1924a19a = () => interopDefault(import('../pages/basket/success.vue' /* webpackChunkName: "pages/basket/success" */))
const _06c637b0 = () => interopDefault(import('../pages/me/my-addresses.vue' /* webpackChunkName: "pages/me/my-addresses" */))
const _e85a4a62 = () => interopDefault(import('../pages/me/my-orders.vue' /* webpackChunkName: "pages/me/my-orders" */))
const _651b7a2f = () => interopDefault(import('../pages/me/my-profile.vue' /* webpackChunkName: "pages/me/my-profile" */))
const _17dab88d = () => interopDefault(import('../pages/me/my-settings.vue' /* webpackChunkName: "pages/me/my-settings" */))
const _5afb91d8 = () => interopDefault(import('../pages/collection/_url/index.vue' /* webpackChunkName: "pages/collection/_url/index" */))
const _752feea0 = () => interopDefault(import('../pages/product/_product.vue' /* webpackChunkName: "pages/product/_product" */))
const _30fdd3f5 = () => interopDefault(import('../pages/products/_collection/index.vue' /* webpackChunkName: "pages/products/_collection/index" */))
const _5c9459a0 = () => interopDefault(import('../pages/products/_collection/_product/index.vue' /* webpackChunkName: "pages/products/_collection/_product/index" */))
const _e9f3f3bc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _502f21da = () => interopDefault(import('../pages/_url/index.vue' /* webpackChunkName: "pages/_url/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/basket",
    component: _7c6cc2ae,
    name: "basket___en"
  }, {
    path: "/contact",
    component: _5a24c720,
    name: "contact___en"
  }, {
    path: "/maintenance",
    component: _2ac5c43a,
    name: "maintenance___en"
  }, {
    path: "/products",
    component: _6ad916c7,
    name: "products___en"
  }, {
    path: "/search",
    component: _846f4fea,
    name: "search___en"
  }, {
    path: "/auth/forgot-password",
    component: _1cf0647e,
    name: "auth-forgot-password___en"
  }, {
    path: "/auth/login",
    component: _211c2522,
    name: "auth-login___en"
  }, {
    path: "/auth/register",
    component: _6ed36f0c,
    name: "auth-register___en"
  }, {
    path: "/auth/reset-password",
    component: _da8ca620,
    name: "auth-reset-password___en"
  }, {
    path: "/basket/address",
    component: _12a59d0b,
    name: "basket-address___en"
  }, {
    path: "/basket/confirm",
    component: _7944a1d7,
    name: "basket-confirm___en"
  }, {
    path: "/basket/error",
    component: _058fbcdf,
    name: "basket-error___en"
  }, {
    path: "/basket/success",
    component: _1924a19a,
    name: "basket-success___en"
  }, {
    path: "/me/my-addresses",
    component: _06c637b0,
    name: "me-my-addresses___en"
  }, {
    path: "/me/my-orders",
    component: _e85a4a62,
    name: "me-my-orders___en"
  }, {
    path: "/me/my-profile",
    component: _651b7a2f,
    name: "me-my-profile___en"
  }, {
    path: "/me/my-settings",
    component: _17dab88d,
    name: "me-my-settings___en"
  }, {
    path: "/collection/:url",
    component: _5afb91d8,
    name: "collection-url___en"
  }, {
    path: "/product/:product?",
    component: _752feea0,
    name: "product-product___en"
  }, {
    path: "/products/:collection",
    component: _30fdd3f5,
    name: "products-collection___en"
  }, {
    path: "/products/:collection/:product",
    component: _5c9459a0,
    name: "products-collection-product___en"
  }, {
    path: "/",
    component: _e9f3f3bc,
    name: "index___en"
  }, {
    path: "/:url",
    component: _502f21da,
    name: "url___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
