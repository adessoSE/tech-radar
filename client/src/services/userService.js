import axios from 'axios';

export default {
    getUserInfo: async (email, passwort) => {
        let res = await axios.get(`/api/user`, {
            params: {
                email: email,
                passwort: passwort
            }
        });
        return res.data || [];
    },
    submitUser: async (email, passwort) => {
        let res = await axios.post('/api/user', {
            email: email,
            passwort: passwort
        });
        return res.data || [];
    }

}

