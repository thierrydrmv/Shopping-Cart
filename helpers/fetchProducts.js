const fetchProducts = async (param) => {
  if (!param) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
