import React from 'react';
import { withFirebase } from '../firebase';
export const SignOutButton = withFirebase(({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
));