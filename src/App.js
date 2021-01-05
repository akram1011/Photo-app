import React, { useState, useEffect } from 'react';
import './App.css';
import Photo from './components/Photo';
import { connect, Provider } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    pics: state.pics
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => dispatch({ type: "SET_PICS", payload: data }),
  }
}

function App(props) {
  const [sortBy, setSortBy] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [previewImg, setPreviewImg] = useState("");


  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
      .then(response => response.json())
      .then(data => {
        props.update(data.pics)
      })
      .catch(err => console.log(err));
  }, []);


  const getPics = () => {
    try {
      let filterPics = [...props.pics];
      let pics = props.pics
      if (searchVal)
        filterPics = pics.filter(pic => pic.category.toLocaleLowerCase().includes(searchVal))
      if (sortBy === "Like")
        filterPics.sort((a, b) => b.likes - a.likes)
      else if (sortBy === "Comment") {
        filterPics.sort((a, b) => b.comments.length - a.comments.length)
      }
      return filterPics
    }
    catch (e) {
      return []
    }
  }

  const sortClick = (type) => {
    if (type === "Like" && sortBy !== type)
      setSortBy(type)
    else if (type === "Comment" && sortBy !== type)
      setSortBy(type)
    else
      setSortBy("")
  }

  const modalClick = (e) => {
    if (e.target.id !== "modal-img")
      setPreviewImg("")
  }

  return (
    <div>
      <h3 className="header">Imaginary</h3>
      <div className="filter-container">
        <a className={sortBy === "Like" ? "active" : ""} onClick={() => { sortClick("Like") }}> Most liked</a>
        <a className={sortBy === "Comment" ? "active" : ""} style={{ borderLeft: "1px solid black" }} onClick={() => { sortClick("Comment") }} > Most Commented</a>
        <input className="search-feild" placeholder="Search images..." type="text" value={searchVal} onChange={(e) => { setSearchVal(e.target.value) }} />
      </div>
      <div className="image-container">
        {getPics().map((pic, ind) => <Photo setPreviewImg={(url) => { setPreviewImg(url) }} key={ind} data={pic} />)}
      </div>
      {previewImg &&
        <div onClick={(e) => { modalClick(e) }} className="modal">
          <img id="modal-img" src={previewImg} alt="photo" />
        </div>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
