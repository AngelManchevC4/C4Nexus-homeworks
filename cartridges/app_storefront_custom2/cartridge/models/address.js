var base = module.superModule;

function address(addressObject) {
    base.call(this, address);

    this.workAddress = addressObject.workAddress
}

module.exports = address;