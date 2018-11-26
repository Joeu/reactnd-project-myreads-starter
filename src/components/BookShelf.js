import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component{

  handleShelfChange = (newShelf, bookTitle) => {
    if (this.props.onShelfChange)
      this.props.onShelfChange(newShelf, bookTitle)
  }

  render () {
    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.filteredBooks.map((book) => (
              <li key={book.id}>
                <Book backgroundImage={book.imageLinks.thumbnail}
                      title={book.title}
                      authors={book.authors}
                      shelf={book.shelf}
                      onShelfSelect={this.handleShelfChange}
                      averageRating={ book.averageRating ? book.averageRating : "-" }
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