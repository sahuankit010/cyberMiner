import React from 'react';
import DropDown from './DropDown';

class SearchTypeDropDown extends DropDown {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            options: this.props.options
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.setAttribute(event.target.value);
    }

    render() {
        return (
            <label> Search Type:&nbsp;
                <select onChange={this.handleChange}>
                    {this.state.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
        );
    }
}

export default SearchTypeDropDown;