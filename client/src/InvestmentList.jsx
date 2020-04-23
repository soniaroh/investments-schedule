import React from 'react';
import * as style from './style.css';
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
            <tr className={style.header}>{titles.map((title, index) => <td key={index}>{title}</td>)}</tr>
            {schedule.map((item, index) => convertDigit(item.issued_assets, date) ?
              <tr key={index} className={style.rows}>
                <td>{item.name}<button type="button" className={style.collapsible} value={index} onClick={this.handleCollapse}>{collapsed[index] ? ' -' : ' +'}</button></td>
                <td>{item.issued_assets.map(asset => collapsed[index] ? <div>{asset.asset_class}</div> : '')}</td>
                <td>{item.issued_assets.map(asset => collapsed[index] ? <div>{asset.investment_date}</div> : '')}</td>
                <td>{trimPrice(item.quantity)}{item.issued_assets.map(asset => collapsed[index] ? <div>{trimPrice(asset.quantity)}</div> : '')}</td>
                <td>{trimPrice(item.cost.$)}{item.issued_assets.map(asset => collapsed[index] ? <div>{trimPrice(asset.cost.$)}</div> : '')}</td>
              </tr>
              : '')}
          </tbody>
        </table>
      </div>
    )
  }
}
export default InvestmentList;