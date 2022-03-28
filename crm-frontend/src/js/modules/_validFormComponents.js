'use strict'

let checkInputValue = () => {
	let allFormInputs = document.querySelectorAll('.modal__input');

	allFormInputs.forEach(input => {
		let inputDesc = input.nextSibling
		inputCheck(input, inputDesc, 'label-desc--on')
		input.addEventListener('input', () => {
			inputCheck(input, inputDesc, 'label-desc--on')
		})
	})
}

const inputCheck = (input, label, activeClass) => {
	if (input.value != '') {
		label.classList.add(activeClass)
	} else {
		label.classList.remove(activeClass)
	}
}

// const checkModalForm = () => {
// 	let modal = document.querySelector('.modal');

// 	let formTitle	= document.querySelector('.modal__title');
// 	let formId = document.querySelector('.modal__client-id');
// 	let formSurname = document.querySelector('.surname-input');
// 	let formName = document.querySelector('.name-input');
// 	let lastname = document.querySelector('.middlename-input');

// 	let formContacts = document.querySelectorAll('.modal__contact-form');

// 	if (!modal.classList.contains('modal--on')) {
// 		formTitle.textContent = 'Новый клиент';
// 		formId.textContent = '';
// 		formSurname.value = '';
// 		formName.value = '';
// 		lastname.value = '';
// 	}

// 	formContacts.forEach(contact => {
// 		contact.remove();
// 	})

// }

export { checkInputValue }
