//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
    //Show the arrows 
    document.querySelector('.btn-next').classList.remove('hidden')
    document.querySelector('.btn-prev').classList.remove('hidden')
    //Get the drink inserted in ther input
    let drinks = document.querySelector('input').value.toLowerCase();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinks}`;
    console.log(url);
    let count = 0;
        ///we need to use https to get working, else it doesn't
    const ul = document.querySelector('ul')
    const p = document.querySelector('p');
    const h3 = document.querySelector('h3');
    //extract the data using the url for the drink
    fetch (url) 
        .then(res => res.json())
        .then(data => {
            console.log(`Initial count: ${count}`);
                //console.log(data);//object
            console.log(data.drinks);//array with objects
            let arrDrinks = data.drinks;
            //Insert the content for drink in index 0
            insertContent()
            //Button next interactions
            document.querySelector('.btn-next').addEventListener('click', nextCocktail)
            function nextCocktail () {
                count ++;
                showFinalMessage(arrDrinks.length)
                removeIngredients()
                insertContent()
                
            }
            document.querySelector('.btn-prev').addEventListener('click', prevCocktail)
            function prevCocktail () {
                count --;
                showFinalMessage(-1)
                removeIngredients()
                insertContent()
            }
            
            ///function for writting 
            function insertContent() {
                if (count<0) {
                    count =arrDrinks.length-1
                    console.log(`count3: ${count}`);
                } else if (count>=arrDrinks.length) {
                    count =0
                    console.log(`count3: ${count}`);
                } else {  
                    ///this code overwrites the existing data for img and h2 each iteration///
                    document.querySelector("img").src = arrDrinks[count].strDrinkThumb
                    document.querySelector('h2').innerText = arrDrinks[count].strDrink
                    getIngredients(count)
                    getInstructions(count)
                    console.log(`count: ${count}`);
                }
            }
            ///code for removing every li that has been created in the previous iteration!!! USED IN INGREDIENTS///
            function removeIngredients() {
                const liArr = document.querySelectorAll('li') //this is an array
                if (liArr.length>0) {
                    liArr.forEach(li => li.remove())
                }
            }
            //this function runs when the loop reaches the end!!!
            function showFinalMessage(step) {
                if (count ===step) {
                    console.log(`count2: ${count},length: ${arrDrinks.length}`);
                    p.innerText = 'click again to start all over!!! ';
                    document.querySelector("img").src=''
                    document.querySelector('h2').innerText = ''
                    h3.innerText = ''
                }
            }

            ///this code overwrites the existing data for the paragraph with the instructions in each iteration///
            function getInstructions(drinkIndex) {
                p.innerText = arrDrinks[drinkIndex].strInstructions;
            }
            function getIngredients(drinkIndex) {
                //code to get an array with the name property of ingredients///
                let arrIngNum=[];
                for (let i=1; i<=15; i++) {
                        arrIngNum.push(`strIngredient${i}`)
                }
                console.log(`dirnkIndex: ${drinkIndex}`);
                console.log(arrDrinks[drinkIndex]);
                for (let j=0; j<arrIngNum.length; j++) {
                    let ingredient = arrDrinks[drinkIndex][arrIngNum[j]]
                    if (ingredient !== null) {
                    h3.innerText = 'Ingredients'
                    const li = document.createElement('li')
                    li.innerText = arrDrinks[drinkIndex][arrIngNum[j]]
                    console.log(arrDrinks[drinkIndex][arrIngNum[j]]);
                    ul.appendChild(li)
                    }
                } 
            }

        })
}


