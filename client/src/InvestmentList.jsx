import React from 'react';
import './style.css';
import { trimPrice, convertDigit } from '../utils';

class InvestmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: Array(9).fill(true)
    }
    this.handleCollapse = this.handleCollapse.bind(this)
  }
  handleCollapse(e) {
    let updatedCollapsed = this.state.collapsed;
    updatedCollapsed[e.target.value] = !updatedCollapsed[e.target.value];
    this.setState({
      collapsed: updatedCollapsed
    })
  }
  render() {
    const { schedule, date } = this.props;
    const { collapsed } = this.state;
    const titles = ['Investment', 'Asset', 'Investment date', 'Shares', 'Cost'];
    return (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr className="thead-light">{titles.map((title, index) => <td key={index}>{title}</td>)}</tr>
            {schedule.map((item, index) => convertDigit(item.issued_assets, date) ?
              <tr key={index}>
                <td>{item.name}{' '}<button type="button" className="btn btn-light" value={index} onClick={this.handleCollapse}>{collapsed[index] ? '-' : '+'}</button></td>
                <td><tr><br /></tr>{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{asset.asset_class}</td></tr> : '')}</td>
                <td><tr><br /></tr>{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{asset.investment_date}</td></tr> : '')}</td>
                <td>{trimPrice(item.quantity)}{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{trimPrice(asset.quantity)}</td></tr> : '')}</td>
                <td>{trimPrice(item.cost.$)}{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{trimPrice(asset.cost.$)}</td></tr> : '')}</td>
              </tr>
              : '')}
          </tbody>
        </table>
      </div>
    )
  }
}
export default InvestmentList;