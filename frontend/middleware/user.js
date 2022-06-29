/*export default async function ({ app, redirect }) {
  // the following look directly for the cookie created by nuxtjs/auth
  // instead of using $auth.loggedIn
  const user = await app.$cookies.get('token')
  console.log(redirect);
  if (user) {
    return
  } else {
    // redirect to homepage
    redirect('/auth/signin')
  }
}*/
