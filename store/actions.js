export default {
  async getVersion ({ commit }) {
    // const vers = await this.$axios.$get('redis/getVers')
    // commit('setVersion', vers)
  },
  async getMyStore ({ commit }) {
    // let ms
    // if (process.browser) {
    //   if (localStorage.getItem('myStore')) {
    //     ms = JSON.parse(localStorage.getItem('myStore'))
    //     commit('setMyStore', ms)
    //   } else {
    //     alert('store gelmedi')
    //   }
    // }
    const myStore = await this.$axios.$get('p/store')
    if (myStore.status) {
      commit('setMyStore', myStore.data)
    } else {
      commit('setError', myStore)
    }
  },
  async getNavigation ({ commit }, data) {
    const row = await this.$axios.$get(`p/navigation/${data.query}`)
    if (row.status) {
      const pyld = {
        label: data.var,
        value: row.data
      }
      commit('setNavigation', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  async getCanvas ({ commit }, data) {
    const row = await this.$axios.$get(`p/canvas/${data.query}`)
    if (row.status) {
      const pyld = {
        modal: data.modal ? data.modal : false,
        label: data.var,
        value: row.data
      }
      commit('setCanvas', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  async getProducts ({ commit }, data) {
    commit('setProductsLoader', true)
    commit('setProductList', { data: [], store: {} })
    const query = new URLSearchParams(data.query)
    const params = decodeURIComponent(query.toString())
    const row = await this.$axios.$get(`p/${data.api}?${params}`)
    if (row.status) {
      commit('setProductList', row)
      commit('setProductsIsError', false)
      commit('setLoader', false)
      commit('setProductsLoader', false)
    } else {
      commit('setError', row.error)
      commit('setLoader', false)
      commit('setProductsIsError', true)
      commit('setProductsLoader', false)
    }
  },
  async getCollections ({ commit }, data) {
    commit('setProductsLoader', true)
    commit('setProductList', { data: [], store: {} })
    const row = await this.$axios.$get(`p/${data.api}/${data.query}`)
    if (row.status) {
      commit('setProductList', row)
      commit('setProductsIsError', false)
      commit('setLoader', false)
      commit('setProductsLoader', false)
    } else {
      commit('setError', row.error)
      commit('setLoader', false)
      commit('setProductsIsError', true)
      commit('setProductsLoader', false)
    }
  },
  async getCollectionType ({ commit }, data) {
    const row = await this.$axios.$get(`p/collection?${data.query}`)
    if (row.status) {
      commit('setCollectionType', row.data)
    } else {
      commit('setError', row.error)
    }
  },
  async getCategoryType ({ commit }, data) {
    const row = await this.$axios.$get(`p/collection?${data.query}`)
    if (row.status) {
      commit('setCategoryType', row.data)
    } else {
      commit('setError', row.error)
    }
  },
  async getAttribute ({ commit }, data) {
    const row = await this.$axios.$get(`p/attribute${data.query}`)
    if (row.status) {
      const pyld = {
        label: data.var,
        value: row.data
      }
      commit('setAttribute', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  async getLookup ({ commit }, data) {
    const row = await this.$axios.$get(`p/lookup${data.query}`)
    if (row.status) {
      const pyld = {
        label: data.var,
        value: row.data
      }
      commit('setOption', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  async getLookupCountry ({ commit }, data) {
    const row = await this.$axios.$get(`p/${data.api}${data.query}`)
    if (row.status) {
      const pyld = {
        label: data.label,
        value: row.data
      }
      commit('setCountry', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  async getOption ({ commit }, data) {
    const row = await this.$axios.$get(`p/option${data.query}`)
    if (row.status) {
      const pyld = {
        label: data.var,
        value: row.data
      }
      commit('setOption', pyld)
    } else {
      commit('setError', row.error)
    }
  },
  // order methods
  async createOrder ({ commit, state }, data) {
    let orderData
    let res
    let orderCode
    if (state.orderCode) {
      orderCode = state.orderCode
    } else {
      orderCode = null
    }
    console.log(orderCode)
    if (orderCode === null) {
      // first order
      orderData = {
        delivery_address_id: null,
        billing_address_id: null,
        payment_type: null,
        note: '',
        item: [
          {
            product: data.product,
            options: data.options,
            amount: data.amount,
            deleted: 0
          }
        ]
      }
      try {
        res = await this.$axios.post('order', orderData)
        commit('setBasketItems', res.data.data)
        commit('setOrderCode', res.data.data.order_code)
        commit('setHeaderBasketClass', true)
        setTimeout(() => {
          commit('setHeaderBasketClass', false)
        }, 1500)
      } catch (error) {
        commit('setError', res)
        commit('setError', error)
        commit('setHeaderBasketClass', false)
      }
    } else {
      // add item to order
      orderData = {
        order_code: orderCode,
        order_status: 3,
        status: 2,
        item: [
          {
            product: data.product,
            options: data.options,
            amount: data.amount,
            deleted: 0
          }
        ]
      }
      try {
        res = await this.$axios.put(`order/${orderCode}`, orderData)
        commit('setBasketItems', res.data.data)
        commit('setHeaderBasketClass', true)
        setTimeout(() => {
          commit('setHeaderBasketClass', false)
        }, 1500)
      } catch (error) {
        commit('setHeaderBasketClass', false)
        commit('setError', res)
        commit('setError', error)
      }
    }
  },
  async getOrders ({ state, commit }) {
    // sepettekileri görüntüler.
    const row = await this.$axios.$put(`order/checkBasket/${state.orderCode}`)
    if (row.status) {
      commit('setBasketItems', row.data)
    } else {
      commit('setError', row.error)
    }
  },
  async confirmBasket ({ state, commit }) {
    // sepeti adres adımı için onaylar
    commit('sendToAddress', false)
    let lsOrderCode = ''
    lsOrderCode = state.orderCode
    const row = await this.$axios.$put(`order/confirmBasket/${lsOrderCode}`)
    if (row.status) {
      commit('sendToAddress', true)
    } else {
      commit('setError', row.error)
    }
  },
  async shippingAddresses ({ state, commit }, data) {
    // adresler tanımlanır
    commit('sendToPayment', false)
    const shipdata = {
      delivery_address_id: data.delivery,
      billing_address_id: data.billing
    }
    let lsOrderCode = ''
    lsOrderCode = state.orderCode
    const row = await this.$axios.$put(`order/shippingAddresses/${lsOrderCode}`, shipdata)
    if (row.status) {
      commit('sendToPayment', true)
    } else {
      commit('setError', row.error)
    }
  },
  async confirmPayment ({ state, commit }, data) {
    // ödeme işlemini onaylar
    commit('sendToSuccess', false)
    const type = {
      paymentType: data.paymentType
    }
    let lsOrderCode = ''
    lsOrderCode = state.orderCode
    const row = await this.$axios.$put(`order/confirmPayment/${lsOrderCode}`, type)
    if (row.status) {
      console.log(row.status)
      // commit('sendToSuccess', true)
    } else {
      commit('setError', row.error)
    }
  },
  async confirmOrder ({ state, commit }) {
    // makePayment butonuyla birlikte her şeyi kabul ettim siparişi kaydet diyor.
    commit('sendToSuccess', false)
    let lsOrderCode = ''
    lsOrderCode = state.orderCode
    const row = await this.$axios.$put(`order/confirmOrder/${lsOrderCode}`)
    if (row.status) {
      commit('clearOrderCode')
      commit('sendToSuccess', true)
      commit('setBasketItems', [])
    } else {
      commit('setError', row.error)
    }
  },
  async getAddress ({ commit }) {
    const row = await this.$axios.$get('address')
    if (row.status) {
      commit('setMyAddress', row.data)
    } else {
      commit('setError', row.error)
    }
  }
}
