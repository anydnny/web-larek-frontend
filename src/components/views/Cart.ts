import { ICart, ICartProduct } from "../../types";
import {Product} from "./Product";
import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/component";
import { EventEmitter } from "../base/events";

export class ProductCart extends Product<ICartProduct> {
  protected _deleteButton: HTMLElement;
  protected _index: HTMLElement

  constructor(container: HTMLElement, events?:{onClick: (event: MouseEvent) => void}) {
    super(container);
      this._deleteButton = ensureElement('.basket__item-delete', container);
      this._index = ensureElement('.basket__item-index', container);
      this._deleteButton.addEventListener('click', events.onClick)
  }
  set index(value: number) {
		this.setText(this._index, value);
	}
}

export class Cart extends Component<ICart> {
  protected _productsList: HTMLElement;
  protected _totalPrice: HTMLElement;
  protected _orderButton: HTMLElement;
  protected _events: EventEmitter;

  constructor(container: HTMLElement, events: EventEmitter) {
    super(container);
    this._productsList = ensureElement('.basket__list', container)
    this._totalPrice = ensureElement('.basket__price', container)
    this._orderButton = ensureElement('.button', container);

  }

  set products(products: HTMLElement[]) {
    if(products.length) {
      this._productsList.replaceChildren(...products);
      this.setDisabled(this._orderButton, false)
    } else {
      this._productsList.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: "Пусто, добавьте товар в корзину",
      }))
      this.setDisabled(this._orderButton, true)
    }
  }

  set totalPrice(total:number) {
    this.setText(this._totalPrice, `${total} синапсов`)
  }
}
