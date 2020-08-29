// responsive navigation handler
const navigation = document.querySelector('.navigation')

document
.querySelector('.icon.hamburger')
.addEventListener('click', () => {
	navigation.classList.replace('collapsed', 'expanded')
})

document
.addEventListener('click', event => {
	if (!event.target.classList.contains('hamburger')) {
		navigation
		.classList
		.replace('expanded', 'collapsed')
	}
}, )


// FORMS AND SUBMIT HANDLERS
// Sign up form
document.querySelector('.sign-up form').onsubmit = event => {
	event.preventDefault()
}
