import { Component, Element, Prop, getAssetPath, h } from '@stencil/core';

@Component({
	tag: 'mv-select',
	styleUrl: 'mv-select.scss',
	assetsDirs: [ 'assets' ],
	shadow: true
})
export class MvSelect {
	@Element() private element: HTMLElement;
	@Prop() options: string[] = [];
	@Prop() type: string = 'default';

	componentDidLoad() {
		const selected = this.element.shadowRoot.querySelector('.selected');
		const optionsContainer = this.element.shadowRoot.querySelector('.options-container');
		const optionsList = this.element.shadowRoot.querySelectorAll('.option');
		const searchBox = this.element.shadowRoot.querySelector('.search-box input');

		selected.addEventListener('click', () => {
			optionsContainer.classList.toggle('active');

			if (this.type === 'bucador'){
				(searchBox as HTMLTextAreaElement).value = '';
			this.filterList('', optionsList);
			}
			
			if (optionsContainer.classList.contains('active') && this.type === 'buscador') {
				(searchBox as HTMLTextAreaElement).focus();
			}
		});

		optionsList.forEach((o) => {
			o.addEventListener('click', () => {
				selected.querySelector('p').innerHTML = o.querySelector('label').innerHTML;
				optionsContainer.classList.remove('active');
			});
		});

		if (this.type === 'buscador') {
			optionsContainer.classList.add('withSearch');
			searchBox.addEventListener('keyup', (event) => {
				this.filterList((event.target as HTMLTextAreaElement).value, optionsList);
			});
		} else {
			optionsContainer.classList.remove('withSearch');
		}
	}

	filterList(value, optionsList) {
		value = value.toLowerCase();
		optionsList.forEach(option => {
			let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
			if (label.indexOf(value) != -1) {
				option.style.display = 'block';
			} else {
				option.style.display = 'none';
			}
		});
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
