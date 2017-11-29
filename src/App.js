import React, { Component } from 'react';
import { plus, ip2v4, genSubnetClass, conv2subnet, networkAdd, usableip, broadcast, totalhost,
  usablehost, wildcard, subnetClass, ipType, v42ip, hexIP ,allposibleIp } from './utils/helper';
import { config } from 'chai/lib/chai';


class App extends Component {

  state = {
    ip: '158.108.1.1',
    classIp: 'any',
    subnet: genSubnetClass('ANY'),
    mask: 32,
    changed: true,
  }
  render() {
    console.log(this.state.subnet)
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="page-header">
              <h1>IP Subnet Calculator</h1>
            </div>
          </div>
          <button className="btn-large">Large</button>
          <div className="form-group">
            <label htmlFor="paperSelects1">Select</label>
            <select id="paperSelects1">
              {
                this.state.subnet.map((subnet,i) => <option key={i} value={i}>{subnet}</option>)
              }
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
