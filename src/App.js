
import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import Results from './components/Results'
import CheckBox from './components/CheckBox';
import DropDown from './components/DropDown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      isAlphabetical: false,
      isFiltered: false,
      numberPerPage: 1,
      searchType: 'OR'
    };
  }

  searchTypes = ['OR', 'AND', 'NOT']
  pageOptions = [1, 2, 3]

  setSearchValue = (value) => {
    this.setState({
      searchValue: value
    });
  }

  setIsAlphabetical = (value) => {
    this.setState({
      isAlphabetical: value
    });
  }

  setIsFiltered = (value) => {
    this.setState({
      isFiltered: value
    });
  }

  setNumberPerPage = (value) => {
    this.setState({
      numberPerPage: value
    });
  }

  setSearchType = (value) => {
    this.setState({
      searchType: value
    });
  }

  render() {
    return (
      <div className="App">
        <h1 style={{ color: '#154734' }}>Cyber Miner</h1>
        <SearchBox setSearchValue={this.setSearchValue}></SearchBox>
        <div>
          <label>Alphabetical Results:<CheckBox setAttribute={this.setIsAlphabetical}></CheckBox></label>
          <label>&nbsp;Filter out symbols:<CheckBox setAttribute={this.setIsFiltered}></CheckBox></label>
        </div>
        <div>
          <label> Search Type:&nbsp;<DropDown setAttribute={this.setSearchType} options={this.searchTypes}></DropDown></label>
          <label> &nbsp;Results Per Page:&nbsp;<DropDown setAttribute={this.setNumberPerPage} options={this.pageOptions}></DropDown></label>
        </div>
        <Results
          searchValue={this.state.searchValue}
          isAlphabetical={this.state.isAlphabetical}
          isFiltered={this.state.isFiltered}
          numberPerPage={this.state.numberPerPage}
          searchType={this.state.searchType}>
        </Results>
      </div>
    );
  }
}

export default App;
