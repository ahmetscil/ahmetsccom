import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a3db52a6 = () => interopDefault(import('../pages/basket/index.vue' /* webpackChunkName: "pages/basket/index" */))
const _cf6a1c28 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _16131af8 = () => interopDefault(import('../pages/index2.vue' /* webpackChunkName: "pages/index2" */))
const _6e1b555f = () => interopDefault(import('../pages/maintenance.vue' /* webpackChunkName: "pages/maintenance" */))
const _67d3ddcb = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _abdddfe2 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _7bda4efc = () => interopDefault(import('../pages/auth/forgot-password.vue' /* webpackChunkName: "pages/auth/forgot-password" */))
const _ad09e3b4 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _656490f6 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _3d36a86c = () => interopDefault(import('../pages/auth/reset-password.vue' /* webpackChunkName: "pages/auth/reset-password" */))
const _0fa0640f = () => interopDefault(import('../pages/basket/address.vue' /* webpackChunkName: "pages/basket/address" */))
const _763f68db = () => interopDefault(import('../pages/basket/confirm.vue' /* webpackChunkName: "pages/basket/confirm" */))
const _1c4f163a = () => interopDefault(import('../pages/basket/error.vue' /* webpackChunkName: "pages/basket/error" */))
const _161f689e = () => interopDefault(import('../pages/basket/success.vue' /* webpackChunkName: "pages/basket/success" */))
const _c20a04b8 = () => interopDefault(import('../pages/me/my-addresses.vue' /* webpackChunkName: "pages/me/my-addresses" */))
const _781b92d3 = () => interopDefault(import('../pages/me/my-orders.vue' /* webpackChunkName: "pages/me/my-orders" */))
const _01e9c2ab = () => interopDefault(import('../pages/me/my-profile.vue' /* webpackChunkName: "pages/me/my-profile" */))
const _14d57f91 = () => interopDefault(import('../pages/me/my-settings.vue' /* webpackChunkName: "pages/me/my-settings" */))
const _5ca378e0 = () => interopDefault(import('../pages/collection/_url/index.vue' /* webpackChunkName: "pages/collection/_url/index" */))
const _6ecd1eb4 = () => interopDefault(import('../pages/product/_product.vue' /* webpackChunkName: "pages/product/_product" */))
const _1b1234f9 = () => interopDefault(import('../pages/products/_collection/index.vue' /* webpackChunkName: "pages/products/_collection/index" */))
const _2e02dd1c = () => interopDefault(import('../pages/products/_collection/_product/index.vue' /* webpackChunkName: "pages/products/_collection/_product/index" */))
const _39728a9e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _60475817 = () => interopDefault(import('../pages/_url/index.vue' /* webpackChunkName: "pages/_url/index" */))

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
    component: _a3db52a6,
    name: "basket___en___en___en___en___en___en"
  }, {
    path: "/contact",
    component: _cf6a1c28,
    name: "contact___en___en___en___en___en___en"
  }, {
    path: "/index2",
    component: _16131af8,
    name: "index2___en___en___en___en___en___en"
  }, {
    path: "/maintenance",
    component: _6e1b555f,
    name: "maintenance___en___en___en___en___en___en"
  }, {
    path: "/products",
    component: _67d3ddcb,
    name: "products___en___en___en___en___en___en"
  }, {
    path: "/search",
    component: _abdddfe2,
    name: "search___en___en___en___en___en___en"
  }, {
    path: "/auth/forgot-password",
    component: _7bda4efc,
    name: "auth-forgot-password___en___en___en___en___en___en"
  }, {
    path: "/auth/login",
    component: _ad09e3b4,
    name: "auth-login___en___en___en___en___en___en"
  }, {
    path: "/auth/register",
    component: _656490f6,
    name: "auth-register___en___en___en___en___en___en"
  }, {
    path: "/auth/reset-password",
    component: _3d36a86c,
    name: "auth-reset-password___en___en___en___en___en___en"
  }, {
    path: "/basket/address",
    component: _0fa0640f,
    name: "basket-address___en___en___en___en___en___en"
  }, {
    path: "/basket/confirm",
    component: _763f68db,
    name: "basket-confirm___en___en___en___en___en___en"
  }, {
    path: "/basket/error",
    component: _1c4f163a,
    name: "basket-error___en___en___en___en___en___en"
  }, {
    path: "/basket/success",
    component: _161f689e,
    name: "basket-success___en___en___en___en___en___en"
  }, {
    path: "/me/my-addresses",
    component: _c20a04b8,
    name: "me-my-addresses___en___en___en___en___en___en"
  }, {
    path: "/me/my-orders",
    component: _781b92d3,
    name: "me-my-orders___en___en___en___en___en___en"
  }, {
    path: "/me/my-profile",
    component: _01e9c2ab,
    name: "me-my-profile___en___en___en___en___en___en"
  }, {
    path: "/me/my-settings",
    component: _14d57f91,
    name: "me-my-settings___en___en___en___en___en___en"
  }, {
    path: "/collection/:url",
    component: _5ca378e0,
    name: "collection-url___en___en___en___en___en___en"
  }, {
    path: "/product/:product?",
    component: _6ecd1eb4,
    name: "product-product___en___en___en___en___en___en"
  }, {
    path: "/products/:collection",
    component: _1b1234f9,
    name: "products-collection___en___en___en___en___en___en"
  }, {
    path: "/products/:collection/:product",
    component: _2e02dd1c,
    name: "products-collection-product___en___en___en___en___en___en"
  }, {
    path: "/",
    component: _39728a9e,
    name: "index___en___en___en___en___en___en"
  }, {
    path: "/:url",
    component: _60475817,
    name: "url___en___en___en___en___en___en"
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
