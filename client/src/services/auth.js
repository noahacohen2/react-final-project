import ChangePassword from "../Components/ChangePassword/ChangePassword";

const API_KEY = "AIzaSyCctdnDaDWc9auUP2o4w21x_Z5zN-ooGxY";

export default {

    async SignUp(userDetails) {
        return await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: userDetails.email,
                    password: userDetails.password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                if (res.ok) {
                    return await res.json();
                } else {
                    throw new Error('signupError');
                }
            })
    },

    async LogIn(userDetails) {
        return await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: userDetails.email,
                    password: userDetails.password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                if (res.ok) {
                    return await res.json();
                } else {
                    throw new Error('loginError');
                }
            })
    },

    async ChangePassword(user, password) {
        return await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: user.idToken,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                if (res.ok) {
                    return await res.json();
                } else {
                    console.log(await res.json())
                    throw new Error('changePasswordError');
                }
            })
    }

}