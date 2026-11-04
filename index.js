import { initializeApp } from "https://automotores-el-poly-default-rtdb.firebaseio.com"
import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://console.firebase.google.com/u/1/project/automotores-el-poly/database/automotores-el-poly-default-rtdb/data/~2F?hl=es-419&fb_gclid=CjwKCAiAzKvXBhBAEiwABLl9AsqEj2curSqEHRLi2Rn0JL4jrFPafPCcOa21fiphfN8qi_DM0-34NBoC3c4QAvD_BwE&fb_utm_campaign=Cloud-SS-DR-Firebase-FY26-global-gsem-1713590&fb_utm_content=text-ad&fb_utm_medium=cpc&fb_utm_source=google&fb_utm_term=KW_firebase";

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
let tablaAutos = document.querySelector("#tablaAutos");

let autosCargados = {};

btnAgregar.onclick = function () {

    if (
        marca.value.trim() === "" ||
        modelo.value.trim() === "" ||
        año.value === "" ||
        precio.value === ""
    ) {
        alert("Completa todos los datos.");
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
        alert("Error al guardar el auto.");

    });

};

onValue(autosRef, function (snapshot) {

    autosCargados = snapshot.val() || {};

    mostrarAutos();

}, function (error) {

    console.error(error);
    resultados.innerHTML = "<p>Error al cargar los autos.</p>";

});

buscar.oninput = mostrarAutos;

function mostrarAutos() {

    let texto = buscar.value.toLowerCase().trim();

    resultados.innerHTML = "";
    tablaAutos.innerHTML = "";

    let encontrados = 0;

    for (let id in autosCargados) {

        let auto = autosCargados[id];

        let marcaAuto = (auto.marca || "").toLowerCase();
        let modeloAuto = (auto.modelo || "").toLowerCase();
        let añoAuto = String(auto.año || "");

        tablaAutos.innerHTML += `
            <tr>
                <td>${auto.marca}</td>
                <td>${auto.modelo}</td>
                <td>${auto.año}</td>
                <td>$${auto.precio}</td>
                <td>
                    ${auto.imagen ? `<img src="${auto.imagen}" width="80">` : "Sin imagen"}
                </td>
            </tr>
        `;

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















