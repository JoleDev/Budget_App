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
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            //Create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            //Create new item based on the type, Income or Expense
            if (type === "income") {
                newItem = new Income(id, des, val);
            } else if (type === "expense") {
                newItem = new Expense(id, des, val);
            }

            //Puch the new data to the data array defined above
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log(data);
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
        addButton: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list"
    };

    //This function will return an object and will assign that object to the uiController variable.
    return {
        getInput: function () {
            //We return an object here as well, As it will be easy to access
            return {
                type: document.querySelector(names.inputType).value, // Return will be either income (for Income) or expense (For expense)
                description: document.querySelector(names.description).value,
                value: parseFloat(document.querySelector(names.value).value)
            }
        },

        getNames: function () {
            return names;
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            //Create HTML String with placeholder text
            if (type === "income") {
                element = names.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "expense") {
                element = names.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };

            //Replace the placeholder text with some actual text
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);

            //Insert the HTML to the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(names.description + ',' + names.value);
            //querySelectorAll does not returns an array, It returns kind of a list, So we have to convert this list to an array
            //We can use array method slice()
            //In than case also we cannot call fields.slice(), as fields is not an array
            //So we have to use call method in Array prototype slice.call(fields), Slice method is in the Array Prototype
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, arr) {
                current.value = "";
            });

            //Divert back the focus to description input
            fieldsArray[0].focus();
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

    var updateBudget = function () {
        //1. Calculate the budget

        //2. Return the budget value

        //3. Display the budget value in UI
    };

    var ctrlAddItems = function () {
        var input, newItem;

        //1. Get the input data
        input = uiCtrl.getInput();

        if (input.description != "" && !isNaN (input.value) && input.value > 0) {
            //2. Add items to the budgte data
            newItem = bdgCtrl.addItem(input.type, input.description, input.value);

            //3. Display the input data in HTML
            uiCtrl.addListItem(newItem, input.type);

            //4. Clear the input feilds
            uiCtrl.clearFields();

            //5. Calculate the budget value & Display the budget
        };
    };

    return {
        init: function () {
            console.log("Application as started")
            setupEventListners();
        }
    };

})(budgetController, uiController);

//Calling the init function
globalController.init();