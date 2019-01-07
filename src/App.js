import React from 'react'
import './App.css'
import BookShelf from './components/BookShelf';
import SearchComponent from './components/SearchComponent';
import AddBook from './components/AddBook';
import * as BooksAPI from './BooksAPI'

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

  toggleSearch = () => {
    this.setState({showSearchPage: !this.state.showSearchPage});
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
    let _booksRet = [];
    this.state.books.forEach(book => {
      if (book.id === bookId){
        book.shelf = shelf;
        _booksRet.push(book);
      } else {
        _booksRet.push(book);
      }
    });
    this.setState({
      books: _booksRet
    });
  }

  render() {
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchComponent 
              toggleSearch={this.toggleSearch}
              booksOnShelf={this.state.books}
              onShelfChange = {this.addToShelf}
            />
          </div>
        ) : (
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
            <AddBook toggleSearch={this.toggleSearch}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
