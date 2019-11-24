import React from 'react'
import { searchGroups } from '../../store/actions/groups'

const Searchbar = () => {
  return (
    <div className="container">
      <i className="large material-icons prefix search-icon">group</i>
      <div className="row">
        <div className="col s12 m12">
          <div className="row">
            <div className="input-field col s12 vert-align">
              <i className="material-icons prefix search-icon">search</i>
              <input type= "text" id ="groupSearch" name="searchGroup"/>
              <label htmlFor="groupSearch">Search For A Group</label>
              <a className="waves-effect waves-teal btn-flat search-btn" onClick={()=> searchGroups()}>Search</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
