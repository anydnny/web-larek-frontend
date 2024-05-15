import { IShopPage } from "../../types";
import { Component } from "../base/component";
import {ensureElement} from '../../utils/utils';
import { EventEmitter } from "../base/events";

export class Page extends Component<IShopPage> {
  protected _catalog: HTMLElement;
  protected _cartCounter: HTMLElement;
  protected _basket: HTMLElement;
  protected _pageWrapper: HTMLElement;

  constructor(containter: HTMLElement, protected events: EventEmitter) {
    super(containter);
    this._catalog = ensureElement('.gallery', this.container);
    this._basket = ensureElement('.header__basket', this.container);
    this._cartCounter = ensureElement('.header__basket-counter', this.container);
    this._pageWrapper = ensureElement('.page__wrapper', this.container);

    this._basket.addEventListener('click', () => {
      this.events.emit('cart:render');
    })
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items)
  }
  set cartCounter(value: number) {
    this.setText(this._cartCounter, String(value))
  }
  set lockedWrapper(value: boolean) {
    this.toggleClass(this._pageWrapper, 'page__wrapper_locked', value)
  }
}
