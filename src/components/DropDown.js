import React from 'react';

class DropDown extends React.Component {
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
            <select onChange={this.handleChange}>
                {this.state.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        );
    }
}

export default DropDown;