/* first we create a constructor that accepts 3 parameters which are the name 
and price and image and make a descriprion function to display them */
function Meal(name , price , image){

    this.name = name;
    this.price = price;
    this.image = image;

    this.description = function(){

        return `${this.name} ${this.price} ${this.image}`;

    };

}


const form = document.getElementById("mealsForm");
const orderList = document.getElementById("orderList");
const clearButton = document.getElementById("clearButton");

/* here we created an array called mealsArr to push the added meals that we want to add to it */

const mealsArr = [];

getLocalStorage();

/* here we created a function inside the addEventListener that add the meal when the user submit after he input */

form.addEventListener("submit" , function(event) {

//prevent default built in method is used to avoid the default repitition when we add the meals

    event.preventDefault();


    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const newOrder = new Meal(name , price , image);

/*this if statement is added to restrict the user from adding empty meals, so if he pressed on add meal and didn't
type a name , the browser will give him an alert that says please enter the meal name */

    if(name === ""){

        alert("please enter the meal name");
        return;

    }

//here we push the added meal to the array that we defined or initialized before     
    mealsArr.push(newOrder);

    setLocalStorage();

    renderData();

    /* here we used reset built in method to clear the input fields after the user finishes adding a meal */
    form.reset();


});


clearButton.addEventListener("click" , clearList);


function renderData(){

    orderList.innerHTML = "";

    mealsArr.forEach((meals , index) => {

        const listMeals = document.createElement("li");

        listMeals.innerHTML = `

        <div class = "mealContent">

            <div class = "mealInfo">

                <img class = "meal-img" src = "${meals.image}" alt = "${meals.name}"></img>

                <div class = "textInfo">
                
                    <strong>${meals.name}</strong>
                    <strong>${meals.price}$</strong>

                </div>

            <div>
       
        <button onclick = "deleteMeal(${index})" class = "deleteMealButton">Delete</button>
        
        </div>
        
        `;
        orderList.appendChild(listMeals);

    })

};

//function to delete the meal

function deleteMeal(index){

    mealsArr.splice(index , 1);
    setLocalStorage();
    renderData();

}

//function that clears the list by setting the array length to zero

function clearList(){

    mealsArr.length = 0;
    renderData();

    //here we also use the reset built in method to clear the input fields 

    form.reset();
    
}

function setLocalStorage(){

    localStorage.setItem("orderList" , JSON.stringify(mealsArr));

}

function getLocalStorage(){

    const mealList = localStorage.getItem("orderList");


    if(mealList){

        const storedMeals = JSON.parse(mealList);

        mealsArr.length = 0;

        storedMeals.forEach(meal => {

            mealsArr.push(new Meal(meal.name , meal.price , meal.image));

        });

        renderData();

    }

}

