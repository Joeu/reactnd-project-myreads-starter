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
    this.setState({shelf: e.target.value});
    this.props.onShelfSelect(e.target.value, this.state.book);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleOnSelectChange}>
              <option value="move" defaultValue>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
        <div className="book-authors">{this.props.book.averageRating}</div>
      </div>
    );
  }

}

export default Book;