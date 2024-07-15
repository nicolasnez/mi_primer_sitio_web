function randomuserme() {

    /*
    Crear la estructura de la tabla, obteniendo la referencia del lugar donde se ubicará la
    tabla dinámica.
    */
    let tabla_usuarios = document.getElementById('tabla_randomuserme');

    //crear la estructura básica de una tabla
    let tabla = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    //Definir los encabezados que tendrá la tabla
    let encabezados = ['ID','NOMBRE','EMAIL','PAIS','EDAD','IMAGEN'];

    //Crear la fila que tendrá los encabezados...
    let fila_head = document.createElement('tr');

    for(let i=0; i < encabezados.length; i++){
        let celda_head = document.createElement('th');
        let texto_celda = document.createTextNode(encabezados[i]);
        celda_head.appendChild(texto_celda);
        fila_head.appendChild(celda_head);
    }
    thead.appendChild(fila_head);
    tabla.appendChild(thead);

    let cantidad = 100;

    let urlRandomUserMe = `https://randomuser.me/api/?results=${cantidad}&nat=gb,us,br`;

    fetch(urlRandomUserMe)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //Crear la estructura del cuerpo de la tabla a partir de los datos obtenidos
        for(const user of data.results){
            //Crear una fila
            let fila_body = document.createElement('tr');

            //Celda ID
            let celda_id = document.createElement('td');
            let texto_id = document.createTextNode(user.id.value);
            celda_id.appendChild(texto_id);
            fila_body.appendChild(celda_id);
            tbody.appendChild(fila_body);

            //Celda NOMBRE
            let celda_nombre = document.createElement('td');
            let texto_nombre = document.createTextNode(user.name.first + " " + user.name.last);
            celda_nombre.appendChild(texto_nombre);
            fila_body.appendChild(celda_nombre);
            tbody.appendChild(fila_body);

            //Celda EMAIL
            let celda_email = document.createElement('td');
            let texto_email = document.createTextNode(user.email);
            celda_email.appendChild(texto_email);
            fila_body.appendChild(celda_email);
            tbody.appendChild(fila_body);

            //Celda PAIS
            let celda_pais = document.createElement('td');
            let texto_pais = document.createTextNode(user.location.country);
            celda_pais.appendChild(texto_pais);
            fila_body.appendChild(celda_pais);
            tbody.appendChild(fila_body);

            //Celda EDAD
            let celda_edad = document.createElement('td');
            let texto_edad = document.createTextNode(user.dob.age);
            celda_edad.appendChild(texto_edad);
            fila_body.appendChild(celda_edad);
            tbody.appendChild(fila_body);

            //Celda IMAGEN
            let celda_imagen = document.createElement('td');
            let src_imagen = document.createElement('img');
            src_imagen.src = user.picture.medium;
            src_imagen.setAttribute('class','img-rounded');
            celda_imagen.appendChild(src_imagen);
            fila_body.appendChild(celda_imagen);
            tbody.appendChild(fila_body);
            
        }

    });
    tabla.appendChild(tbody);

    tabla_usuarios.appendChild(tabla);

    tabla.setAttribute('class','table table-hover')
    thead.setAttribute('class','table-dark text-center')
    tbody.setAttribute('class','text-center');


}