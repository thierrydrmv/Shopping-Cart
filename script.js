const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const loading = () => {
  const wait = document.createElement('h1');
  wait.className = 'loading';
  wait.innerText = 'carregando...';
  cart.appendChild(wait);
};

const createFetchProducts = async () => {
  loading();
  const father = document.querySelector('.items');
  const dados = await fetchProducts('computador');
  const { results } = dados;
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const product = createProductItemElement({ sku, name, image });
    father.appendChild(product);
  });
};

const showInScreen = () => {
  const section = document.querySelector('.cart');
  const value = document.createElement('p');
  value.className = 'total-price';
  value.style.fontSize = '30px';
  value.style.marginTop = '20px';
  section.append(value);
};

const total = () => {
  const valor = document.querySelector('.total-price');
  const valores = Object.values(cart.children);
    const sum = valores
    .reduce((acc, curr) => acc + parseFloat(curr.innerHTML.split('$')[1]), 0);
    valor.innerText = sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const cartItemClickListener = (event) => {
  event.target.remove();
  total();
  saveCartItems(cart.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = () => {
  const itemAdd = document.querySelectorAll('.item__add');
  itemAdd.forEach((element) => element.addEventListener('click', async () => {
    const identifier = getSkuFromProductItem(element.parentElement);
    const product = await fetchItem(identifier);
    const { id: sku, title: name, price: salePrice } = product;
    const addToCart = createCartItemElement({ sku, name, salePrice });
    cart.appendChild(addToCart);
    saveCartItems(cart.innerHTML);
    total();
  }));
};
const bntClear = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    cart.innerHTML = '';
    saveCartItems(cart.innerHTML);
    total();
  });
};
window.onload = async () => { 
  await createFetchProducts(); addItemToCart(); bntClear(); getSavedCartItems(); showInScreen();
  total();
  const list = document.querySelectorAll('.cart__item');
  list.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
  };
