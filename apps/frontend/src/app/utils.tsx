import axios from 'axios';

const loggedInUser = {
  user_id: '',
  name: '',
  email: '',
  company_id: '',
  company_name: '',
  managing_id: '',
};

export async function setLoggedInUserData(userEmail: any) {
  let res = await axios
    .get('http://localhost:7000/api/user-mgmt/find/' + userEmail, { responseType: 'json' })
    .then((result) => {
      let userData = result.data.user;
      loggedInUser.user_id = userData._id;
      loggedInUser.name = '';
      loggedInUser.email = userEmail!;
      loggedInUser.company_id = userData.company_id;
      loggedInUser.company_name = userData.company_name;
      loggedInUser.managing_id = userData.managing_id;
      localStorage.setItem('userData', JSON.stringify(loggedInUser)!);
    })
    .catch((err) => {});
}
