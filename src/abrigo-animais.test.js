import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });
test('Deve rejeitar brinquedo inválido', () => {
  // Pessoa 1 usa brinquedo inexistente "BAMBOLÊ"
  const resultado = new AbrigoAnimais().encontraPessoas(
    'BAMBOLÊ,RATO', 'RATO,BOLA', 'Rex'
  );

  expect(resultado.erro).toBe('Brinquedo inválido');
  expect(resultado.lista).toBeFalsy();
});
  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA', 'RATO,BOLA', 'Rex,Rex'
  );

  expect(resultado.erro).toBe('Animal inválido');
  expect(resultado.lista).toBeFalsy();
});
test('Pessoa 2 deve adotar Rex', () => {
  // Rex gosta de RATO, BOLA
  // Pessoa 2 tem exatamente nessa ordem
  const resultado = new AbrigoAnimais().encontraPessoas(
    'BOLA,LASER', 'RATO,BOLA', 'Rex'
  );

  expect(resultado.lista[0]).toBe('Rex - pessoa 2');
  expect(resultado.lista.length).toBe(1);
  expect(resultado.erro).toBeFalsy();
});
test('Loco deve ser adotado sem ordem se houver companhia', () => {
  // Loco gosta de SKATE e RATO, mas não exige ordem
  // Rex também pode ser adotado
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA,SKATE', 'RATO', 'Rex,Loco'
  );

  expect(resultado.lista.includes('Rex - pessoa 1')).toBe(true);
  expect(resultado.lista.includes('Loco - pessoa 1')).toBe(true);
  expect(resultado.erro).toBeFalsy();
});


});
