import jwtDecode from 'jwt-decode';
import CookieParser from 'cookieparser';
/* When page is reloaded, server will build it again. In this process,
* the local storage will be deleted, and the token cookie is the only alive.
* The token is decoded to obtain user data (_id, name, email, role) and the nuxtServerInit
* sets the data of user in the store again  */
export const actions = {
  // Everytime when browser is reloaded, this function will be called natively
  nuxtServerInit({commit}, {req}) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = CookieParser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.token;
    if (!accessTokenCookie) return;
    const decoded = jwtDecode(accessTokenCookie);
    this.$auth.setUser(decoded);

  },
};
