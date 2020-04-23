import React, { Component } from 'react';
import $ from 'jquery';
import InvestmentList from './InvestmentList.jsx';
import * as style from './style.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      date: 'yyyy-MM-dd'
    };
    this.getData = this.getData.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    $.ajax({
      url: 'https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({
          schedule: data
        });
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  handleDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  render() {
    const { schedule, date } = this.state;
    return (
      <div className="container">
        <h3>Sample Ventures Fund</h3>
        <div className={style.margin}>
          <input type="date" placeholder="MM/DD/YYYY" onChange={this.handleDate} value={date} />
        </div>
        <InvestmentList schedule={schedule} date={date} />
      </div>
    );
  }
}

export default App;
