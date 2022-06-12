import React from 'react';
import '../App.css';
import Results from './Results'
import AlphabeticalResultsCheckBox from './AlphabeticalResultsCheckBox'
import FilterOutSymbolsCheckBox from './FilterOutSymbolsCheckBox';
import FrequentlyAccessedCheckBox from './FrequentlyAccessedCheckbox';
import ResultsPerPageDropDown from './ResultsPerPageDropDown';
import SearchTypeDropDown from './SearchTypeDropDown';
import websites from '../Websites'
import Autocomplete from './Autocomplete';

class CyberMiner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            isAlphabetical: false,
            isFrequentlyAccessed: false,
            isFiltered: false,
            numberPerPage: 3,
            searchType: 'AND',
            currentWebsites: websites.data,
        };
    }

    searchTypes = ['AND', 'OR', 'NOT']
    pageOptions = [3, 5, 10]
    suggestions = websites.data.map(website => {
        return website.description;
    })

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
                <div><Autocomplete suggestions={this.suggestions} setSearchValue={this.setSearchValue}></Autocomplete></div>
                <div>
                    <AlphabeticalResultsCheckBox setAttribute={this.setIsAlphabetical}></AlphabeticalResultsCheckBox>
                    <span className="Element"><FrequentlyAccessedCheckBox setAttribute={this.setIsFrequentlyAccessed}></FrequentlyAccessedCheckBox></span>
                    <FilterOutSymbolsCheckBox setAttribute={this.setIsFiltered}></FilterOutSymbolsCheckBox>
                </div>
                <div>
                    <span className="Element"><SearchTypeDropDown setAttribute={this.setSearchType} options={this.searchTypes}></SearchTypeDropDown></span>
                    <ResultsPerPageDropDown setAttribute={this.setNumberPerPage} options={this.pageOptions}></ResultsPerPageDropDown>
                </div>
                <div className="Element">
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
            </div>
        );
    }
}

export default CyberMiner;
