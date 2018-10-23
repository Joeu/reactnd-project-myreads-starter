import React, { Component } from 'react';

class Book extends Component{

  constructor(props){
    super(props);
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
  }

  handleOnSelectChange(e) {
    console.log(e.target.value);
    // this.props.onSelectChange(e.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.backgroundImage }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleOnSelectChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }

}

export default Book;