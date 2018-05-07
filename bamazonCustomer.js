const SQLUSER = 'bamazon_cust';
const SQLPASS = 'dYOVIR6ZRjH+LMf6A3BX';


const Sequelize = require('sequelize');
const sequelize = new Sequelize('bamazon', SQLUSER, SQLPASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = sequelize.define('product', {
    // item_id (unique id for each product)
    item_id: Sequelize.INTEGER,
    // product_name (Name of product)
    product_name: Sequelize.STRING,
    // department_name
    department_name: Sequelize.STRING,

    // price (cost to customer)
    price: Sequelize.DECIMAL,

    // stock_quantity (how much of the product is available in stores)
    stock_quantity: Sequelize.INTEGER

}, {
    timestamps: false
});


sequelize.sync()
    .then(() => Product.create({
        item_id: 12,
        product_name: 'apples',
        department_name: 'produce',
        price: 3,
        stock_quantity: 100
    }))
    .then(thisthing => {
        console.log(thisthing.toJSON());
    });




// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.




// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

