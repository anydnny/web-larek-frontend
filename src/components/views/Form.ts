import { Component } from '../base/component';
import { IForm, IPaymentInfo, IUserInfo } from '../../types/index';
import { EventEmitter } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { FORM_ERRORS } from '../../utils/constants';

export class Form<T> extends Component<IForm> {
	protected _submitButton: HTMLButtonElement;
	protected _errorText: HTMLSpanElement;

	constructor(
		protected container: HTMLElement,
		protected events: EventEmitter
	) {
		super(container);
		this._submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errorText = ensureElement<HTMLSpanElement>(
			'.form__errors',
			this.container
		);
	}

	set valid(value: boolean) {
		this._submitButton.disabled = !value;
	}
	set errors(value: string[] | []) {
		if (value.length) {
			const errorMessages: string[] = [];
			value.forEach((item: string) => {
				errorMessages.push(FORM_ERRORS[item]);
				this.setText(this._errorText, errorMessages.join(', '));
			});
		} else {
			this.setText(this._errorText, '');
		}
	}

	onInputChange(form: 'userForm' | 'paymentForm') {
		this.events.emit(`${form}:change`);
	}

	render(data: Partial<T> & IForm): HTMLElement {
		Object.assign(this as object, data);
		return this.container;
	}
}

export class PaymentForm extends Form<IPaymentInfo> {
	protected _onlineButton: HTMLElement;
	protected _offlineButton: HTMLElement;
	protected _address: HTMLInputElement;
	protected _currentMethod: 'offline' | 'online' | '';

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);
		this._onlineButton = ensureElement('[name="card"]', this.container);
		this._offlineButton = ensureElement('[name="cash"]', this.container);
		this._address = ensureElement<HTMLInputElement>(
			'[name="address"]',
			this.container
		);

		this._onlineButton.addEventListener('click', () => {
			this.events.emit('paymentFormMethod:click', {
				addClass: this._onlineButton,
				removeClass: this._offlineButton,
			});
			this._currentMethod = 'online';
			this.onInputChange('paymentForm');
		});
		this._offlineButton.addEventListener('click', () => {
			this.events.emit('paymentFormMethod:click', {
				addClass: this._offlineButton,
				removeClass: this._onlineButton,
			});
			this._currentMethod = 'offline';
			this.onInputChange('paymentForm');
		});
		this._address.addEventListener('input', () => {
			this.onInputChange('paymentForm');
		});
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit('paymentForm:submit', {
				method: this.method,
				address: this.address,
			});
			this.events.emit('userForm:render');
		});
	}

	set address(value: string) {
		this._address.value = value;
	}

	get address() {
		return this._address.value;
	}

	set method(value: 'offline' | 'online' | '') {
		this._offlineButton.classList.remove('button_alt-active');
		this._onlineButton.classList.remove('button_alt-active');
		this._currentMethod = value;
	}

	get method() {
		return this._currentMethod;
	}

	checkFormValidity() {
		return { address: Boolean(this.address), method: Boolean(this.method) };
	}
}

export class UserForm extends Form<IUserInfo> {
	protected _phone: HTMLInputElement;
	protected _email: HTMLInputElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);
		this._email = ensureElement<HTMLInputElement>(
			'[name="email"]',
			this.container
		);
		this._phone = ensureElement<HTMLInputElement>(
			'[name="phone"]',
			this.container
		);

		this._email.addEventListener('input', () => {
			this.onInputChange('userForm');
		});
		this._phone.addEventListener('input', () => {
			this.onInputChange('userForm');
		});
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit('userForm:submit', {
				phone: this.phone,
				email: this.email,
			});
		});
	}

	set email(value: string) {
		this._email.value = value;
	}
	get email(): string {
		return this._email.value;
	}
	set phone(value: string) {
		this._phone.value = value;
	}
	get phone(): string {
		return this._phone.value;
	}

	checkFormValidity() {
		return { phone: Boolean(this.phone), email: Boolean(this.email) };
	}
}
