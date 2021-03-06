const SQLUSER = 'bamazon_cust';
const SQLPASS = 'dYOVIR6ZRjH+LMf6A3BX';


const Sequelize = require('sequelize');
const sequelize = new Sequelize('bamazon', SQLUSER, SQLPASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const inquirer = require('inquirer');

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
    .then(() => Product.findAll({
        // attributes: ["product_name"],
        // raw: true
    })) // end sequelize.sync.then for SELECT * FROM... query
    .then(productArr => {
        // console.log(productArr);

        productArr.forEach(element => {
            let prodInfo =
                'item #' + element.item_id + ': ' + element.product_name +
                ' in stock: ' + element.stock_quantity + ' at ' + element.price + ' each';
            console.log(prodInfo);

        });

        var productList = productArr.map(x => x.product_name);

        const questions = [
            /* Pass your questions in here */
            {
                type: 'list',
                name: 'productName',
                message: "What product do you want?",
                paginated: true,
                choices: productList

            },
            {
                type: 'input',
                name: 'orderQuantity',
                message: "How many do you want?"
            }
        ];



        inquirer.prompt(questions).then(answers => {
            console.log(answers);
            var yourProduct = productArr.find(element => element.product_name === answers.productName);
            // console.log('yourproduct:', yourProduct);

            if (yourProduct.stock_quantity >= answers.orderQuantity) {
                console.log('ordering', answers.orderQuantity, 'of', yourProduct.product_name, 'for a total of', answers.orderQuantity * yourProduct.price);

                console.log('your total cost is', answers.orderQuantity, 'of', yourProduct.product_name);
                console.log('new inventory of', yourProduct.product_name, 'is', yourProduct.stock_quantity - answers.orderQuantity);

                yourProduct.stock_quantity -= answers.orderQuantity;
                console.log('yourProduct.stock_quantity:', yourProduct.stock_quantity);
                
                // yourProduct.save()
                yourProduct.decrement('stock_quantity', { by: answers.orderQuantity }).save((() => {} )).success(() => console.log('yourProduct.stock_quantity:', yourProduct.stock_quantity));

            } else {
                console.log('insufficient stock');

            }



        }) // end inquirer.prompt.then
            .then(() => process.exit());
    }); // end sequelize.sync.then.then




// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// Model.({
//     attributes: ['foo', 'bar']
//   });


// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

