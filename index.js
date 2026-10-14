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
    databaseURL: "PEGAR_AQUI_LA_URL_DE_REALTIME_DATABASE",
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
let autosCargados = {};
btnAgregar.addEventListener("click", function () {
    if (
        marca.value.trim() === "" ||
        modelo.value.trim() === "" ||
        año.value === "" ||
        precio.value === ""
    ) {
        alert("Completa marca, modelo, año y precio.");
        return;
    }
    let nuevoAuto = push(autosRef);

    set(nuevoAuto, {
        marca: marca.value.trim(),
        modelo: modelo.value.trim(),
        año: año.value,
        precio: precio.value,
        imagen: imagen.value.trim()
    })
    .then(function () {
        alert("Auto agregado correctamente.");

        marca.value = "";
        modelo.value = "";
        año.value = "";
        precio.value = "";
        imagen.value = "";
    })
    .catch(function (error) {
        console.error(error);
        alert("Error al guardar el auto: " + error.message);
    });

});

onValue(autosRef, function (snapshot) {

    autosCargados = snapshot.val() || {};
    mostrarAutos();

}, function (error) {

    console.error(error);
    resultados.innerHTML = "<p>Error al cargar los autos de Firebase.</p>";

});

buscar.addEventListener("input", mostrarAutos);

function mostrarAutos() {

    let texto = buscar.value.toLowerCase().trim();

    resultados.innerHTML = "";
    let encontrados = 0;

    for (let id in autosCargados) {

        let auto = autosCargados[id];

        let marcaAuto = (auto.marca || "").toLowerCase();
        let modeloAuto = (auto.modelo || "").toLowerCase();
        let añoAuto = String(auto.año || "");

        if (
            marcaAuto.includes(texto) ||
            modeloAuto.includes(texto) ||
            añoAuto.includes(texto)
        ) {

            resultados.innerHTML += `
                <div class="tarjeta">
                    ${auto.imagen ? `<img src="${auto.imagen}" alt="Auto">` : ""}
                    <h2>${auto.marca} ${auto.modelo}</h2>
                    <p>Año: ${auto.año}</p>
                    <p>Precio: $${auto.precio}</p>
                </div>
            `;

            encontrados++;
        }
    }

    if (encontrados === 0) {
        resultados.innerHTML = "<p>No se encontraron autos.</p>";
    }

}








