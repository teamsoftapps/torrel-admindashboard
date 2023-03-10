import { auth } from "./../firebaseConfig/config";

const socialMediaAuth = async (provider) => {
  return auth
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
