import React, { Component } from 'react';

class SearchBar extends Component{

  render () {
    return (
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    )
  }

}

export default SearchBar;