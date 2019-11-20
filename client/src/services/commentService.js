import axios from 'axios';

export default {
    getByRadarType: async (radar) => {
        let res = await axios.get(`/api/comment`, {
            params: {
                radar: radar
            }
        });
        return res.data || [];
    }
}
