export function signInRequest(username, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { username, password },
  };
}

export function signInSuccess(token, admins) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, admins },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
