import React from 'react';
import websites from '../Websites'
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.search();
    }
  }

  filterSearchValue(searchValue) {
    return searchValue.replace(/[^a-zA-Z ]/g, "")
  }

  search() {
    var filteredWebsites = [];
    var searchValueArray = [];
    var searchValue = this.props.searchValue;

    if (this.props.isFiltered) { searchValue = this.filterSearchValue(this.props.searchValue) }
    searchValueArray = searchValue.trim().split(/ +/);

    switch (this.props.searchType) {
      case 'OR':
        filteredWebsites = websites.data.filter((website) => {
          return searchValueArray.some(word => website.description.includes(word));
        })
        break;
      case 'AND':
        filteredWebsites = websites.data.filter((website) => {
          return searchValueArray.every(word => website.description.includes(word));
        })
        break;
      case 'NOT':
        filteredWebsites = websites.data.filter((website) => {
          return !searchValueArray.some(word => website.description.includes(word));
        })
        break;
      default:
        filteredWebsites = websites.data.filter((website) => {
          return searchValueArray.some(word => website.description.includes(word));
        })
    }

    if (this.props.isAlphabetical) { filteredWebsites.sort(this.compare) }

    this.setState({ results: filteredWebsites });

    console.log("search value is " + searchValue + " and " + this.props.numberPerPage + " results per page and alpha is " + this.props.isAlphabetical + " and filtered is " + this.props.isFiltered + " and search type is " + this.props.searchType);
  }

  compare(a, b) {
    if (a.URL < b.URL) { return -1 }
    if (a.URL > b.URL) { return 1 }
    return 0;
  }

  render() {
    return (
      <div>
        {this.state.results.map((website) => (
          <div style={{ padding: '10px' }} key={website.URL}>
            <span>{website.description}&nbsp;&nbsp;</span>
            <a href={website.URL} >{website.URL}</a>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;