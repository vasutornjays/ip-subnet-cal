import { config } from "chai/lib/chai";
import { expectTypes, compareByInspect } from "chai/lib/chai/utils";

export const plus = (x, y) => x + y;

export const conv2subnet = n => {
    var d = (0xffffffff << (32 - n)) >>> 0;
    if(n === 0)
    {
        d = 0;
    }
    return d;
}

export const v42ip = ipv4 => {
    var arrip = ipv4.split(".");
    var ip = 0;
    var multi = 1 << 24;
    for (var i = 0; i < 4; i ++) {
        ip += arrip[i] * (multi >> (i * 8));
    }
    return ip;
}

export const ip2v4 = ipv4 => {
    let n1 = ipv4 & 0xff;
    let n2 = (ipv4 >>> 8) & 0xff;
    let n3 = (ipv4 >>> 16) & 0xff;
    let n4 = (ipv4 >>> 24) & 0xff;
    var ip = n4 + "." + n3 + "." + n2 + "." + n1;
    return ip;
}

const map = {'Any': 0, 'A': 7, 'B': 15, 'C': 23};

export const genSubnetClass = c =>{
    const a = new Array(32 - map[c]).fill(0);
    const b = a.map((number, index) => ip2v4(conv2subnet(index+1+map[c])) + "/" + (index+1+map[c])).reverse();
    return b;
}

export const networkAdd = (ipv4,n) =>{
    var ip = v42ip(ipv4);
    var netIp = (ip & conv2subnet(n)) >>> 0;
    return netIp;
}

export const usableip = (ipv4,n) => {
    var netadd = networkAdd(ipv4,n);

    if(n>=31)
    {
        return "none";
    }

    var ip1 = netadd + 1;
    var ip2 = netadd + (~conv2subnet(n)) - 1;

    return ip2v4(ip1) + ' - ' + ip2v4(ip2);
}

export const broadcast = (ipv4,n) => {
    var bcip = networkAdd(ipv4,n) + (~conv2subnet(n));
    return bcip; 
}

export const totalhost = (n) => {
    var totalhost = 1 << (32-n);
    return totalhost;
}

export const usablehost = (n) => {
    var usablehost = (1 << (32-n)) - 2;
    if(usablehost < 0)
    {
        return 0;
    }
    return usablehost;
}

export const wildcard = (n) => {
    var wc = (~conv2subnet(n));
    return wc;
}

export const subnetClass = (n) => {
    var c = '';
    var s = 0;
    if(n < 8){
        c = 'Any';
        s = 0;
    }
    else if(n < 16){
        c = "A";
        s = 8;
    }
    else if(n < 24){
        c = "B";
        s = 16;
    }
    else {
        c = "C";
        s = 24;
    }
    return {
        ipclass: c,
        classsize: s
    };  
}

export const ipType = (ipv4) => {
    var type = "Public";
    if (((v42ip(ipv4) >= v42ip("10.0.0.0")) & ((v42ip(ipv4) <= v42ip("10.255.255.255"))))
       | ((v42ip(ipv4) >= v42ip("172.16.0.0")) & ((v42ip(ipv4) <= v42ip("172.31.255.255"))))
       | ((v42ip(ipv4) >= v42ip("192.168.0.0")) & ((v42ip(ipv4) <= v42ip("192.168.255.255"))))){
        type = "Private";
    }
    return type;
}

export const hexIp = (ipv4) => {
    var hexString = "";
    var ip = v42ip(ipv4);
    hexString = ip.toString(16);
    return hexString;
}

export const binaryIp = (ipv4) => {
    var binum = 0;
    var ip = v42ip(ipv4);
    return binum = ip.toString(2)
}

export const allposibleIp = (ipv4,n) =>
{
    var a = [
        {
        start: String,
        useable: String,
        end: String
        }
   ];
    var size = subnetClass(n).classsize;
    var startIp = networkAdd(ipv4,size);
    var stopIp = broadcast(ipv4,size);
    var ip = startIp;
    var i = 0;
     while (ip < stopIp)
     {
        a.push({
            start: ip2v4(ip),
            useable: usableip(ip2v4(ip),n),
            end: ip2v4(broadcast(ip2v4(ip),n))
        });
        ip = broadcast(ip2v4(ip),n) + 1;
        i++
     }
    return a;
}


export const checkIpv4 = (ip) => {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}