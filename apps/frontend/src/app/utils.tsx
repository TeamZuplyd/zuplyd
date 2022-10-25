import axios from 'axios';
import { useAuth0, User } from '@auth0/auth0-react';

const loggedInUser = {
  name: '',
  email: '',
  company_id: '',
  company_name: '',
  managing_id: '',
};

export const setLoggedInUserData = async () => {
  const auth = useAuth0();
  const userEmail = auth.user?.email || '';
  let res = await axios
    .get('http://localhost:7000/api/user-mgmt/find/' + userEmail, { responseType: 'json' })
    .then((result) => {
      let userData = result.data.user;

      loggedInUser.name = '';
      loggedInUser.email = userEmail!;
      loggedInUser.company_id = userData.company_id;
      loggedInUser.company_name = userData.company_name;
      loggedInUser.managing_id = userData.managing_id;
      localStorage.setItem('userData', JSON.stringify(loggedInUser)!);
    })
    .catch((err) => {});
};
