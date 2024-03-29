import * as SecureStore from 'expo-secure-store';
import { REACT_APP_ADDRESS } from '@env';
export async function Auth(user_text) {
  try {
    return await SecureStore.getItemAsync(user_text)
      .then((response) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
          user_text: user_text,
          token: response,
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        return requestOptions;
      })
      .then((requestOptions) => {
        return fetch(`${REACT_APP_ADDRESS}/auth`, requestOptions)
          .then((response) => response.text())
          .catch((error) => console.error(error));
      });
  } catch (err) {
    return err;
  }
}
export default Auth;
