function n(id) {
    return Number(document.getElementById(id).value);
}

function money(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}


// DESAFIO 01 - CÁLCULO DE FRETE
function calcularFrete() {
    let distancia = n("distancia");
    let peso = n("peso");
    let taxa = n("taxa");
    let tipo = Number(document.getElementById("tipoFrete").value);

    let resultado = document.getElementById("resultadoFrete");

    if (distancia <= 0 || peso <= 0 || taxa <= 0) {
        resultado.innerHTML =
            "<h3>Confira os dados</h3>" +
            "<p>Preencha os valores corretamente.</p>";

        return;
    }

    let total = ((distancia * taxa) + (peso * 0.08)) * tipo;

    resultado.innerHTML =
        '<span class="result-label">FRETE ESTIMADO</span>' +
        '<div class="result-value">' +
        money(total) +
        "</div>" +
        '<p class="text-secondary mb-0">' +
        "Cálculo baseado em distância, peso e modalidade." +
        "</p>";
}


// DESAFIO 02 - CONSUMO DE COMBUSTÍVEL
function calcularCombustivel() {
    let km = n("kmComb");
    let litros = n("litros");
    let preco = n("precoLitro");

    let resultado = document.getElementById("resultadoComb");

    if (km <= 0 || litros <= 0 || preco <= 0) {
        resultado.innerHTML =
            "<h3>Confira os dados</h3>" +
            "<p>Preencha os valores corretamente.</p>";

        return;
    }

    let consumo = km / litros;
    let custo = litros * preco;

    resultado.innerHTML =
        '<span class="result-label">CONSUMO MÉDIO</span>' +
        '<div class="result-value">' +
        consumo.toFixed(2) +
        " km/L</div>" +
        '<div class="mini-result">' +
        "Custo estimado " +
        '<b class="float-end text-warning">' +
        money(custo) +
        "</b>" +
        "</div>";
}


// DESAFIO 03 - CONTROLE DE VIAGENS
let viagens = [];

function adicionarViagem() {
    let motorista = document.getElementById("motorista").value.trim();
    let destino = document.getElementById("destino").value.trim();
    let status = document.getElementById("statusViagem").value;

    if (motorista == "" || destino == "") {
        alert("Preencha motorista e destino.");
        return;
    }

    viagens.push({
        motorista: motorista,
        destino: destino,
        status: status
    });

    let lista = document.getElementById("listaViagens");

    lista.innerHTML = "";

    for (let i = 0; i < viagens.length; i++) {
        lista.innerHTML +=
            '<div class="list-item">' +

            "<b>Viagem " +
            String(i + 1).padStart(2, "0") +
            "</b>" +

            '<span class="status float-end">' +
            viagens[i].status +
            "</span>" +

            '<div class="small text-muted mt-2">' +
            '<i class="bi bi-person"></i> ' +
            viagens[i].motorista +
            " &nbsp;→&nbsp; " +
            '<i class="bi bi-geo-alt"></i> ' +
            viagens[i].destino +
            "</div>" +

            "</div>";
    }

    document.getElementById("motorista").value = "";
    document.getElementById("destino").value = "";
}


// DESAFIO 04 - VEÍCULO MAIS UTILIZADO
let frota = {};

function registrarVeiculo() {
    let veiculo = document.getElementById("veiculoNome").value;
    let quantidade = n("qtdViagens");

    if (quantidade <= 0) {
        alert("Informe uma quantidade maior que zero.");
        return;
    }

    if (frota[veiculo] == undefined) {
        frota[veiculo] = quantidade;
    } else {
        frota[veiculo] = frota[veiculo] + quantidade;
    }

    let maisUtilizado = "";
    let maiorQuantidade = 0;

    for (let nome in frota) {
        if (frota[nome] > maiorQuantidade) {
            maiorQuantidade = frota[nome];
            maisUtilizado = nome;
        }
    }

    let tabela = document.getElementById("tabelaVeiculos");

    tabela.innerHTML = "";

    for (let nome in frota) {
        let porcentagem =
            (frota[nome] / maiorQuantidade) * 100;

        tabela.innerHTML +=
            '<div class="fleet-row">' +

            '<div class="flex-grow-1">' +

            "<b>" +
            nome +
            "</b>" +

            '<div class="bar">' +
            '<i style="width:' +
            porcentagem +
            '%"></i>' +
            "</div>" +

            "</div>" +

            '<strong class="ms-3">' +
            frota[nome] +
            "</strong>" +

            "</div>";
    }

    document.getElementById("maisUtilizado").innerHTML =
        "<b>Mais utilizado:</b> " +
        maisUtilizado +
        " — " +
        maiorQuantidade +
        " viagens";
}


// DESAFIO 05 - ESTATÍSTICAS DE ENTREGAS
function calcularEntregas() {
    let realizadas = n("realizadas");
    let pendentes = n("pendentes");
    let atrasadas = n("atrasadas");

    let total = realizadas + pendentes;

    if (total <= 0) {
        alert("Informe os dados.");
        return;
    }

    document.getElementById("totalEntregas").textContent = total;

    let porcentagemEntregas =
        (realizadas / total) * 100;

    let porcentagemAtrasos =
        (atrasadas / total) * 100;

    document.getElementById("taxaEntrega").textContent =
        porcentagemEntregas.toFixed(1) + "%";

    document.getElementById("taxaAtraso").textContent =
        porcentagemAtrasos.toFixed(1) + "%";

    document.getElementById("msgEntrega").innerHTML =
        "<b>Resumo da operação:</b> " +
        realizadas +
        " concluídas, " +
        pendentes +
        " pendentes e " +
        atrasadas +
        " com atraso.";
}