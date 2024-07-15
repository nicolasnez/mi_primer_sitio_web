$(document).ready(function () {
    let urlRestCountries = `https://restcountries.com/v3.1/all`;

    $.getJSON(urlRestCountries, function (dataCountries) {
        let table_body = '';

        for (let i = 0; i < dataCountries.length; i++) {
            table_body = table_body + 
                `
                    <tr class="text-center">
                        <td>${i+1}</td>
                        <td>${dataCountries[i].translations.spa.common}</td>
                        <td>${dataCountries[i].capital}</td>
                        <td>${dataCountries[i].region}</td>
                        <td>
                            <img class="img-country" src=${dataCountries[i].flags.svg} alt=${dataCountries[i].flags.alt}>
                        </td>
                        <td>
                        <img class="img-country" src=${(dataCountries[i].coatOfArms.svg)?dataCountries[i].coatOfArms.svg:"assets/img/not_found.svg"} alt="Coat of Arms">
                        </td>
                    </tr>
                `
        }
        $('#table_body').append(table_body);           

    }).fail(function () {
        Swal.fire({
            title: "Ups!!!",
            text: "Al parecer tenemos problemas con la conexión...",
            icon: "warning"
        });
    });
});

$(document).ready(function() {
    $('#texto_filtro').on('keyup', function() {
        let texto = $(this).val().toLowerCase();
        $('#table_body tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(texto) > -1)
        });
    });
});