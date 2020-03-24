import { Component, Element, Prop, getAssetPath, h } from '@stencil/core';

@Component({
	tag: 'mv-select',
	styleUrl: 'mv-select.scss',
	assetsDirs: [ 'assets' ],
	shadow: true
})
export class MvSelect {
	@Element() private element: HTMLElement;
	@Prop() options: string[];
	@Prop() type: string;

	componentDidLoad() {
		console.log('this.options -> ', this.options);
		const selected = this.element.shadowRoot.querySelector('.selected');
		const optionsContainer = this.element.shadowRoot.querySelector('.options-container');
		const optionsList = this.element.shadowRoot.querySelectorAll('.option');

		selected.addEventListener('click', () => {
			optionsContainer.classList.toggle('active');
		});

		optionsList.forEach((o) => {
			o.addEventListener('click', () => {
				selected.querySelector('p').innerHTML = o.querySelector('label').innerHTML;
				optionsContainer.classList.remove('active');
			});
		});

		if (this.type === 'buscador') {
			optionsContainer.classList.add('withSearch');
		} else {
			optionsContainer.classList.remove('withSearch');
		}
	}

	render() {
		return (
			<div>
				<div class="select-box">
					<div class="options-container">
						{this.options.map((opt) => (
							<div class="option">
								<input type="radio" class="radio" id="{opt}" name="category" />
								<label htmlFor="{opt}">{opt}</label>
							</div>
						))}
					</div>
					<div class="selected">
						<p>Seleccionar opción ...</p>
						<img src={getAssetPath(`./assets/arrow-down.svg`)} />
					</div>
					{this.type === 'buscador' ?
						<div class="search-box">
							<input type="text" placeholder="Comienza a escribir..." />
						</div>
						: ''
					}
				</div>
			</div>
		);
	}
}
