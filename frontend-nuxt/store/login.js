import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  getUser(state) {
    return state.user
  }

}

export const actions = {
  doSignup({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(
        payload.username,
        payload.password
      ).then(response => {
        resolve()
      }).catch(response => {
        reject()
      })
    })
  },
  doLogin ({commit}, payload) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(
        payload.username,
        payload.password
      ).then(response => {
        let user = firebase.auth().currentUser
        let payload = {user: user}
        commit('setAuthState', payload)
        resolve()
      }).catch(error => {
        console.error(error)
        reject()
      })
    })
  },
  doLogout ({commit}) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(response => {
        let payload = {user: null}
        commit('setAuthState', payload)
        resolve()
      }).catch(err => {
        console.error(err)
        reject()
      })
    })
  },
  setAuthState ({commit}) {
    let user = firebase.auth().currentUser;
    let payload = {user: user}
    commit('setAuthState', payload)
  },
  updateUser({commit}, payload) {
    return new Promise((resolve, reject) => {
      let user = firebase.auth().currentUser
      user.updateProfile(payload).then(response => {
        commit('setAuthState', {user: user})
        resolve()
      }).catch(error => {
        reject()
      })
    })
  }
}

export const mutations = {
  setAuthState(state, payload) {
    state.user = payload.user
  }
}
