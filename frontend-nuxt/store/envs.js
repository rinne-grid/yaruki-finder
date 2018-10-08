
export const state = () => ({
  envObjects: null
})

export const getters = {
  getEnvData (state) {
    return state.envObjects
  },
  getEnvDataByKey: (state) => (key) => {
    return state.envObjects[key]
  }
}

export const actions = {
  setEnvObjects ({commit}, payload) {
    commit('setEnvObjects', payload)
  }
}

export const mutations = {
  setEnvObjects (state, payload) {
    // TODO: キャッシュの機能をつけたい
    state.envObjects = payload
  }
}
