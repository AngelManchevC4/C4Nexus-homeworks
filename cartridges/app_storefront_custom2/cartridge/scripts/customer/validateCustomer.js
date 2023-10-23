function validate(customer, fn, fallbackFn) {

    if (customer) {
        return fn();
    }
    return fallbackFn();
}

module.exports = {
    validate: validate
};