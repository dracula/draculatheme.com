import { Component } from 'react';

class SizeChart extends Component {
  renderHeader(sizesKeys) {
    return <tr>
      <th>Details</th>
      {sizesKeys.map((sizeKey, index) => {
        return <th key={index}>{sizeKey}</th>
      })}
    </tr>
  }

  renderBody(itemsKeys) {
    return itemsKeys.map((itemKey, index) => {
      let sizes = this.props.items[itemKey];
      return <tr key={index}>
        <td>{itemKey}</td>
        {Object.keys(sizes).map(size => {
          if (sizes[size].length === 1) {
            return <td key={size}>{sizes[size][0]}</td>
          }

          return <td key={size}>{sizes[size].join(' - ')}</td>
        })}
      </tr>
    })
  }

  render() {
    const itemsKeys = Object.keys(this.props.items);
    const sizesKeys = Object.keys(this.props.items[itemsKeys[0]]);

    return <div>
      <table className="table">
        <thead>
          {this.renderHeader(sizesKeys)}
        </thead>
        <tbody>
          {this.renderBody(itemsKeys)}
        </tbody>
      </table>
    </div>
  }
}

export default SizeChart;