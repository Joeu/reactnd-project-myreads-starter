import React from 'react'
import './App.css'
import BookShelf from './components/BookShelf';
import SearchComponent from './components/SearchComponent';
import AddBook from './components/AddBook';
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchPage: false,
      books: [],
    }
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.addToShelf = this.addToShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }));
      })
  }

  handleShelfChange(shelf, book){
    BooksAPI.update(book, shelf)
      .then(() => {
        this.changeShelf(shelf, book.id);
      })
  }

  addToShelf(shelf, book){
    if (this.state.books.filter(_book => _book.id === book.id).length === 0) {
      BooksAPI.update(book, shelf)
        .then(() => {
          this.setState({
            books: [...this.state.books, book]
          });
        })
    }
  }

  changeShelf(shelf, bookId){
    const books = this.state.books.map(book => {
      if (book.id === bookId){
        book.shelf = shelf;
      }
      return book;
    });
    
    this.setState({
      books
    });
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  shelfTitle = {'Currently Reading'}
                  filteredBooks = {this.state.books.filter(book => book.shelf === 'currentlyReading')}
                  onShelfChange = {this.handleShelfChange}
                />
                <BookShelf 
                  shelfTitle = {'Want to Read'}
                  filteredBooks = {this.state.books.filter(book => book.shelf === 'wantToRead')}
                  onShelfChange = {this.handleShelfChange}
                />
                <BookShelf 
                  shelfTitle = {'Read'}
                  filteredBooks = {this.state.books.filter(book => book.shelf === 'read')}
                  onShelfChange = {this.handleShelfChange}
                />
              </div>
            </div>
            <Link to='/search'>
              <AddBook/>
            </Link>
          </div>
        } />

        <Route exact path='/search' render={() =>
          <div className="search-books">
            <SearchComponent 
              booksOnShelf={this.state.books}
              onShelfChange = {this.addToShelf}
            />
          </div>
        } />

      </div>
    )
  }
}

export default BooksApp
