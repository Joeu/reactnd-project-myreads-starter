import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component{

  render () {
    return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.filteredBooks.map((book) => (
              <li>
                <Book backgroundImage={book.backgroundImage}
                      title={book.title}
                      authors={book.authors}
                      />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookList;