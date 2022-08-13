require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', async () => {
  it('fetchItem é uma função?', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  })
  
  it('A função fetchItem recebe o argumento MLB1615760527 e teste se fetch foi chamada' , async () => {
    expect.assertions(1);
    fetchItem("MLB1615760527");
    expect(fetch).toBeCalled();
  })
  it('Ao chamar a função fetchItem com o argumento MLB1615760527, a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    const filter = 'MLB1615760527'
    const url = `https://api.mercadolibre.com/items/${filter}`;
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url)
  })
  it('O retorno da função fetchItem é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('Ao chamar a função fetchItem sem argumento, retorna a mensagem: You must provide an url', async () => {
    try {
      expect.assertions(1);
      await fetchItem();
    } catch (erro) {
      expect(erro).toEqual(new Error('You must provide an url'))
    }
  })
});
