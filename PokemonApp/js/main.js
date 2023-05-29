document.querySelector(".screen-button").addEventListener('click', getPokemon)

function getPokemon() {
    const input = document.querySelector(".pokemon-name").value
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`
    fetch (url) 
        .then(res => res.json()) 
        .then( data => {
            console.log(data)
            
        }

    )

}



