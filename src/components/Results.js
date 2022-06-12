import React from 'react';
import styles from "../App.css";
import Table from "./Table/Table.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  deleteWebsite = (websiteUrl) => {
    this.props.setCurrentWebsites(websiteUrl);
  }

  clickedURL = (websiteUrl) => {
    this.props.increaseAccessCount(websiteUrl);
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
        filteredWebsites = this.props.currentWebsites.filter((website) => {
          return searchValueArray.some(word => website.description.includes(word));
        })
        break;
      case 'AND':
        filteredWebsites = this.props.currentWebsites.filter((website) => {
          return searchValueArray.every(word => website.description.includes(word));
        })
        break;
      case 'NOT':
        filteredWebsites = this.props.currentWebsites.filter((website) => {
          return !searchValueArray.some(word => website.description.includes(word));
        })
        break;
      default:
        filteredWebsites = this.props.currentWebsites.filter((website) => {
          return searchValueArray.some(word => website.description.includes(word));
        })
    }

    if (this.props.isAlphabetical) { filteredWebsites.sort(this.compareURL) }
    if (this.props.isFrequentlyAccessed) { filteredWebsites.sort(this.compareAccess) }

    if (this.props.searchValue === '') {
      this.setState({ results: [] });

    } else {
      this.setState({ results: filteredWebsites });
    }
  }

  compareURL(a, b) {
    if (a.URL < b.URL) { return -1 }
    if (a.URL > b.URL) { return 1 }
    return 0;
  }

  compareAccess(a, b) {
    if (a.timesAccessed < b.timesAccessed) { return 1 }
    if (a.timesAccessed > b.timesAccessed) { return -1 }
    return 0;
  }

  render() {
    return (
      <div>
        <main className={styles.container}>
          <div className={styles.wrapper}>
            <Table data={this.state.results} rowsPerPage={this.props.numberPerPage} deleteWebsite={this.deleteWebsite} clickedURL={this.clickedURL} />
          </div>
        </main>
      </div>
    );
  }
}

export default Results;