import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/comment`);
        return res.data || [];
    }
}
