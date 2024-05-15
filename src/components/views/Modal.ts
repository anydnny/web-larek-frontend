import {IModal} from "../../types/index";
import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Modal extends Component<IModal> {
  protected _view: HTMLElement;
  protected _closeButton: HTMLElement

  constructor(container: HTMLElement, protected events:IEvents) {
    super(container);
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._view = ensureElement<HTMLElement>('.modal__content', container);

    this.container.addEventListener('click', this.close.bind(this))
    this._closeButton.addEventListener('click', this.close.bind(this))
    this._view.addEventListener('click', (e) => e.stopPropagation());
  }

  set view(data: HTMLElement) {
		this._view.replaceChildren(data);
	}

  open() {
    this.events.emit('modal:open');
    this.container.classList.add('modal_active');
  }
  close() {
    this.events.emit('modal:close');
    this.container.classList.remove('modal_active');
  }

  render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
