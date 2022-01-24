import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

const options = [
    { value: 'Product', label: 'Product Id' },
    { value: 'subcategory', label: 'Subcategory' },
    { value: 'title', label: 'Title' },
    { value: 'price', label: 'Price' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'Description', label: 'Description' },
    { value: 'Rating', label: 'UTM SOURCE' },
    { value: 'UTM', label: 'UTM Medium' }
];

class Listbox extends React.Component {
    state = {
        selected: [],
    };

    onChange = (selected) => {

        this.setState({ selected });


        var a = [];
        selected.forEach(select => {
            a.push(select.value)
        });

        // Pushing the selected options in the local storage
        localStorage.removeItem("selected");
        localStorage.setItem("selected", a);
    };

    render() {
        const { selected } = this.state;

        return (
            <DualListBox
                options={options}
                selected={selected}

                simpleValue={false}
                onChange={this.onChange}
            />
        );
    }
}

export default Listbox;
