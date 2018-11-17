//BUDGET CONTROLLER IIFE
var budgetController = (function () {

})();

//UI CONTROLLER IIFE
var uiController =  (function () {

    //Declaring an object for all the class names and IDs
    var names = {
        inputType: ".add__type",
        description: ".add__description",
        value: ".add__value",
        addButton : ".add__btn"
    };

    //This function will return an object and will assign that object to the uiController variable.
    return {
        getInput : function () {
            //We return an object here as well, As it will be easy to access
            return {
                type : document.querySelector (names.inputType).value, // Return will be either inc (for Income) or exp (For expense)
                description : document.querySelector (names.description).value,
                value : document.querySelector (names.value).value
            } 
        },

        getNames : function () {
            return names;
        }
    };
})();

//GLOBAL APP Controller
var globalController = (function (bdgCtrl, uiCtrl) {

    var names = uiCtrl.getNames ();

    var ctrlAddItems = function () {
        //Task one - Get the input data
        var input = uiCtrl.getInput ();
        console.log (input);

        //Task two -  Add items to the budgte data

        //Task three - Calculate the budget value

        //Display the budget
    };

    //Addind the event listner for the button
    document.querySelector (names.addButton).addEventListener ("click", ctrlAddItems);
    
    //Add the enter key press event
    document.addEventListener ("keypress", function (event) {
        //Event listner was added to the entire document not to specific html controller
        //As this key press event can happen any where in the document
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItems ();
        }
    });

})(budgetController, uiController);