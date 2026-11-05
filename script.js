const campoPotencia = document.getElementById("potencia");
const campoHoras = document.getElementById("horas");
const campoDias = document.getElementById("dias");
const campoTarifa = document.getElementById("tarifa");
const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");
const botaoLimpar = document.getElementById("limpar");

function mostrarErro(mensagem) {
  resultado.textContent = mensagem;
  resultado.classList.add("erro");
}

function calcular() {
  botaoLimpar.addEventListener("click", () => {
    campoPotencia.value = "";
    campoHoras.value = "";
    campoDias.value = "";
    campoTarifa.value = "";
    resultado.textContent = "";
    resultado.classList.remove("erro");
    campoPotencia.focus();
  });
  const potencia = Number(campoPotencia.value);
  const horas = Number(campoHoras.value);
  const dias = Number(campoDias.value);
  const tarifa = Number(campoTarifa.value);
  const consumo = (potencia / 1000) * horas * dias;
  const custo = consumo * tarifa;
  const custoFormatado = custo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  if (potencia <= 0 || horas <= 0 || dias <= 0 || tarifa <= 0) {
    mostrarErro("Preencha todos os campos com valores maiores que zero.");
    return;
  }
  if (horas > 24 || dias > 31) {
    mostrarErro("Use no máximo 24 horas por dia e 31 dias no mês.");
    return;
  }
  const consumoFormatado = consumo.toFixed(2).replace(".", ",");
  resultado.classList.remove("erro");
  resultado.textContent = `Consumo de ${consumoFormatado} kWh por mês, custando ${custoFormatado}.`;
}
botao.addEventListener("click", calcular);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    calcular();
  }
});
