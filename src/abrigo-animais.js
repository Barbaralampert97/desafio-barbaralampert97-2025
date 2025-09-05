import Animal from "./animal.js";
class AbrigoAnimais {
  constructor() {
    this.animais = [
      new Animal("Rex", "cão", ["RATO", "BOLA"]),
      new Animal("Mimi", "gato", ["BOLA", "LASER"]),
      new Animal("Fofo", "gato", ["BOLA", "RATO", "LASER"]),
      new Animal("Zero", "gato", ["RATO", "BOLA"]),
      new Animal("Bola", "cão", ["CAIXA", "NOVELO"]),
      new Animal("Bebe", "cão", ["LASER", "RATO", "BOLA"]),
      new Animal("Loco", "jabuti", ["SKATE", "RATO"]),
    ];
  }
  encontrarPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1Array = brinquedosPessoa1.split(',');
    const brinquedos2Array = brinquedosPessoa2.split(',');
    const animaisArray = ordemAnimais.split(',');

    const nomesValidos = this.animais.map(a => a.nome);
    const brinquedosValidos = this.animais.flatMap(a => a.brinquedos);

    const animaisDuplicados = new Set();
    for (let nome of animaisArray) {
      if (!nomesValidos.includes(nome) || animaisDuplicados.has(nome)) {
        return { erro: 'Animal inválido' };
      }
      animaisDuplicados.add(nome);
    }

    function verificaBrinquedos(brinquedos) {  bola, rato

      if (new Set(brinquedos).size !== brinquedos.length) return false;

      return brinquedos.every(b => brinquedosValidos.includes(b));
    }

    if (!verificaBrinquedos(brinquedos1Array) || !verificaBrinquedos(brinquedos2Array)) {
      return { erro: 'Brinquedo inválido' };
    }

    // por enquanto, todos os animais ficam no abrigo
    const resultado = animaisArray.map(nome => `${nome} - abrigo`);

    return resultado.sort();
  }
}

export { AbrigoAnimais as AbrigoAnimais };
