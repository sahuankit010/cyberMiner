import React from 'react';

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
    }

    toggleCheck = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.props.setAttribute(!this.state.isChecked);
    }

    render() {
        return (
                <input
                    type="checkbox"
                    defaultChecked={this.state.isChecked}
                    onChange={this.toggleCheck}
                />           
        );
    }
}

export default CheckBox;