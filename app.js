//BUDGET CONTROLLER IIFE
var budgetController = (function () {

    //Function constructors was created, to update Income and Expense items
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Object based data structutre used to store the data
    var data = {
        allItems : {
            expense : [],
            income : []
        },
        totals : {
            expense : 0,
            income : 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            //Create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                id = 0;
            }
            
            //Create new item based on the type, Income or Expense
            if (type === "income") {
                newItem = new Income (id, des, val);
            } else if (type === "expense") {
                newItem = new Expense (id, des, val);
            }

            //Puch the new data to the data array defined above
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log (data);
        }
    }

})();

//UI CONTROLLER IIFE
var uiController = (function () {

    //Declaring an object for all the class names and IDs
    var names = {
        inputType: ".add__type",
        description: ".add__description",
        value: ".add__value",
        addButton: ".add__btn"
    };

    //This function will return an object and will assign that object to the uiController variable.
    return {
        getInput: function () {
            //We return an object here as well, As it will be easy to access
            return {
                type: document.querySelector(names.inputType).value, // Return will be either income (for Income) or expense (For expense)
                description: document.querySelector(names.description).value,
                value: document.querySelector(names.value).value
            }
        },

        getNames: function () {
            return names;
        }
    };
})();

//GLOBAL APP Controller
var globalController = (function (bdgCtrl, uiCtrl) {

    //Add event listner function, All the event listners goes here and this function is invoked in the init function, will setup all event listners
    var setupEventListners = function () {
        //Access DOM Class and ID Names
        var names = uiCtrl.getNames();

        //Adding the event listner for the button
        document.querySelector(names.addButton).addEventListener("click", ctrlAddItems);

        //Add the enter key press event
        document.addEventListener("keypress", function (event) {
            //Event listner was added to the entire document not to specific html controller
            //As this key press event can happen any where in the document
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItems();
            };
        });
    };

    var ctrlAddItems = function () {
        var input, newItem;

        //Task one - Get the input data
        input = uiCtrl.getInput();

        //Task two -  Add items to the budgte data
        newItem = bdgCtrl.addItem (input.type, input.description, input.value);

        //Task three - Calculate the budget value

        //Display the budget
    };

    return {
        init : function () {
            console.log ("Application as started")
            setupEventListners ();
        }
    };

})(budgetController, uiController);

//Calling the init function
globalController.init ();