import { Component, Element, Prop, Watch, getAssetPath, h } from '@stencil/core';

@Component({
	tag: 'mv-select',
	styleUrl: 'mv-select.scss',
	assetsDirs: [ 'assets' ],
	shadow: true
})
export class MvSelect {
	@Element() private element: HTMLElement;
	@Prop() options: string;
	@Prop() type: string;

	// @Watch('options')
	// dataDidChangeHandler(newValue: boolean) {
	// 	this.innerData = JSON.parse(newValue);
	// }

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
				selected.innerHTML = o.querySelector('label').innerHTML;
				optionsContainer.classList.remove('active');
			});
		});
	}

	render() {
		return (
			<div>
				<div class="container">
					<h2>Video Category</h2>
					<div class="select-box">
						<div class="options-container">
							<div class="option">
								<input type="radio" class="radio" id="automobiles" name="category" />
								<label htmlFor="automobiles">Automobiles</label>
							</div>
							<div class="option">
								<input type="radio" class="radio" id="films" name="category" />
								<label htmlFor="films">Films</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="science" name="category" />
								<label htmlFor="science">Science & Technology</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="arts" name="category" />
								<label htmlFor="arts">Arts</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="music" name="category" />
								<label htmlFor="music">Music</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="sports" name="category" />
								<label htmlFor="sports">Sports</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="travels" name="category" />
								<label htmlFor="travels">Travels</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="maths" name="category" />
								<label htmlFor="maths">Maths</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="games" name="category" />
								<label htmlFor="games">Games</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="electronics" name="category" />
								<label htmlFor="electronics">Electronics</label>
							</div>

							<div class="option">
								<input type="radio" class="radio" id="social" name="category" />
								<label htmlFor="social">Social networks</label>
							</div>
						</div>
						<div class="selected">
							Select Video Category
							<img src={getAssetPath(`./assets/arrow-down.svg`)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
