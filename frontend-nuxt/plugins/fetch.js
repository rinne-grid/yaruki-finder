import auth from '~/plugins/auth'

export default async function ({ store }) {
    if(process.browser) {
        let user
        try {
            user = await auth()

        } catch(error) {
            console.log(error)
        }
        let payload = {user: user || null}
        store.commit('login/setAuthState', payload)
    }
}
