import { IProduct } from '../../types';
import { Component } from '../base/component';
import { ensureElement } from '../../utils/utils';
import {
	ITEM_CURRENCY,
	ITEM_NOCURRENCY,
	ITEM_CATEGORY,
} from '../../utils/constants';
import { CDN_URL } from '../../utils/constants';

export class Product<T extends IProduct | object> extends Component<
	T | IProduct
> {
	protected _id: string;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _image?: HTMLElement;
	protected _description?: HTMLElement;
	protected _category?: HTMLElement;
	protected _productButton?: HTMLElement;

	constructor(
		container: HTMLElement,
		events?: { onClick: (event: MouseEvent) => void }
	) {
		super(container);
		this._title = ensureElement('.card__title', container);
		this._price = ensureElement('.card__price', container);
		this._description = container.querySelector('.card__text');
		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image');
		this._productButton = container.querySelector('.card__button');

		if (events && this._productButton) {
			this._productButton.addEventListener('click', events.onClick);
		} else if (events && !this._productButton) {
			this.container.addEventListener('click', events.onClick);
		}
	}

	set id(value: string) {
		this._id = value;
	}
	get id() {
		return this._id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	get title() {
		return this._title.textContent || '';
	}
	set image(value: string) {
		this._image?.setAttribute('src', `${CDN_URL}${value}`);
	}
	set description(value: string) {
		if (this._description) {
			this.setText(this._description, value);
		}
	}
	set price(value: number) {
		if (value) {
			this.setText(this._price, `${value} ${ITEM_CURRENCY}`);
		} else {
			this.setText(this._price, `${ITEM_NOCURRENCY}`);
			this.setDisabled(this._productButton, true);
		}
	}
	set category(value: string) {
		if (this._category) {
			this.setText(this._category, value);
			this.toggleClass(
				this._category,
				`card__category_${ITEM_CATEGORY[value]}`,
				true
			);
		}
	}

	set inCart(value: boolean) {
		if (value) {
			this.setText(this._productButton, 'Убрать');
		} else {
			this.setText(this._productButton, 'В корзину');
		}
	}
}
