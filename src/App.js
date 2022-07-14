import React from 'react';
import './App.css';
import websites from './Websites'
import CyberMiner from './components/CyberMiner';
import './components/styles.css'

class App extends React.Component {
  constructor(props) {
    super(props);

   const validWebsite = new RegExp(
    '(http|ftp|https)://[w-]+(.[w-]+)+([w.,@?^=%&amp;:/~+#-]*[w@?^=%&amp;/~+#-])?'
 );
    var filteredWebsites = websites.data.filter(website => {
      if(website.URL.match(validWebsite)){
        return true
      } else {
        return false;
      }
    })

    this.state = {
      currentWebsites: filteredWebsites
    };
  }

  setCurrentWebsites = (websiteUrl) => {
    var newWebsiteArray = this.state.currentWebsites.filter((website) => {
      return !website.URL.includes(websiteUrl);
    });
    this.setState({
      currentWebsites: newWebsiteArray
    })
  }

  increaseAccessCount = (websiteUrl) => {
    var foundIndex = this.state.currentWebsites.findIndex(website => website.URL === websiteUrl)
    var newWebsiteArray = this.state.currentWebsites;
    newWebsiteArray[foundIndex].timesAccessed++;
    this.setState({
      currentWebsites: newWebsiteArray
    })
  }

  render() {
    return (
      <div>
        <CyberMiner currentWebsites={this.state.currentWebsites} increaseAccessCount={this.increaseAccessCount} setCurrentWebsites={this.setCurrentWebsites}></CyberMiner>
        <CyberMiner currentWebsites={this.state.currentWebsites} increaseAccessCount={this.increaseAccessCount} setCurrentWebsites={this.setCurrentWebsites}></CyberMiner>
      </div>
    );
  }
}

export default App;
