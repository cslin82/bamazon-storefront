const inquirer = require('inquirer');

var productList = [
    "product 1",
    "product 2",
    "product 3",
    "product 4",
    "product 5",
    "product 6" ]


const questions = [
    /* Pass your questions in here */
    {
        type: 'list',
        name: 'productName',
        message: "What product do you want?",
        paginated: true,
        choices: productList

    }
];



inquirer.prompt(questions).then(answers => {
    console.log(answers);
    

});