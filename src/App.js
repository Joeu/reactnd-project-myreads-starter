import React from 'react'
import './App.css'
import BookShelf from './components/BookShelf';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddBook from './components/AddBook';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchPage: false,
      searchText: '',
      books: [],
      bookSearchResult: []
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
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
    this.setState(prevState => ({showSearchPage: !prevState.showSearchPage}));
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText
    });

    BooksAPI.search(searchText)
      .then((searchResult) => {
        this.setState(() => ({
          bookSearchResult: searchResult
        }));
      })
  }

  handleShelfChange(shelf, bookTitle){
    let _booksRet = [];
    this.state.books.forEach(book => {
      if (book.title === bookTitle){
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
            <SearchBar 
              toggleSearch={this.toggleSearch}
              onSearchTextChange={this.handleSearchTextChange}
            />
            <SearchResults 
              bookSearchResult={this.state.bookSearchResult}
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
