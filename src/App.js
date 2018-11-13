import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import AddBook from './components/AddBook';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      searchText: '',
      books: []
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  componentDidMount() {
    this.setState({books: this.props.books});
  }

  toggleSearch = () => {
    this.setState(prevState => ({showSearchPage: !prevState.showSearchPage}));
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText
    });
  }

  handleShelfChange(shelf, bookTitle){
    let _books = this.state.books.filter(b => b.shelf = shelf)
    this.setState({
      books: _books
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
            <SearchResults />
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
