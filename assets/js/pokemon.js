$(document).ready(function(){
    for(let i=1; i <= 1025; i++){
        let imagePokemon = 
        `<img id="${i}" class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png">`;
        $('#pokemon-imagenes').append(imagePokemon);
    }
});

$(document).on('mouseover','img',function() {
    let id = $(this).attr('id');
    $(this).css('background-color','lightgray');
    console.log(id);

    let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;

    $.getJSON(urlPokemon,function(dataPokemon){
        $('#pokemon-nombre').text(capitalizarTexto(dataPokemon.name));
        $('#pokemon-imagen').attr('src',dataPokemon.sprites.other.home.front_default);

        let type = '<h5 class="card-title fw-bold">Tipo</h5><ul>';
        for(let i=0; i < dataPokemon.types.length; i++){
            type = type + ('<li>' + capitalizarTexto(dataPokemon.types[i].type.name + '</li>'));
        }
        type = type + '</ul>';
        $('#pokemon-tipo').html(type);

        let peso = `<h5 class="card-title fw-bold">Peso:</h5><p>${dataPokemon.weight/10} kgs.</p>`;
        $('#pokemon-peso').html(peso);

        let estatura = `<h5 class="card-title fw-bold">Estatura:</h5><p>${dataPokemon.height/10} mts.</p>`;
        $('#pokemon-estatura').html(estatura);


    }).fail(function() {
        Swal.fire({
            title: "Ups!!!",
            text: "Al parecer tenemos problemas con la conexión...",
            icon: "warning"
        });
    });

});

$(document).on('mouseout','img',function() {
    let id = $(this).attr('id');
    $(this).css('background-color','transparent');
    console.log(id);
    $('#pokemon-nombre').text('');
    $('#pokemon-imagen').attr('src','#');
    $('#pokemon-tipo').html('');
    $('#pokemon-peso').html('');
    $('#pokemon-estatura').html('');
    
});

function capitalizarTexto(texto) {
    let capitalizado = texto.substr(0,1).toUpperCase() + texto.substr(1,texto.length).toLowerCase();
    return capitalizado;
}