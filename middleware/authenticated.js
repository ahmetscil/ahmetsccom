export default function ({ $auth, redirect }) {
  if (!$auth.$state.loggedIn) {
    return redirect('/auth/login')
  }
}
