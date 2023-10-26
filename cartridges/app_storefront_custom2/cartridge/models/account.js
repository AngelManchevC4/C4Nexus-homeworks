var base = module.superModule;

function account(currentCustomer, addressModel, orderModel) {
    base.call(this,currentCustomer,addressModel,orderModel);

    this.profile.fieldInterests=customer.profile.getCustom().fieldInterests;
    this.profile.countryOfResidence=customer.profile.getCustom().countryOfResidence;
}


module.exports = account;