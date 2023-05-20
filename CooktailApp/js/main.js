//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)
const ul = document.querySelector('ul')
const p = document.querySelector('p');
const h3 = document.querySelector('h3');

function getDrink() {

    //Get the drink inserted in ther input
    let drinks = document.querySelector('input').value.toLowerCase();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinks}`;
    console.log(url);

    //extract the data using the url for the drink
    fetch (url) 
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks);//array with objects
            let arrDrinks = data.drinks;
            //Insert the content for drink in index 0
            let count = 0;
            removePreviousIngredients()
            insertContent()
            if (arrDrinks.length>1) {
                //Show the arrows 
                document.querySelector('.btn-next').classList.remove('hidden')
                document.querySelector('.btn-prev').classList.remove('hidden')
                 //Button-next interaction
                document.querySelector('.btn-next').addEventListener('click', nextCocktail)
                //Button-previous interaction
                document.querySelector('.btn-prev').addEventListener('click', prevCocktail)
            }
           
            function nextCocktail () {
                count ++;
                if (count ===arrDrinks.length) {
                    showFinalMessage();
                }
                removePreviousIngredients()
                insertContent()
                console.log(`count: ${count}`);
            }
            function prevCocktail () {
                count --;
                if (count ===-1) {
                    showFinalMessage();
                }
                removePreviousIngredients()
                insertContent()
                console.log(`count: ${count}`);
            }
            ///function to insert content content 
            function insertContent() {
                if (count<0) {
                    count =arrDrinks.length-1
                } else if (count>=arrDrinks.length) {
                    count =0;
                } else {  
                    //get image
                    document.querySelector("img").src = arrDrinks[count].strDrinkThumb
                    //get name
                    document.querySelector('h2').innerText = arrDrinks[count].strDrink
                    getIngredients(count)
                    getInstructions(count)
                }
            }
            function getInstructions(drinkIndex) {
                p.innerText = arrDrinks[drinkIndex].strInstructions;
            }
            function getIngredients(drinkIndex) {
                //code to get an array with the name property of ingredients///
                let arrIngNum=[];
                for (let i=1; i<=15; i++) {
                    arrIngNum.push(`strIngredient${i}`)
                }
                for (let j=0; j<arrIngNum.length; j++) {
                    let ingredient = arrDrinks[drinkIndex][arrIngNum[j]]
                    if (ingredient !== null) {
                    h3.innerText = 'Ingredients'
                    const li = document.createElement('li')
                    li.innerText = arrDrinks[drinkIndex][arrIngNum[j]]
                    ul.appendChild(li)
                    }
                } 
            }

        })
}

 ///code for removing every li that has been created in the previous interation
function removePreviousIngredients() {
    const liArr = document.querySelectorAll('li') //this is an array
    if (liArr.length>0) {
        liArr.forEach(li => li.remove())
    }
}
 //this function runs when the loop reaches the end
function showFinalMessage() {
    p.innerText = 'click again to start all over!';
    document.querySelector("img").src=''
    document.querySelector('h2').innerText = ''
    h3.innerText = ''
}