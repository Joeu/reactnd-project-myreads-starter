import React, { Component } from 'react';
import Book from './Book';

class SearchBar extends Component{

  render () {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.bookSearchResult.forEach(book => 
            (console.log(book))
          )}
        </ol>
      </div>
    )
  }

}

export default SearchBar;