import React, { Component } from 'react';

class SearchBar extends Component{

  render () {
    return (
      <div className="open-search">
        <a onClick={this.props.toggleSearch}>Add a book</a>
      </div>
    )
  }

}

export default SearchBar;