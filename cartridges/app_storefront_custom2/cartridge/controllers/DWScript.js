
//1

/**
 * 
 * @param {dw.catalog.Product} product 
 * @returns {String} returns product id
 */
let getProductByID = (product) => {
    return product.getID();
}

//2
/**
 * 
 * @param {dw.catalog.Product} product 
 * @returns {Collection} returns product categories
 */

let getProductCategoryByProduct= (product)=>{
    return product.getCategories();
}

/**
 * 
 * @param {dw.catalog.ProductPriceModel} product 
 * @returns {Number} returns the active price of a product
 */
//3
let getProductPricesByProduct = (quantity=0) => {
    return product.getPrice(quantity);
}

//4
// let getCatalogMinCategories = ()=>{
// }


//5
/**
 * 
 * @param {dw.catalog.Customer} customer 
 * @returns {String} returns customer id
 */
let getCustomerByID = (customer) => {
    return customer.getID();
}

//6
/**
 * 
 * @param {dw.catalog.Customer} customer 
 * @returns {Boolean} returns if customer is assigned to a customer group
 */
let checkCustomerIsAssignedToGroup = (customer,customerGroup) => {
    return customer.isMemberOfCustomerGroup(customerGroup);
}


