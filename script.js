const buscador = document.getElementById("buscador");
const limpiar = document.getElementById("limpiar");
const tarjetas = [...document.querySelectorAll(".card")];
const resultado = document.getElementById("resultado");
const sinResultados = document.getElementById("sin-resultados");

function normalizar(texto){
  return texto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"");
}

function filtrar(){
  const termino = normalizar(buscador.value.trim());
  let visibles = 0;

  tarjetas.forEach(card=>{
    const contenido = normalizar(card.dataset.search + " " + card.innerText);
    const mostrar = !termino || contenido.includes(termino);
    card.style.display = mostrar ? "" : "none";
    if(mostrar) visibles++;
  });

  if(!termino){
    resultado.textContent = "Selecciona un área o utiliza el buscador.";
  }else{
    resultado.textContent = `${visibles} área(s) encontrada(s).`;
  }

  sinResultados.hidden = visibles !== 0;
}

buscador.addEventListener("input", filtrar);

limpiar.addEventListener("click", ()=>{
  buscador.value = "";
  filtrar();
  buscador.focus();
});

filtrar();
