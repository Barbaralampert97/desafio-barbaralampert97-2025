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
    //#region validacoes
    const nomesValidos = this.animais.map(a => a.nome);
    const brinquedosValidos = this.animais.flatMap(a => a.brinquedos);

    const animaisDuplicados = new Set();
    for (let nome of animaisArray) {
      if (!nomesValidos.includes(nome) || animaisDuplicados.has(nome)) {
        return { erro: 'Animal inválido' };
      }
      animaisDuplicados.add(nome);
    }

    function verificaBrinquedos(brinquedos) {  

      if (new Set(brinquedos).size !== brinquedos.length) return false;

      return brinquedos.every(b => brinquedosValidos.includes(b));
    }

    if (!verificaBrinquedos(brinquedos1Array) || !verificaBrinquedos(brinquedos2Array)) {
      return { erro: 'Brinquedo inválido' };
    }
    //#endregion
    // por enquanto, todos os animais ficam no abrigo
    // --- Função auxiliar para verificar ordem dos brinquedos ---
    function verificaOrdem(brinquedosPessoa, brinquedosAnimal) {
      let i = 0;
      for (let brinquedo of brinquedosPessoa) {
        if (brinquedo === brinquedosAnimal[i]) i++;
        if (i === brinquedosAnimal.length) return true;
      }
      return false;
    }
    const resultado = [];

    for (let nome of animaisArray) {
      const animal = this.animais.find(a => a.nome === nome);

      const pessoa1Ganha = verificaOrdem(brinquedos1Array, animal.brinquedos);
      const pessoa2Ganha = verificaOrdem(brinquedos2Array, animal.brinquedos);

      if (pessoa1Ganha && !pessoa2Ganha) {
        resultado.push(`${nome} - pessoa 1`);
      } else if (!pessoa1Ganha && pessoa2Ganha) {
        resultado.push(`${nome} - pessoa 2`);
      } else {
        resultado.push(`${nome} - abrigo`);
      }
    }


    return resultado.sort();
  }
}

export { AbrigoAnimais as AbrigoAnimais };
