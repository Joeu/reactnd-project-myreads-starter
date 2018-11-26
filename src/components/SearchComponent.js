import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'

class SearchComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      bookSearchResult: []
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    BooksAPI.search(e.target.value)
      .then((searchResult) => {
        this.setState(() => ({
          bookSearchResult: searchResult
        }));
      })
  }

  handleShelfChange = (newShelf, bookTitle) => {
    if (this.props.onShelfChange)
      this.props.onShelfChange(newShelf, bookTitle)
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
              onChange={this.handleSearchTextChange}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookSearchResult.map((book) => (
              <li key={book.id}>
                <Book 
                  book={book}
                  onShelfSelect={this.handleShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchComponent;