export default {
  setVersion (state, payload) {
    let currentVers = ''
    if (process.browser) {
      if (!localStorage.getItem('version')) {
        localStorage.setItem('version', payload)
      }
      currentVers = localStorage.getItem('version')
      state.version = currentVers
      if (currentVers !== payload) {
        localStorage.setItem('version', payload)
        state.version = localStorage.getItem('version')
        location.reload()
      }
    }
  },
  setError (state, payload) {
    this.$toast.error(payload)
  },
  setReturn (state, payload) {
    state.returnCount = payload
  },
  setLoader (state, payload) {
    state.loading = payload
  },
  setMyStore (state, payload) {
    if (payload !== null) {
      let ms
      if (process.browser) {
        localStorage.setItem('myStore', JSON.stringify(payload))
        ms = localStorage.getItem('myStore')
      }
      state.myStore = JSON.parse(ms)
    } else {
      alert(1)
    }
  },
  setNavigation (state, payload) {
    if (payload.value) {
      state.navigation[payload.label] = payload.value
    }
  },
  setMegamenu (state) {
    state.showMegamenu = !state.showMegamenu
  },
  setHeaderBasket (state, payload) {
    state.showHeaderBasket = payload
  },
  setSearch (state, payload) {
    state.showSearch = payload
  },
  setCanvas (state, payload) {
    state.canvas[payload.label] = payload.value
    state.canvasModal = payload.modal
  },
  setProductsLoader (state, payload) {
    state.productsLoading = payload
  },
  setProductsIsError (state, payload) {
    state.productsIsError = payload
  },
  setProductList (state, payload) {
    if (process.browser) {
      window.scrollTo(0, 0)
    }
    state.products = payload.data
    state.myStore = payload.store
    if (payload.info) {
      state.productFilterlist = payload.info
    }
    state.links = payload.data.links
    state.perPage = payload.data.per_page
    state.totalRow = payload.data.total
    state.lastPage = payload.data.last_page
    state.currentPage = payload.data.current_page
  },
  setCollectionHome (state, payload) {
    state.homeCollection = payload
  },
  setCollectionType (state, payload) {
    state.collectionType = payload
  },
  setCategoryType (state, payload) {
    state.categoryType = payload
  },
  setAttribute (state, payload) {
    state.attribute[payload.label] = payload.value
  },
  setLookup (state, payload) {
    state.lookup[payload.label] = payload.value
  },
  setCountry (state, payload) {
    state[payload.label] = payload.value
  },
  setOption (state, payload) {
    state.option[payload.label] = payload.value
  },
  setHeaderBasketClass (state, payload) {
    if (payload) {
      state.headerBasketAdded = 'asc_pariette-header-basket-basket asc_pariette-header-basket-basket-added'
    } else {
      state.headerBasketAdded = 'asc_pariette-header-basket-basket asc_pariette-header-basket-basket-added-return'
    }
  },
  setBasketItems (state, payload) {
    state.basketItems = payload
  },
  checkOrderCode (state) {
    if (process.browser) {
      if (localStorage.getItem('orderCode')) {
        state.orderCode = localStorage.getItem('orderCode')
      }
    }
  },
  setOrderCode (state, payload) {
    if (process.browser) {
      localStorage.setItem('orderCode', payload)
      state.orderCode = localStorage.getItem('orderCode')
    }
  },
  clearOrderCode (state) {
    if (process.browser) {
      localStorage.removeItem('orderCode')
      state.orderCode = null
    }
  },
  sendToAddress (state, payload) {
    state.confirmAddressMessage = payload
  },
  sendToPayment (state, payload) {
    state.confirmOrderMessage = payload
  },
  sendToSuccess (state, payload) {
    state.confirmPaymentMessage = payload
  },
  setMyAddress (state, payload) {
    state.myAddress = payload
  },
  setNewUser (state, payload) {
    state.registeredUser = payload.name
  },
  // /////////// PAYPAL ///////////////
  PAYPAL_PAID (state, payload) {
    state.paypal_paid = payload
  },
  PAYPAL_ERROR (state, payload) {
    state.paypal_error = payload
  },
  PAYPAL_SUCCESS (state, payload) {
    state.paypal_success = payload
  }
}
