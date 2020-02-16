import React, { Component } from "react";

class Pagination extends Component {
  state = {};
  render() {
    const { size, length } = this.props;

    let pages = Math.ceil(length / size);
    let element = [];
    for (let i = 0; i < pages; i++) {
      element[i] = i + 1;
    }
    if (element.length === 1) return null;
    return (
      <div className="pagination">
        <ul>
          {element.map(num => (
            <li key={num}>
              <button onClick={() => this.props.handlePag(num)}>{num}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Pagination;
