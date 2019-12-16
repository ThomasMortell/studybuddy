import React from 'react'
import CreateGroup from './CreateGroup'
import SearchGroup from './SearchGroup'
import { connect } from 'react-redux'

const Groups = () => {
  // console.log(props)
  return (
    <div id="homePage" className="container">
      <div className="row">
        <button className="groups-btn" onClick={showSearchGroupPage}>Search Group</button>
        <button className="groups-btn" onClick={showCreateGroupPage}>Create Group</button>
      </div>
      <div className="row">
        <CreateGroup />
        <SearchGroup />
      </div>
    </div>
  );
}

const showSearchGroupPage = () => {
  document.getElementById("searchGroupPage").style.display = "block";
  document.getElementById("createGroupPage").style.display = "none"
}

const showCreateGroupPage = () => {
  document.getElementById("searchGroupPage").style.display = "none";
  document.getElementById("createGroupPage").style.display = "block"
}

export default Groups
