//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
let count = 0;
document.querySelector('button').addEventListener('click', getDrink)




function getDrink() {
    //changes the hidden class in the arrow buttons
    document.querySelector('.btn-next').classList.toggle('hidden')
    document.querySelector('.btn-prev').classList.toggle('hidden')

    


    let drinks = document.querySelector('input').value.toLowerCase();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinks}`;
    console.log(url);
    ///we need to use https to get working, else it doesn't
    const ul = document.querySelector('ul')
    const body = document.querySelector('body')
    const p = document.querySelector('p');
    const h3 = document.querySelector('h3')

    fetch (url) 
        .then(res => res.json())
        .then(data => {
            console.log(`count1: ${count}`);
            //console.log(data);//object
            console.log(data.drinks);//array with objects
            // let drink =data.drinks [0] 
            let arrDrinks = data.drinks;
            //this part of the code do the carousel, when you fished all the drinks you got the fist one again an then the second etc.///
            if (count ===arrDrinks.length) {
                console.log(`count2: ${count},length: ${arrDrinks.length}`);
                p.innerText = 'click again to start all over!!! ';
                document.querySelector("img").src=''
                document.querySelector('h2').innerText = ''
                h3.innerText = ''

            }
            //
            document.querySelector('.btn-next').addEventListener('click', nextCocktail)
            function nextCocktail () {
                ///code for removing every li that has been created in the previous iteration!!! USED IN INGREDIENTS///
                const liArr = document.querySelectorAll('li') //this is an array
                if (liArr.length>0) {
                    liArr.forEach(li => li.remove() )
                }
                 //this part of the code makes the counter re start and the drinks starts again!
                if (count>=arrDrinks.length) {
                    count =0
                    console.log(`count3: ${count}`);
                } else {  
                    ///this code overwrites the existing data for img and h2 each iteration///
                    document.querySelector("img").src = arrDrinks[count].strDrinkThumb
                    document.querySelector('h2').innerText = arrDrinks[count].strDrink
                    getIngredients(count)
                    getInstructions(count)
                    count ++;
                    console.log(`count4: ${count}`);
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


