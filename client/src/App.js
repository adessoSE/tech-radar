// TODO diese datei kann vermutlich ersetzt/ gelöscht werden --> ermöglicht zunächst aber erstmal die überprüfung, ob der datenbankzugriff steht

import React, { useState, useEffect } from "react";

// SERVICES
import commentService from './services/commentService';

function App() {
    const [comments, setcomments] = useState(null);

    useEffect(() => {
        if(!comments) {
            getComments();
        }
    })

    const getComments = async () => {
        let res = await commentService.getAll();
        console.log(res);
        setcomments(res);
    }

    const renderComment = comment => {
        return (
            <li key={comment._id} className="list__item product">
                <h3 className="product__name">{comment.autor}</h3>
                <p className="product__description">{comment.text}</p>
            </li>
        );
    };

    return (
        <div className="App">
            <ul className="list">
                {(comments && comments.length > 0) ? (
                    comments.map(comment => renderComment(comment))
                ) : (
                    <p>No products found</p>
                )}
            </ul>
        </div>
    );
}

export default App;