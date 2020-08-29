// Carousel


// Client feedbacks slider
const sliderContainer = document.querySelector('.feedback-container')
const sliderButtons = [...sliderContainer.getElementsByClassName('button')]
const sliderBars = sliderContainer.lastElementChild
const allFeedbacks = sliderContainer.querySelector('.all-feedbacks').children

sliderButtons.forEach(button => {
	button.addEventListener('click', ({currentTarget}) => {
		let direction = currentTarget.className.match(/left|right/gi).pop()
		switchFeedback(direction)
	})
})


function switchFeedback(direction) {
	const currentFeedback = sliderContainer.querySelector('.mention')
	const activeBar = sliderBars.querySelector('.active')
	// xdr means exit direction (for element transition)
	// ndr means entry direction (for element transition)
	let [index, xdr, ndr, feedbackSibling, barSibling] = [+currentFeedback.id.split('-').pop()];
	const feedback = allFeedbacks[index];
	[xdr, ndr, feedbackSibling, barSibling] = {
		'left': [
			'ctr',
			'ltc',
			feedback.previousElementSibling,
			activeBar.previousElementSibling
		],
		'right': [
			'ctl',
			'rtc',
			feedback.nextElementSibling,
			activeBar.nextElementSibling
		]
	}[direction]
	// transition new feedback (feedbackToShow)'s entry ...
	if (feedbackSibling) {
		activeBar.classList.remove('active');
		barSibling.classList.add('active')
		const feedbackToShow = feedbackSibling.cloneNode(true);
		let {id} = feedbackToShow
		feedbackToShow.id = `m-${id.split('-').pop()}`;
		['mention', 'is-entering-'+ndr].forEach(cls => feedbackToShow.classList.add(cls));
		// and current feedback's exit
		currentFeedback.classList.add('is-leaving-'+xdr)
		currentFeedback.ontransitionend = currentFeedback.oonwebkittransitionend = (event) => {
			if (event.propertyName === 'opacity') {
				const {parentNode} = event.target
				parentNode.replaceChild(feedbackToShow, event.target)
				const entryAnimationDuration = window
					.getComputedStyle(feedbackToShow)
					.getPropertyValue('animation-duration')
				setTimeout(
					() => feedbackToShow.classList.remove('is-entering-'+ndr),
					parseFloat(entryAnimationDuration) * 1e3
				)
			}
		}
	}
}
