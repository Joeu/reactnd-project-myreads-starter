import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class SearchComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      bookSearchResult: []
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    let _self = this;
    if (e.target.value !== ''){
      BooksAPI.search(e.target.value)
        .then((searchResult) => {
          if (searchResult.error) {
            this.setState(() => ({
              bookSearchResult: searchResult.items
            }));
          } else {
            let _retArray = new Set();
            _self.props.booksOnShelf.filter(bookShelf => {
              searchResult.forEach(book => {
                if (book.id === bookShelf.id){
                  book.shelf = bookShelf.shelf;
                }
                _retArray.add(book);
              });
            });

            this.setState(() => ({
              bookSearchResult: [..._retArray]
            }));
          }
        })
    } else {
      this.setState(() => ({
        bookSearchResult: []
      }));
    }
  }

  handleShelfChange = (newShelf, bookId) => {
    if (this.props.onShelfChange)
      this.props.onShelfChange(newShelf, bookId)
  }

  render () {
    return (
      <div>
        <div className="search-books-bar">
          <Link to='/'>
            <a className="close-search">Close</a>
          </Link>
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