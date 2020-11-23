var url = "https://pokeapi.co/api/v2/pokemon/";
var next = '';
var previous = url;
var pokemonName = [];


function cargar(urlActual) {
  fetch(urlActual)
    .then((response) => response.json())
    .then((datos) => {
      next = datos.next;
      previous = datos.previous;

      document.getElementById('totalPokemon').innerHTML = datos.count;

      var informacion = '';
     for (const i of datos["results"]) {

        pokemonName = [i.name];
          console.log(pokemonName);
        var htmlPokemon =
          '<div class="col-md-3"><a href="" id="link" onclick=" modalPokemon(this.pokemonName)">' 
           + i.name + '</a>    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"> Ver </button>  </div>';


            informacion = informacion + htmlPokemon;
           
            
                        

          }  
          $(document).ready(function() {
            $("a").click(function(event) {
                alert(event.target.id);
            });
        });
      document.getElementById('pokedex').innerHTML = informacion;
   
    })


}

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(500).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)


const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"</img>
        <a href="javascript:selectedPokemon(${id})" class="card-title" id="">${id}. ${name}</a>
        <p class="card-subtitle">${elementTypes.join(" | ")}</p>
      </li>
    `
    
    return accumulator
  }, "")
}

// Carga de data para pagina Pokemon

function selectedPokemon (id){

    const getPokemon = id;

    window.location.href = 'pokemon.html' + '#' + getPokemon;

}

 function cargarPokemon(){
  var id = window.location.hash.substring(1)
  console.log(id);
 


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://pokeapi.co/api/v2/pokemon/${id}`,
      "method": "GET"
    }
    const pokeStats = [0, 0, 0, 0, 0, 0];
    $.ajax(settings).done(function (response) {
      console.log(response);

      var content = response.name;
        var tamaño = response.height;
        var peso =  response.weight;
        var hp = response.stats[0].base_stat;
        var ataque = response.stats[1].base_stat;
        var defensa = response.stats[2].base_stat;
        var ataqueEspecial = response.stats[3].base_stat;
        var defensaEspecial = response.stats[4].base_stat;
        var velocidad = response.stats[5].base_stat;
        var total =  response.stats[0].base_stat + response.stats[1].base_stat + response.stats[3].base_stat + response.stats[4].base_stat + response.stats[5].base_stat;
        console.log(hp);
          
          pokeStats[0] =hp;
          pokeStats[1] = ataque;
          pokeStats[2] = defensa;
          pokeStats[3] = ataqueEspecial;
          pokeStats[4] = defensaEspecial;
          pokeStats[5] = velocidad;

          console.log(pokeStats);
          var chart = new CanvasJS.Chart("chartContainer", {
            width: 320,
            theme: "light1",
            animationEnabled: true,
            title: {
              text: "Estadísticas del Pokemon"
            },
            data: [{
              type: "column",
              dataPoints: [{
                label: "HP",
                y: pokeStats[0]
              },
              {
                label: "Ataque",
                y: pokeStats[1]
              },
              {
                label: "Defensa",
                y: pokeStats[2]
              },
              {
                label: "Ataque especial",
                y: pokeStats[3]
              },
              {
                label: "Defensa especial",
                y: pokeStats[4]
              },
              {
                label: "Velocidad",
                y: pokeStats[5]
              }

              ]
            }]
          });chart.render();

              for(i=0; response.types.lenght >= i ; i++){

                   

              }

     $.each(response.types, function(i, item) {
                $("#res2").text("en el each");
  
                console.log(item.type.name);

                $("#tipos").append(item.type.name);    
             

            });

      $("#nombrePokemon").append(content);
      $("#height").append(tamaño);
      $("#weight").append(peso);
      $("#hp").append(hp);
      $("#atack").append(ataque);
      $("#defense").append(defensa);
      $("#ataqueEspecial").append(ataqueEspecial);
      $("#defensaEspecial").append(defensaEspecial);
      $("#velocidad").append(velocidad);
      $("#total").append(total);


    });

  //var nombrePokemon = document.getElementById("nombrePokemon").innerHTML = data.species.name;
  var numeroPokemon = document.getElementById("numeroPokemon").innerHTML = id;
  var imgPokemon = document.getElementById("imgPokemon").src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  console.log(res.name)

 }
// //

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}



const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
