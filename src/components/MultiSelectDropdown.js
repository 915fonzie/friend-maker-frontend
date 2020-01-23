import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MultiSelectStylesheet.css";

export class MultiSelectDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      dropDownValue: []
    };
    this.checkBox = this.checkBox.bind(this);
  }
  componentDidMount() {
    this.setState({
      dropDownValue: this.props.options
    });
  }

  static getDerivedStateFromProps = ({ checked }) => {
    if (checked) {
      return {
        checked: checked
      }
    }
    return null;
  };
  
  removeChip(value) {
    this.checkBox(value, false);
  }

  checkBox(value, condition) {
    let checkedValue = this.state.checked;
    if (condition) {
      checkedValue.push(value);
      this.refs.inputSearch.value = "";
    } else {
      let index = checkedValue.indexOf(value);
      checkedValue.splice(index, 1);
    }
    this.setState(
      {
        checked: checkedValue
      },
      () => {
        this.props.onSelectOptions(this.state.checked);
      }
    );
  }
  searchFun(e) {
    if (e.target.value.length !== 0) {
      let enteredValue = "";
      if (typeof e.target.value !== "string") {
        enteredValue = "";
      }
      enteredValue =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      let presentValue = this.props.options.filter(function(data) {
        return data.label.indexOf(enteredValue) > -1;
      });
      this.setState({ dropDownValue: presentValue });
    } else {
      this.setState({ dropDownValue: this.props.options });
    }
  }
  returnChip() {
    const chip = this.state.checked
      ? this.state.checked.map((data, index) => (
          <div className="chip-body" key={index}>
            <p className="chip-text">{data}</p>
          <button
              type="button"
              className="chip-close"
              onClick={e => this.removeChip(data)}
            >
              &times;
            </button>
          </div>
        ))
      : [];
    return chip;
  }
  returnList() {
    const list = this.state.dropDownValue
      ? this.state.dropDownValue.map((data, index) => (
          <label className="container" key={index}>
            {data.label}
            <input
              type="checkbox"
              value={data.value}
              onChange={e =>
                this.checkBox(e.target.value, e.target.checked)
              }
              checked={
                this.state.checked.includes(data.value) ? true : false
              }
            />
            <span className="checkmark"></span>
          </label>
        ))
      : null;
    return list;
  }
  render() {
    return (
      <div className="multiSelect">
        <div className="chip">{this.returnChip()}</div>
        <input
          autoComplete="off"
          type="text"
          name="Search"
          placeholder="Search Interests"
          className="input-box"
          ref="inputSearch"
          onChange={e => this.searchFun(e)}
        />
        <div className="search-result">
          <div className="list-result">{this.returnList()}</div>
        </div>
      </div>
    );
  }
}

MultiSelectDropDown.defaultProps = {
  options: []
};

/** define proptypes including fields which is required */
MultiSelectDropDown.prototypes = {
  options: PropTypes.array.isRequired,
  onSelectOptions: PropTypes.func
};

export default MultiSelectDropDown;
