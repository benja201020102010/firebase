



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";




const firebaseConfig = {
    apiKey: "AIzaSyBaxw5yP-JZAV7IFtlWtjXSlIo85v4w8js",
    authDomain: "automotores-el-poly.firebaseapp.com",
    projectId: "automotores-el-poly",
    storageBucket: "automotores-el-poly.firebasestorage.app",
    messagingSenderId: "974864685672",
    appId: "1:974864685672:web:263801ea20629ead3f79dd",
    measurementId: "G-VJBVL67YWK"
};




const app = initializeApp(firebaseConfig);


const db = getDatabase(app);

const autosRef = ref(db, "autos");

let marca = document.querySelector("#marca");
let modelo = document.querySelector("#modelo");
let año = document.querySelector("#año");
let precio = document.querySelector("#precio");
let imagen = document.querySelector("#imagen");

let btnAgregar = document.querySelector("#btnAgregar");

let buscar = document.querySelector("#buscar");

let resultados = document.querySelector("#resultados");


btnAgregar.addEventListener("click", function () {

    let nuevoAuto = push(autosRef);

    set(nuevoAuto, {

        marca: marca.value,
        modelo: modelo.value,
        año: año.value,
        precio: precio.value,
        imagen: imagen.value

    });

    marca.value = "";
    modelo.value = "";
    año.value = "";
    precio.value = "";
    imagen.value = "";

});


onValue(autosRef, function (snapshot) {

    let autos = snapshot.val();

    resultados.innerHTML = "";

    if (autos) {

        for (let id in autos) {

            let auto = autos[id];

            resultados.innerHTML += `

                <div class="tarjeta">

                    <img src="${auto.imagen}" alt="${auto.modelo}">

                    <h2>${auto.marca} ${auto.modelo}</h2>

                    <p>Año: ${auto.año}</p>

                    <p>Precio: $${auto.precio}</p>

                </div>

            `;
        }

    } else {

        resultados.innerHTML = "<p>No hay autos cargados.</p>";

    }

});

buscar.addEventListener("input", function () {

    let texto = buscar.value.toLowerCase();

    onValue(autosRef, function (snapshot) {

        let autos = snapshot.val();

        resultados.innerHTML = "";

        if (autos) {

            for (let id in autos) {

                let auto = autos[id];

                let marcaAuto = auto.marca.toLowerCase();

                let modeloAuto = auto.modelo.toLowerCase();


                if (
                    marcaAuto.includes(texto) ||
                    modeloAuto.includes(texto)
                ) {

                    resultados.innerHTML += `

                        <div class="tarjeta">

                            <img src="${auto.imagen}" alt="${auto.modelo}">

                            <h2>${auto.marca} ${auto.modelo}</h2>

                            <p>Año: ${auto.año}</p>

                            <p>Precio: $${auto.precio}</p>

                        </div>

                    `;
                }
            }
        }

    });

});