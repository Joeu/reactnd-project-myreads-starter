import React, { Component } from 'react';

class Book extends Component{

  constructor(props){
    super(props);
    this.state = {
      book: props.book
    }
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
  }

  handleOnSelectChange(e) {
    let _bookCopy = this.state.book;
    _bookCopy.shelf = e.target.value;
    this.setState({book: _bookCopy});
    this.props.onShelfSelect(e.target.value, this.state.book);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.book.imageLinks ? `url(${this.props.book.imageLinks.thumbnail})` : '' }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf ? this.props.book.shelf : "none"} onChange={this.handleOnSelectChange}>
              <option value="move" disabled defaultValue>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
        <div className="book-authors">{this.props.book.averageRating ? this.props.book.averageRating : "-"}</div>
      </div>
    );
  }

}

export default Book;