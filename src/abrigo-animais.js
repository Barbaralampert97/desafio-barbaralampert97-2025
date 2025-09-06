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
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1Array = brinquedosPessoa1.split(",");
    const brinquedos2Array = brinquedosPessoa2.split(",");
    const animaisArray = ordemAnimais.split(",");
    //#region validacoes
    const nomesValidos = this.animais.map((a) => a.nome);
    const brinquedosValidos = this.animais.flatMap((a) => a.brinquedos);

    const animaisDuplicados = new Set();
    for (let nome of animaisArray) {
      if (!nomesValidos.includes(nome) || animaisDuplicados.has(nome)) {
        if (!nomesValidos.includes(nome) || animaisDuplicados.has(nome)) {
          return {
            erro: "Animal inválido",
            lista: null,
          };
        }
      }
      animaisDuplicados.add(nome);
    }

    function verificaBrinquedos(brinquedos) {
      if (new Set(brinquedos).size !== brinquedos.length) return false;

      return brinquedos.every((b) => brinquedosValidos.includes(b));
    }

    if (
      !verificaBrinquedos(brinquedos1Array) ||
      !verificaBrinquedos(brinquedos2Array)
    ) {
      return {
        erro: "Brinquedo inválido",
        lista: null,
      };
    }
    //#endregion
    // --- Função auxiliar para verificar ordem dos brinquedos ---
    function verificaOrdem(brinquedosPessoa, brinquedosAnimal) {
      let i = 0;
      for (let brinquedo of brinquedosPessoa) {
        if (brinquedo === brinquedosAnimal[i]) i++;
        if (i === brinquedosAnimal.length) return true;
      }
      return false;
    }

    // função para remover brinquedos usados da pessoa
    function removeBrinquedosUsados(brinquedosPessoa, brinquedosAnimal) {
      let i = 0;
      for (let j = 0; j < brinquedosPessoa.length; j++) {
        if (brinquedosPessoa[j] === brinquedosAnimal[i]) {
          i++;
          brinquedosPessoa[j] = null; // marca como usado
          if (i === brinquedosAnimal.length) break;
        }
      }
      return brinquedosPessoa.filter((b) => b !== null);
    }
    const resultado = [];
    let brinquedosPessoa1Disponiveis = [...brinquedos1Array];
    let brinquedosPessoa2Disponiveis = [...brinquedos2Array];
    let contagemPessoa1 = 0;
    let contagemPessoa2 = 0;

    // loop pelos animais na ordem fornecida
    for (let nome of animaisArray) {
      const animal = this.animais.find((a) => a.nome === nome);
      if (animal.nome === "Loco") {
        const pessoa1Tem = animal.brinquedos.every((b) =>
          brinquedosPessoa1Disponiveis.includes(b)
        );
        const pessoa2Tem = animal.brinquedos.every((b) =>
          brinquedosPessoa2Disponiveis.includes(b)
        );
        const pessoa1Adotou = resultado.some((r) => r.includes("pessoa 1"));
        const pessoa2Adotou = resultado.some((r) => r.includes("pessoa 2"));
        const temCompanhia = pessoa1Adotou || pessoa2Adotou;

        if (!temCompanhia || (!pessoa1Tem && !pessoa2Tem)) {
          resultado.push(`${nome} - abrigo`);
          continue;
        }

        if (pessoa1Tem && pessoa1Adotou && contagemPessoa1 < 3) {
          resultado.push(`${nome} - pessoa 1`);
          contagemPessoa1++;
        } else if (pessoa2Tem && pessoa2AdotoucontagemPessoa2 < 3) {
          resultado.push(`${nome} - pessoa 2`);
          contagemPessoa2++;
        } else {
          resultado.push(`${nome} - abrigo`);
        }

        continue;
      }
      // verifica quem consegue adotar o animal baseado nos brinquedos ainda disponíveis
      var pessoa1Ganha = verificaOrdem(
        brinquedosPessoa1Disponiveis,
        animal.brinquedos
      );
      var pessoa2Ganha = verificaOrdem(
        brinquedosPessoa2Disponiveis,
        animal.brinquedos
      );
      contagemPessoa1 >= 3 ? (pessoa1Ganha = false) : pessoa1Ganha;
      contagemPessoa2 >= 3 ? (pessoa2Ganha = false) : pessoa2Ganha;
      if (pessoa1Ganha && !pessoa2Ganha) {
        resultado.push(`${nome} - pessoa 1`);
        contagemPessoa1++;
        if (animal.especie === "gato") {
          brinquedosPessoa1Disponiveis = removeBrinquedosUsados(
            brinquedosPessoa1Disponiveis,
            animal.brinquedos
          );
        }
      } else if (!pessoa1Ganha && pessoa2Ganha) {
        resultado.push(`${nome} - pessoa 2`);
        contagemPessoa2++;
        if (animal.especie === "gato") {
          brinquedosPessoa2Disponiveis = removeBrinquedosUsados(
            brinquedosPessoa2Disponiveis,
            animal.brinquedos
          );
        }
      } else if (pessoa1Ganha && pessoa2Ganha) {
        // empate -> animal fica no abrigo
        resultado.push(`${nome} - abrigo`);
      } else {
        // ninguém consegue -> animal fica no abrigo
        resultado.push(`${nome} - abrigo`);
      }
    }
    return {
      erro: null,
      lista: resultado.sort(),
    };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
