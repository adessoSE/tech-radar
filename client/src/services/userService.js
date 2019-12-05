import axios from 'axios';

export default {
    getUserInfo: async (email, passwort) => {
        let res = await axios.get(`/api/user`, {
            params: {
                email: email,
                passwort: passwort
            }
        });
        console.log(email);
        console.log(passwort);
        return res.data || [];
    }
}