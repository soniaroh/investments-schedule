import React from 'react';
import './style.css';

const trimPrice = num => {
  if(num === 0 || num === null) {
    num = '';
  } 
  return num + '$';
}

const convertDigitIn = (str1, str2) => {
  if(str2 !== 'yyyy-MM-dd') {
    for(let i = 0; i< str1.length;i++){
      let str = str1[i].investment_date.split('/');
      str = [str[2], str[0],str[1]].join('-');
      if(str === str2){
        return true
      }
    }
    return false
  } else { 
    return true;
  }
} 
class InvestmentList extends React.Component {
  constructor(props){
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
      collapsed : updatedCollapsed
    })
  }
  render(){
  const { schedule } = this.props;
  const { date } = this.props;
  const { collapsed } = this.state;
  const titles = ['Investment', 'Asset', 'Investment date', 'Shares', 'Cost'];
  return(
    <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr className="thead-light">{titles.map(title => <td>{title}</td>)}</tr> 
          {schedule.map((item,index) => convertDigitIn(item.issued_assets, date) ? 
          <tr>
            <td>{item.name}{' '}<button type="button" className="btn btn-light" value={index} onClick={this.handleCollapse}>{collapsed[index]?'-':'+'}</button></td>
            <td><tr><br></br></tr>{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{asset.asset_class}</td></tr> : '')}</td> 
            <td><tr><br></br></tr>{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{asset.investment_date}</td></tr>: '')}</td>
            <td>{trimPrice(item.quantity)}{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{trimPrice(asset.quantity)}</td></tr>:'')}</td>
            <td>{trimPrice(item.cost.$)}{item.issued_assets.map(asset => collapsed[index] ? <tr><td>{trimPrice(asset.cost.$)}</td></tr>:'')}</td>
          </tr>
          : '')}
        </tbody>
      </table> 
    </div> 
  )
 }
}
export default InvestmentList;