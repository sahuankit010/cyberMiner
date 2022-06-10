import React from 'react';
import '../App.css';
import SearchBox from './SearchBox';
import Results from './Results'
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import websites from '../Websites'

class CyberMiner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            isAlphabetical: false,
            isFrequentlyAccessed: false,
            isFiltered: false,
            numberPerPage: 2,
            searchType: 'OR',
            currentWebsites: websites.data,
        };
    }

    searchTypes = ['OR', 'AND', 'NOT']
    pageOptions = [2, 5, 10]

    setSearchValue = (value) => {
        this.setState({
            searchValue: value
        });
    }

    setCurrentWebsites = (websiteUrl) => {
        this.props.setCurrentWebsites(websiteUrl)
    }

    increaseAccessCount = (websiteUrl) => {
        this.props.increaseAccessCount(websiteUrl)
    }

    setIsAlphabetical = (value) => {
        this.setState({
            isAlphabetical: value
        });
    }

    setIsFrequentlyAccessed = (value) => {
        this.setState({
            isFrequentlyAccessed: value
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
                    <label>Frequently Accessed:<CheckBox setAttribute={this.setIsFrequentlyAccessed}></CheckBox></label>
                    <label>&nbsp;Filter out symbols:<CheckBox setAttribute={this.setIsFiltered}></CheckBox></label>
                </div>
                <div>
                    <label> Search Type:&nbsp;<DropDown setAttribute={this.setSearchType} options={this.searchTypes}></DropDown></label>
                    <label> &nbsp;Results Per Page:&nbsp;<DropDown setAttribute={this.setNumberPerPage} options={this.pageOptions}></DropDown></label>
                </div>
                <Results
                    searchValue={this.state.searchValue}
                    isAlphabetical={this.state.isAlphabetical}
                    isFrequentlyAccessed={this.state.isFrequentlyAccessed}
                    isFiltered={this.state.isFiltered}
                    numberPerPage={this.state.numberPerPage}
                    searchType={this.state.searchType}
                    currentWebsites={this.props.currentWebsites}
                    increaseAccessCount={this.increaseAccessCount}
                    setCurrentWebsites={this.setCurrentWebsites}>
                </Results>
            </div>
        );
    }
}

export default CyberMiner;
