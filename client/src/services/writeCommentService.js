import axios from 'axios';

const commentObject = {
    autor: String,
    text: String,
    meinung: String,
    zeit: String,
    technologie: String,
    radar: String,
};

export default {
    addComment: async (object:commentObject) => {
        let res = await axios.post('/api/comment', {
            'autor': object.autor,
            'text': object.text,
            'meinung': object.meinung,
            'zeit': object.zeit,
            'technologie': object.technologie,
            'radar': object.radar,
        });
        return res.data || [];
    }
}
