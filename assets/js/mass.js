const slideshow = document.querySelector('.slideshow')
const [clickHandler, gallery] = [slideshow.querySelector('#sgich'), slideshow.lastElementChild];
[...slideshow.querySelector('.slideshow-buttons').children].forEach(btn => {
	btn.addEventListener('click', ({target}) => {
		const direction = target.className.match(/right|left/gi).pop()
		displayImage(direction)
	})
})


gallery.addEventListener('click', function (event) {
	const {target} = event
	// scroll to selected image and set active
	if (target.localName === 'img') {
		// console.log(target.offsetLeft - gallery.offsetLeft)
		// const scrollX = target.offsetLeft - gallery.offsetLeft
		// gallery.scrollIntoView(target)
		displayImage(target)
		// clickHandler.href = `#${target.id}`
		// clickHandler.click()
	}
})

function displayImage(direction, target=undefined) {
	const active = gallery.querySelector('.active')
	if (!target) {
		target =  direction === 'left' ?
		active.previousElementSibling :
		active.nextElementSibling
	}
	// set image as active
	if (target) {
		// animate the main image out,
		const mainImage = slideshow.querySelector('.active-slideshow-image img')
		mainImage.classList.add('is-changing')
		// change the image's src,
		mainImage.ontransitionend = onwebkittransitionend = event => {
			// console.log(mainImage.src, target.src)
			mainImage.src = target.src
			// then animate the image back in
			mainImage.classList.remove('is-changing')
		}
		active.classList.remove('active')
		target.scrollIntoViewIfNeeded(true)
		target.classList.add('active')
	}
}
