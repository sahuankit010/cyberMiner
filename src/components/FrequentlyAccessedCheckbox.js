import React from 'react';
import CheckBox from './CheckBox';

class FrequentlyAccessedCheckBox extends CheckBox {
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
            <label>Frequently Accessed:
                <input
                    type="checkbox"
                    defaultChecked={this.state.isChecked}
                    onChange={this.toggleCheck}
                />
            </label>
        );
    }
}

export default FrequentlyAccessedCheckBox;