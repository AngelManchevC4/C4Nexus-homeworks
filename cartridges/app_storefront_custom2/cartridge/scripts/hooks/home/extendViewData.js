const extendViewData = function(viewData,value) {
    let newViewData = viewData;
    newViewData.msg = value;
    return newViewData;
}


module.exports = {
    extendViewData: extendViewData
};