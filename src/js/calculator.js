document.addEventListener("DOMContentLoaded", () => {

    const MAX_ML = 1500;
    const MAX_PORC = 20;
    const MIN_PORC = 1;

    const form = document.getElementById("form-calculadora");

    const radiosEnvase = document.querySelectorAll("input[name='envase']");
    const inputManual = document.getElementById("mlManual");

    const radiosPorcentaje = document.querySelectorAll("input[name='porcentaje']");
    const inputPorcentajeManual = document.getElementById("porcentajeManual");

    const resultadoDiv = document.getElementById("resultado");

    inputManual.addEventListener("input", () => {
        if (inputManual.value.trim() !== "") {
            radiosEnvase.forEach(r => r.checked = false);
        }
    });

    radiosEnvase.forEach(r => {
        r.addEventListener("change", () => {
            inputManual.value = "";
        });
    });

    inputPorcentajeManual.addEventListener("input", () => {
        if (inputPorcentajeManual.value.trim() !== "") {
            radiosPorcentaje.forEach(r => r.checked = false);
        }
    });

    radiosPorcentaje.forEach(r => {
        r.addEventListener("change", () => {
            inputPorcentajeManual.value = "";
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();


        let volumen = 0;
        const radioEnvase = document.querySelector("input[name='envase']:checked");
        const manualML = inputManual.value.trim();

        if (manualML !== "") {
            volumen = Number(manualML);

            if (isNaN(volumen) || volumen <= 0)
                return mostrarMensaje("Ingrese un volumen válido.");
            if (volumen > MAX_ML)
                return mostrarMensaje(`El volumen máximo es ${MAX_ML} ml.`);
        }
        else if (radioEnvase) {
            volumen = Number(radioEnvase.value);
        }
        else {
            return mostrarMensaje("Seleccione un envase o ingrese un valor.");
        }


        let porcentaje = 0;
        const radioPct = document.querySelector("input[name='porcentaje']:checked");
        const manualPct = inputPorcentajeManual.value.trim();

        if (manualPct !== "") {
            porcentaje = Number(manualPct);

            if (isNaN(porcentaje) || porcentaje <= 0)
                return mostrarMensaje("Ingrese un porcentaje válido.");
            if (porcentaje < MIN_PORC)
                return mostrarMensaje(`El porcentaje mínimo es ${MIN_PORC}%`);
            if (porcentaje > MAX_PORC)
                return mostrarMensaje(`El porcentaje máximo recomendado es ${MAX_PORC}%`);
        }
        else if (radioPct) {
            porcentaje = Number(radioPct.value);
        }
        else {
            return mostrarMensaje("Seleccione o ingrese un porcentaje.");
        }


        const fragancia = (volumen * porcentaje) / 100;
        const cera = volumen - fragancia;

        resultadoDiv.innerHTML = `
            <p><strong>Envase:</strong> ${volumen} ml</p>
            <p><strong>Fragancia:</strong> ${porcentaje}%</p>
            <p><strong>Cantidad de fragancia:</strong> ${fragancia.toFixed(2)} ml</p>
            <p><strong>Cantidad de cera:</strong> ${cera.toFixed(2)} ml</p>
        `;

        document.getElementById("sec-resultado").scrollIntoView({ behavior: "smooth" });

        mostrarMensaje("Cálculo realizado con éxito ✔", "exito");
    });

});

function mostrarMensaje(texto, tipo = "error") {
    const msg = document.getElementById("mensaje");
    msg.textContent = texto;

    msg.className = "mensaje";
    msg.classList.add(tipo);
    msg.classList.remove("oculto");

    setTimeout(() => msg.classList.add("oculto"), 2500);
}