import React, { Component } from 'react';

class SearchBar extends Component{

  constructor(props){
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  render () {
    return (
      <div className="search-books-bar">
        <a className="close-search" onClick={this.props.toggleSearch}>Close</a>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={this.props.searchText}
            onChange={this.handleSearchTextChange}
          />

        </div>
      </div>
    )
  }

}

export default SearchBar;