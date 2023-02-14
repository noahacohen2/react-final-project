const API_KEY = "AIzaSyCctdnDaDWc9auUP2o4w21x_Z5zN-ooGxY";
const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";

const updateUserName = async (user, name) => {
    return await fetch(BASE_URL + "update?key=" + API_KEY,
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: user.idToken,
                displayName: name,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.ok) {
                return await res.json();
            } else {
                throw new Error('changeNameError');
            }
        })
}

export default {
    async SignUp(userDetails) {
        return await fetch(BASE_URL + "signUp?key=" + API_KEY,
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
                    let user = await res.json();
                    let UserName = await updateUserName(user, userDetails.name)
                    return UserName;
                } else {
                    throw new Error('signupError');
                }
            })
    },

    async LogIn(userDetails) {
        return await fetch(BASE_URL + "signInWithPassword?key=" + API_KEY,
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
        return await fetch(BASE_URL + "update?key=" + API_KEY,
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
                    console.log("Error", await res.json())
                    throw new Error('changePasswordError');
                }
            })
    }
}