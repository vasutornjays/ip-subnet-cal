import { expect } from 'chai';
import { plus, ip2v4, genSubnetClass, conv2subnet, networkAdd, usableip, broadcast, totalhost,
         usablehost, wildcard, subnetClass, ipType, v42ip, hexIP ,allposibleIp } from './helper';
import { config } from 'chai/lib/chai';

describe('test plus', () => {
  it('should plus number', () => {
    expect(plus(1, 2)).to.equal(3);
    expect(plus(0, 2)).to.equal(2);
  })
})

describe('test ip2v4', () => {
  it('subnet div bit test', () => {
    expect(ip2v4(conv2subnet(0))).to.equal('0.0.0.0');
    expect(ip2v4(conv2subnet(1))).to.equal('128.0.0.0');
    expect(ip2v4(conv2subnet(2))).to.equal('192.0.0.0');
    expect(ip2v4(conv2subnet(24))).to.equal('255.255.255.0');
    expect(ip2v4(conv2subnet(32))).to.equal('255.255.255.255');
  })
})

describe('test networkAdd', () => {
  it('test networkAdd', () => {
    expect(ip2v4(networkAdd('158.108.0.2',24))).to.equal('158.108.0.0');
    expect(ip2v4(networkAdd('158.108.1.2',24))).to.equal('158.108.1.0');
  })
})

describe('test usable', () => {
  it('test usable', () => {
    expect(ip2v4(usableip('158.108.0.2',24).data1) + ' - ' + ip2v4(usableip('158.108.0.2',24).data2)).to.equal('158.108.0.1 - 158.108.0.254');
    console.log(ip2v4(usableip('158.108.0.2',32).data1) + ' - ' + ip2v4(usableip('158.108.0.2',32).data2));
  })
})

describe('test broadcast', () => {
  it('test broadcast', () => {
    expect(ip2v4(broadcast('158.108.1.1',24))).to.equal('158.108.1.255');
    expect(ip2v4(broadcast('158.108.12.34',28))).to.equal('158.108.12.47');
  })
})

describe('test totalhost', () => {
  it('test totalhost', () => {
    expect(totalhost(28)).to.equal(16);
    expect(totalhost(23)).to.equal(512);
  })
})

describe('test usablehost', () => {
  it('test usablehost', () => {
    expect(usablehost(28)).to.equal(14);
    expect(usablehost(23)).to.equal(510);
  })
})

describe('test wildcard', () => {
  it('test wildcard', () => {
    expect(ip2v4(wildcard(28))).to.equal('0.0.0.15');
    expect(ip2v4(wildcard(23))).to.equal('0.0.1.255');
  })
})

describe('test wildcard', () => {
  it('test wildcard', () => {
    expect(ip2v4(wildcard(28))).to.equal('0.0.0.15');
    expect(ip2v4(wildcard(23))).to.equal('0.0.1.255');
  })
})

describe('test subnetClass', () => {
  it('test subnetClass', () => {
    expect(subnetClass(1).ipclass).to.equal('Any');
    expect(subnetClass(26).ipclass).to.equal("C");
  })
})

describe('test ipType', () => {
  it('test ipType', () => {
    expect(ipType("158.108.12.34")).to.equal('Public');
    console.log(ipType("158.108.12.34"));
    expect(ipType("192.168.1.1")).to.equal('Private');
    console.log(ipType("192.168.1.1"));
  })
})

describe('test hexIP', () => {
  it('test hexIP', () => {
    expect(hexIP("158.108.12.34")).to.equal('9e6c0c22');
    expect(hexIP("158.108.22.34")).to.equal("9e6c1622");
  })
})

describe('test allposibleIp', () => {
  it('test allposibleIp', () => {
    allposibleIp("123.2.0.0",18);
  })
})





