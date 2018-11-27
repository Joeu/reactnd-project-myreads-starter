import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component{

  handleShelfChange = (newShelf, bookId) => {
    if (this.props.onShelfChange)
      this.props.onShelfChange(newShelf, bookId)
  }

  render () {
    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.filteredBooks.map((book) => (
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

export default BookShelf;