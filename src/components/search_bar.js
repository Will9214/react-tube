import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({term});
  }

  onSubmitSearch(term) {
    this.props.onSearchClick(term);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
        <button 
          className='btn btn-primary'
          onClick={() => this.onSubmitSearch(document.getElementsByTagName('input')[0].value)}
        >Search</button>
      </div>
    );
  };
};

export default SearchBar;