require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts é uma função?', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  })
  
  it('A função fetchProducts recebe o argumento computador e teste se fetch foi chamada' , async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })
  it('Ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    const filter = 'computador'
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${filter}`;
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url)
  })
  it('O retorno da função fetchProducts é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('Ao chamar a função fetchProducts sem argumento, retorna a mensagem: You must provide an url', async () => {
    try {
      expect.assertions(1);
      await fetchProducts();
    } catch (erro) {
      expect(erro).toEqual(new Error('You must provide an url'))
    }
  })
});
