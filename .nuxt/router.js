import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0c113489 = () => interopDefault(import('../pages/basket/index.vue' /* webpackChunkName: "pages/basket/index" */))
const _61f7da90 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _501b4c03 = () => interopDefault(import('../pages/maintenance.vue' /* webpackChunkName: "pages/maintenance" */))
const _4192b4a7 = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _080fedeb = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _7e97cb44 = () => interopDefault(import('../pages/auth/forgot-password.vue' /* webpackChunkName: "pages/auth/forgot-password" */))
const _4be099fc = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _717d22cc = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _6eb7bb10 = () => interopDefault(import('../pages/auth/reset-password.vue' /* webpackChunkName: "pages/auth/reset-password" */))
const _2d418a2a = () => interopDefault(import('../pages/basket/address.vue' /* webpackChunkName: "pages/basket/address" */))
const _4ffe3fb7 = () => interopDefault(import('../pages/basket/confirm.vue' /* webpackChunkName: "pages/basket/confirm" */))
const _4fd752bf = () => interopDefault(import('../pages/basket/error.vue' /* webpackChunkName: "pages/basket/error" */))
const _2043810c = () => interopDefault(import('../pages/basket/success.vue' /* webpackChunkName: "pages/basket/success" */))
const _05d1fb70 = () => interopDefault(import('../pages/me/my-addresses.vue' /* webpackChunkName: "pages/me/my-addresses" */))
const _53cb1ea2 = () => interopDefault(import('../pages/me/my-orders.vue' /* webpackChunkName: "pages/me/my-orders" */))
const _63c6a04f = () => interopDefault(import('../pages/me/my-profile.vue' /* webpackChunkName: "pages/me/my-profile" */))
const _22d75326 = () => interopDefault(import('../pages/me/my-settings.vue' /* webpackChunkName: "pages/me/my-settings" */))
const _b1958598 = () => interopDefault(import('../pages/collection/_url/index.vue' /* webpackChunkName: "pages/collection/_url/index" */))
const _579ca2e0 = () => interopDefault(import('../pages/product/_product.vue' /* webpackChunkName: "pages/product/_product" */))
const _704cbc56 = () => interopDefault(import('../pages/products/_collection/index.vue' /* webpackChunkName: "pages/products/_collection/index" */))
const _481bb080 = () => interopDefault(import('../pages/products/_collection/_product/index.vue' /* webpackChunkName: "pages/products/_collection/_product/index" */))
const _846d677c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _de48061a = () => interopDefault(import('../pages/_url/index.vue' /* webpackChunkName: "pages/_url/index" */))

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
    component: _0c113489,
    name: "basket___en"
  }, {
    path: "/contact",
    component: _61f7da90,
    name: "contact___en"
  }, {
    path: "/maintenance",
    component: _501b4c03,
    name: "maintenance___en"
  }, {
    path: "/products",
    component: _4192b4a7,
    name: "products___en"
  }, {
    path: "/search",
    component: _080fedeb,
    name: "search___en"
  }, {
    path: "/auth/forgot-password",
    component: _7e97cb44,
    name: "auth-forgot-password___en"
  }, {
    path: "/auth/login",
    component: _4be099fc,
    name: "auth-login___en"
  }, {
    path: "/auth/register",
    component: _717d22cc,
    name: "auth-register___en"
  }, {
    path: "/auth/reset-password",
    component: _6eb7bb10,
    name: "auth-reset-password___en"
  }, {
    path: "/basket/address",
    component: _2d418a2a,
    name: "basket-address___en"
  }, {
    path: "/basket/confirm",
    component: _4ffe3fb7,
    name: "basket-confirm___en"
  }, {
    path: "/basket/error",
    component: _4fd752bf,
    name: "basket-error___en"
  }, {
    path: "/basket/success",
    component: _2043810c,
    name: "basket-success___en"
  }, {
    path: "/me/my-addresses",
    component: _05d1fb70,
    name: "me-my-addresses___en"
  }, {
    path: "/me/my-orders",
    component: _53cb1ea2,
    name: "me-my-orders___en"
  }, {
    path: "/me/my-profile",
    component: _63c6a04f,
    name: "me-my-profile___en"
  }, {
    path: "/me/my-settings",
    component: _22d75326,
    name: "me-my-settings___en"
  }, {
    path: "/collection/:url",
    component: _b1958598,
    name: "collection-url___en"
  }, {
    path: "/product/:product?",
    component: _579ca2e0,
    name: "product-product___en"
  }, {
    path: "/products/:collection",
    component: _704cbc56,
    name: "products-collection___en"
  }, {
    path: "/products/:collection/:product",
    component: _481bb080,
    name: "products-collection-product___en"
  }, {
    path: "/",
    component: _846d677c,
    name: "index___en"
  }, {
    path: "/:url",
    component: _de48061a,
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
