import './scss/styles.scss';
import {LarekApi} from './components/views/LarekApi';
import {EventEmitter} from './components/base/events';
import {Page} from './components/views/Page';
import { ensureElement, cloneTemplate, createElement } from './utils/utils';
import {Product} from './components/views/Product'
import { IProduct } from './types';
import {AppData} from './components/views/AppData';
import {Modal} from './components/views/Modal';
import {Cart, ProductCart} from './components/views/Cart';

const productStoreTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const productOpenedTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');

const events = new EventEmitter();
const api = new LarekApi('https://larek-api.nomoreparties.co/api/weblarek');
const page = new Page(document.body, events);
const appData = new AppData(events);
const modal = new Modal(document.querySelector("#modal-container"), events);
const cart = new Cart(cloneTemplate(cartTemplate), events);



events.on('store:init', (store: IProduct[]) => {
  page.catalog = store.map((item) => {
    const card = new Product(cloneTemplate(productStoreTemplate), {onClick: () => {events.emit('product:click', item)}});
    return card.render({
      id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
    })
  })
})

events.on('product:click', (item: IProduct) => {
  appData.setSelectedProduct(item);
})

events.on('product:open', (item: IProduct) => {
  const inCart = appData.checkItemInCart(item)
  if(item) {
    const card = new Product(cloneTemplate(productOpenedTemplate), {onClick: () => {
      if(inCart) {
        events.emit('cart:remove', item);
        modal.close()
      } else {
        events.emit('cart:add', item)
      }
    },});
    modal.render({
      view: card.render({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category,
        description: item.description,
        inCart: inCart
      })
    })
  }
  else {
    modal.close()
  }
})

events.on('modal:open', () => {
  page.lockedWrapper = true
})
events.on('modal:close', () => {
  page.lockedWrapper = false
})
events.on('cart:render', () => {
  modal.render({
    view: createElement<HTMLElement>('div', {}, [
      cart.render({
        products: appData.order.products.map((item, index) => {
          const product = new ProductCart(cloneTemplate(productCartTemplate), {
            onClick: () => {
              console.log(appData.order.products)
              events.emit('cart:remove', item);
              events.emit('cart:render')
            }
          })
          return product.render({
            id: item.id,
            index: index + 1,
            title: item.title,
						price: item.price
          })
        }),
        totalPrice: appData.getTotalPrice()
      }
    )
    ])
  })
})

events.on('cart:add', (product: IProduct) => {
  appData.addToCart(product);
  events.emit('counter:update')
  modal.close()
})
events.on('cart:remove', (product: IProduct) => {
  appData.removeFromCart(product);
  events.emit('counter:update')
})
events.on('counter:update', () => {
  page.cartCounter = appData.order.products.length
})

api.getCatalog().then(catalog => appData.setCatalog(catalog))

