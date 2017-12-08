import React, { Component } from 'react';
import { plus, ip2v4, genSubnetClass, conv2subnet, networkAdd, usableip, broadcast, totalhost,
  usablehost, wildcard, subnetClass, ipType, v42ip, hexIp, binaryIp ,allposibleIp, checkIpv4, map } from './utils/helper';
import { config } from 'chai/lib/chai';


class App extends Component {
  state = {
    ip: '158.108.1.1',
    classIp: 'Any',
    subnet: genSubnetClass('Any'),
    mask: 32,
    changed: true,
  }

  onInputChange = (e) => {
    this.setState({
      ip: e.target.value,
      changed: true,
    });
  }

  onSelectChange = (e) => {
    this.setState({
      mask: e.target.value,
      changed: true,
    });
  }


  setClass = (e) => {
    this.setState({
      classIp: e.target.value,
      subnet: genSubnetClass(e.target.value),
      changed: true,
    });
  }

  calculate = () => {
    const { ip, mask } = this.state;
    if(checkIpv4(ip)) {
      this.setState({
        changed: false,
        find: true,
        netAddress: ip2v4(networkAdd(ip, mask)),
        usableHost: usablehost(mask),
        usableip: usableip(ip,mask),
        broadcast: ip2v4(broadcast(ip, mask)),
        totalHost: totalhost(mask),
        usableHost: usablehost(mask),
        subnetMask: ip2v4(conv2subnet(mask)),
        wildCard: ip2v4(wildcard(mask)),
        binarySubnetMask: binaryIp(ip2v4(conv2subnet(mask))),
        binaryID : binaryIp(ip),
        isPrivate: ipType(ip),
        allPossible: allposibleIp(ip, mask),
        ipClass: subnetClass(mask).ipclass,
      })
    }
  }

  render() {
    console.log(this.state.allPossible)
    const { classIp, ip, subnet } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="page-header">
              <h1>IP Subnet Calculator</h1>
            </div>
          </div>
          <div className="input-field">
              <div className="form-group">
                <label>IP Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  value={ip}
                />
              </div>
              <div className="form-group">
                <label for="paperRadios1" class="paper-radio">
                <input checked={classIp === 'Any'} type="radio" name="paperRadios" id="paperRadios1" value="Any" onChange={this.setClass}/> <span>Any</span>
                </label>
                <label for="paperRadios2" class="paper-radio">
                <input checked={classIp === 'A'} type="radio" name="paperRadios" id="paperRadios2" value="A" onChange={this.setClass}/> <span>A</span>
                </label>
                <label for="paperRadios3" class="paper-radio">
                <input checked={classIp === 'B'} type="radio" name="paperRadios" id="paperRadios3" value="B" onChange={this.setClass}/> <span>B</span>
                </label>
                <label for="paperRadios4" class="paper-radio">
                <input checked={classIp === 'C'} type="radio" name="paperRadios" id="paperRadios4" value="C" onChange={this.setClass}/> <span>C</span>
                </label>
              </div>
          </div>
          <div className="form-group">
            <label htmlFor="paperSelects1">Select</label>
            <select id="paperSelects1" onChange={this.onSelectChange} >
              {
                this.state.subnet.map((subnet,i) => <option key={i} value={32-i}>{subnet}</option>)
              }
            </select>
            <button className="btn-large" 
            onClick={this.calculate}>
              Calculate

            </button>
          </div>
          {
              this.state.find &&
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>IP Address</td>
                    <td>{ip}</td>
                  </tr>
                  <tr>
                    <td>Network Address</td>
                    <td>{this.state.netAddress}</td>
                  </tr>
                  <tr>
                    <td>Usable Host IP Range</td>
                    <td>
                      {this.state.usableip}
                    </td>
                  </tr>
                  <tr>
                    <td>Broadcast Address</td>
                    <td>{this.state.broadcast}</td>
                  </tr>
                  <tr>
                    <td>Total Number of Hosts</td>
                    <td>{this.state.totalHost}</td>
                  </tr>
                  <tr>
                    <td>Number of Usable Hosts</td>
                    <td>{this.state.usableHost}</td>
                  </tr>
                  <tr>
                    <td>Subnet Mask</td>
                    <td>{this.state.subnetMask}</td>
                  </tr>
                  <tr>
                    <td>Wildcard Mask</td>
                    <td>{this.state.wildCard}</td>
                  </tr>
                  <tr>
                    <td>Binary Subnet Mask</td>
                    <td>{this.state.binarySubnetMask}</td>
                  </tr>
                  <tr>
                    <td>IP Class</td>
                    <td>
                      {this.state.ipClass}
                    </td>
                  </tr>
                  <tr>
                    <td>CIDR Notation</td>
                    <td>{this.state.mask}</td>
                  </tr>
                  <tr>
                    <td>IP Type</td>
                    <td>{this.state.isPrivate}</td>
                  </tr>
                  <tr>
                    <td>Short</td>
                    <td>{this.state.ip}/{this.state.mask}</td>
                  </tr>
                  <tr>
                    <td>Binary ID</td>
                    <td>{this.state.binaryID}</td>
                  </tr>
                  <tr>
                    <td>Integer ID</td>
                    <td>{(this.state.ip)}</td>
                  </tr>
                  <tr>
                    <td>Hex ID</td>
                    <td>{hexIp(this.state.ip)}</td>
                  </tr>
                </tbody>
              </table>
            }
            {
              this.state.find &&
              <div>
                <div className="page-header">
                  <h2> All Possible IP </h2>
                </div>
                  <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Network Address</th>
                          <th>Usable Host Range</th>
                          <th>Broadcast Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.allPossible.map((allposibleIp) => (
                            <tr key={allposibleIp.start}>
                              <td>{allposibleIp.start}</td>
                              <td>{allposibleIp.useable}</td>
                              <td>{allposibleIp.end}</td>
                            </tr>
                          ))
                        }
                  </tbody>
                </table>
              </div>
            }
        </div>
      </div>
    );
  }
}

export default App;
