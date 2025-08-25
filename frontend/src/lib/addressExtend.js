//This helper function provides an array of addresses, given an address
//and an address count. It simply provides the next addressCount addresses.

export const addressExtend = (address, addressCount) => {
    //List of addresses
    let addressList = [];
    //Translate address to Big Endian, then decimal
    address = parseInt(address.slice(2) + address.slice(0, 2), 16);
    
    for (let i = 0; i < addressCount; i++) {
        let addressTemp = (address + i).toString(16)
        addressTemp = "0".repeat(4 - addressTemp.length) + addressTemp;
        addressList.push(addressTemp.slice(2) + addressTemp.slice(0, 2));
    }

    return addressList;
}