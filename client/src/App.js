import React, { useState, useEffect } from "react";

// SERVICES
import commentService from './services/commentService';

function App() {
    const [comments, setcomments] = useState(null);

    useEffect(() => {
        if(!comments) {
            getComments();
        }
    });

    const getComments = async () => {
        let res = await commentService.getByRadarType('microsoft');
        setcomments(res);
    };

    const getCommentsDB = () => {
        return comments;
    }

    const renderComments = comment => {
        return (
            <li key={comment._id} className="list__item comment">
                <h3 className="comment__name">{comment.autor}</h3>
                <p className="comment__description">{comment.zeit}</p>
                <p className="comment__description">{comment.text}</p>
                <p className="comment__description">{comment.meinung}</p>
                <p className="comment__description">{comment.technologie}</p>
                <p className="comment__description">{comment.radar}</p>
            </li>
        );
    };

    return (
        <div className="App">
            <ul className="list">
                {(comments && comments.length > 0) ? (
                    comments.map(comment => renderComments(comment))
                ) : (
                    <p>No comments found!</p>
                )}
            </ul>
        </div>
    );
}

export default App;
