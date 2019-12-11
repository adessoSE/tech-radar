import axios from 'axios';

export default {
    getByRadarType: async (radar) => {
        let res = await axios.get(`/api/comment`);
        return res.data || [];
    }
}
