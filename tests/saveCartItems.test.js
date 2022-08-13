const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', async () => {
    expect.assertions(1);
    await saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  })

  it('ao executar saveCartItems com <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, cartItems e o o valor passado como argumento para saveCartItems', async () => {
    expect.assertions(1);
    const value = '<ol><li>Item</li></ol>'
    await saveCartItems(value);
    expect(localStorage.setItem).toBeCalledWith('cartItems', value)
  })
});
