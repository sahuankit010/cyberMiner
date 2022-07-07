import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            mostInput: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.setSearchValue(this.state.userInput);
    }
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    onChange = e => {
        const { suggestions } = this.props;


        var mostInput = ''

        var wholeInput = e.currentTarget.value.split(" ");
        wholeInput.map(word => {
            if(wholeInput[wholeInput.length - 1] === word){
                
            } else {
                mostInput = mostInput + word + ' ';
            }
            return true;
        })
        console.log(mostInput)
        var userInput;
        if(e.currentTarget.value[e.currentTarget.value.length - 1] === ' ') {
            userInput = ' ';
        } else {
            userInput = wholeInput[wholeInput.length - 1];
        }


        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.indexOf(userInput) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value,
            mostInput: mostInput
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: this.state.mostInput + e.currentTarget.innerText
        });
        //IM THINKING THAT ON THE USERINPUT THING ABOVE, YOU CAN HAVE SOMETHING LIKE WHOLEINPUT + E.CURRENTtARGET.INNERTEXT
        // SO YOU NEED A WAY TO GET EVERYTHING EXCEPT THE LAST WORD IN A STRING + THE AUTOFILL SUGGESTION. 
        console.log(e.currentTarget.innerText)
        console.log(e.currentTarget.value)
    };

    onBlur = e => {
        // this.setState({
        //     showSuggestions: false
        // });
    }

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                showSuggestions: false,
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onBlur,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No Results</em>
                    </div>
                );
            }
        } else if (!userInput) {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No search terms entered yet</em>
                </div>
            );
        } 

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search Websites:&nbsp;
                        <input type="text"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                            value={userInput} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
