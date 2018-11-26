import React, { Component } from 'react';
import Book from './Book';

class SearchComponent extends Component{

  constructor(props){
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  render () {
    return (
      <div>
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
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.bookSearchResult.forEach(book =>
              <li key={book.id}>
                <Book backgroundImage={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors}
                  shelf={book.shelf}
                  onShelfSelect={this.handleShelfChange}
                  averageRating={book.averageRating ? book.averageRating : "-"}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchComponent;