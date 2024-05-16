import { Component } from '../base/component';
import { ICompleteOrder } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CompleteOrder extends Component<ICompleteOrder> {
	protected _exitButton: HTMLElement;
	protected _total: HTMLElement;

	constructor(
		container: HTMLElement,
		events: { onClick: (event: MouseEvent) => void }
	) {
		super(container);
		this._exitButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
		this._total = ensureElement<HTMLSpanElement>(
			'.order-success__description',
			container
		);

		this._exitButton.addEventListener('click', events.onClick);
	}

	set total(value: number) {
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}
