import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        updatePic: (data) => dispatch({ type: "UPDATE_PIC", payload: data }),
    }
}

function Photo(props) {
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(false);

    const LikeClick = () => {
        let updatedData = { ...props.data }
        if (liked)
            updatedData.likes--;
        else
            updatedData.likes++;
        props.updatePic(updatedData)
        setLiked(!liked)
    }

    const postCommentClick = () => {
        if(comment.trim()==="") {
            setComment("");
            return null;
        }
        let updatedData = { ...props.data }
        let currComments = [...props.data.comments];
        currComments.push(comment);
        setComment("");
        updatedData.comments = currComments;
        props.updatePic(updatedData);
    }

    const deleteComment = (id) => {
        let updatedData = { ...props.data }
        let currComments = [...props.data.comments];
        currComments.splice(id,1);
        updatedData.comments = currComments;
        props.updatePic(updatedData);
    }

    return (
        <div className="photo-wrap">
            <img src={props.data.url} alt="photo" onClick={()=>props.setPreviewImg(props.data.url)} />
            <br />
            <div className="photo-header">
                <span style={{ paddingLeft: "20px" }} >{props.data.likes}</span>
                <a style={{ padding: "0px 0px 0px 10px" }} className={liked ? "active" : ""} onClick={() => { LikeClick() }}>{liked ? "unlike" : "like"}</a>
                <p className="category-desc">{props.data.category}</p>
            </div>
            <div className="d-flex">
                <input className="comment-feild" placeholder="Type your comment here..." type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                <button className="post-btn" onClick={() => { postCommentClick() }}>POST</button>
            </div>
            {props.data.comments && props.data.comments.map((comm, key) => <p key={key} className="comment">{comm} <span onClick={() => { deleteComment(key) }} className="comment-delete">delete</span></p>)}
        </div>
    );
}

export default connect(null, mapDispatchToProps)(Photo)