'use strict'

import { deleteContactBtnVisible } from './_eventListeners.js'

let addContactBtnEvent = () => {

	const modalContainer = document.querySelector('.modal__button-container')

	modalContainer.addEventListener('click', (event) => {
		event.preventDefault();
		const addBtn = event.target.closest('.add-button');
		const deleteContact = event.target.closest('.contact-delete')

		if(addBtn) {
			let contactContainer = document.querySelector('.modal__contact-container');
			let contactsCount = document.querySelectorAll('.modal__contact-form');

			if (contactsCount.length < 10) {
				createContactElem();
				selectChange();
				if (contactsCount.length > 2) {	
					contactContainer.style.overflow = 'auto';
					let allSelects = document.querySelectorAll('.select__body');
					allSelects.forEach((body, i) => {
						if (i < 3) return
						body.style.transformOrigin = 'bottom left';
						body.style.WebkitTransformOrigin = 'bottom left';
						body.style.bottom = 37 + 'px';
						body.style.borderBottom = 'none';
						body.style.borderTop = '1px solid #C8C5D1'
					})
				}
				if(contactsCount.length === 9) addBtn.style.display = 'none';
			}
			deleteContactBtnVisible()
		}
		
		if(deleteContact) {
			const addContactElem = document.querySelector('.add-button')
			const contact = deleteContact.parentElement
			contact.remove();
			if(addContactElem.style.display === 'none') addContactElem.style.display = 'block';
		}

	})
}

let createContactElem =  (type , inputValue = '') => {
	let container = document.querySelector('.modal__contact-container');
	let select = createSelect(type);

	let contactForm = document.createElement('div');
	contactForm.classList.add('modal__contact-form');

	let input = document.createElement('input');
	input.classList.add('contact-input');
	input.value = inputValue;
	input.setAttribute('type', 'tel')
	input.placeholder = 'Введите номер телефона'
	phoneInputMask(input)

	let deleteBtn = document.createElement('button');
	deleteBtn.classList.add('contact-delete');
	deleteBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>`;

	contactForm.append(select, input, deleteBtn);
	container.append(contactForm);

	return {
		contactForm,
		input,
		deleteBtn,
	}
}

let createSelect = (type = 'Телефон') => {

	let selectContainer = document.createElement('div');
	selectContainer.classList.add('select__container');

	let selectHeader = document.createElement('div');
	selectHeader.classList.add('select__header');

	let selectChoose = document.createElement('div');
	selectChoose.classList.add('select__choose');

	let selectIcon = document.createElement('span');
	selectIcon.classList.add('select__icon');
	selectIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_121:1079)"><path d="M1.495 3.69003C1.25 3.93503 1.25 4.33003 1.495 4.57503L5.65 8.73003C5.845 8.92503 6.16 8.92503 6.355 8.73003L10.51 4.57503C10.755 4.33003 10.755 3.93503 10.51 3.69003C10.265 3.44503 9.87 3.44503 9.625 3.69003L6 7.31003L2.375 3.68503C2.135 3.44503 1.735 3.44503 1.495 3.69003Z" fill="#9873FF"/></g><defs><clipPath id="clip0_121:1079"><rect width="12" height="12" fill="white" transform="translate(0 12) rotate(-90)"/></clipPath></defs></svg>`

	selectHeader.append(selectChoose, selectIcon)


	let selectBody = document.createElement('div');
	selectBody.classList.add('select__body');

	let [
		vk,
		facebook,
		email,
		phone,
		any,
	] = Array(5).fill().map(() => document.createElement('div'));

	vk.textContent = 'ВКонтакте';
	vk.classList.add('select__item');
	vk.setAttribute('tabindex', '0')
	selectChoose.textContent = type;

	facebook.textContent = 'Facebook';
	facebook.classList.add('select__item');
	facebook.setAttribute('tabindex', '0')

	email.textContent = 'Почта';
	email.classList.add('select__item');
	email.setAttribute('tabindex', '0')

	phone.textContent = 'Телефон';
	phone.classList.add('select__item');
	phone.setAttribute('tabindex', '0')

	any.textContent = 'Другое';
	any.classList.add('select__item');
	any.setAttribute('tabindex', '0')

	selectBody.append(vk, facebook, email, phone, any);
	selectContainer.append(selectHeader, selectBody)

	return selectContainer
}

let selectChange = () => {
	let selects = document.querySelectorAll('.select__header');
	if(!selects) return

	let modalContainer = document.querySelector('.modal__container')

	modalContainer.addEventListener('click', (event) => {
		let selectHeader = event.target.closest('.select__header')
		let allSelects = document.querySelectorAll('.select__header')
		let activeClass = 'select__body--on';
		
		allSelects.forEach(select => {
			let selectContainer = select.parentElement
			if(selectContainer.classList.contains(activeClass)) {
			if (selectHeader) return
				selectContainer.classList.remove(activeClass);
			}
		})
	})
	
	selects.forEach(select => {
		select.addEventListener('click', function () {
			let activeClass = 'select__body--on';
			let allSelectsBody = document.querySelectorAll('.select__container');
			let selectBody = this.parentElement;
			let selectItems = document.querySelectorAll('.select__item');
			selectItems.forEach(item => {
				let selectChoose = item.parentElement.previousSibling.querySelector('.select__choose');
				item.addEventListener('click', () => {
					selectChoose.textContent = item.innerText;
					selectBody.classList.remove(activeClass)
					changeInputType(selectChoose.parentElement)
				})
			})


			allSelectsBody.forEach(item => {
				if (item.classList.contains(activeClass)) {
					item.classList.remove(activeClass);
				}
			})

			selectBody.classList.add(activeClass);
		})
	
	})

}

let changeInputType = (inputName) => {
	let inputParent = inputName.parentElement;
	let input = inputParent.nextSibling
	if(inputName.innerText === 'Телефон') {
		input.type = 'tel';
		input.placeholder = 'Введите номер телефона'
	} else if(inputName.innerText === 'Почта') {
		input.type = 'email';
		input.placeholder = 'Введите почту'
		input.pattern = `[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}\S$`
	} else {
		input.type = 'text';
		input.placeholder = 'Введите значение'
	}
}

const phoneInputMask = input => {
	
	const onPhoneInput = (event) => {
		if(input.type !== 'tel') return
		let inputNumbersValue = input.value.replace(/\D/g, ''),
		    formatedInputValue = '',
				selectionStart = input.selectionStart;

		if(!inputNumbersValue) return input.value = '';

		if(input.value.length > selectionStart) {
			if(event.data && /\D/g.test(event.data)) {
				input.value = inputNumbersValue
				console.log(inputNumbersValue)
			}
			return
		}


		if(inputNumbersValue[0] === '7' ||
			 inputNumbersValue[0] === '8' ||
			 inputNumbersValue[0] === '9') {
			// Russian number
			if(inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
			let firstSymbol = (inputNumbersValue[0] == '8') ? '8' : '+7'
			formatedInputValue = firstSymbol;

			if(inputNumbersValue.length > 1) {
				formatedInputValue += ' (' + inputNumbersValue.substring(1, 4);
			}
			if(inputNumbersValue.length >= 5) {
				formatedInputValue += ') ' + inputNumbersValue.substring(4, 7)
			}
			if(inputNumbersValue.length >= 8) {
				formatedInputValue += '-' + inputNumbersValue.substring(7, 9)
			}
			if(inputNumbersValue.length >= 10) {
				formatedInputValue += '-' + inputNumbersValue.substring(9, 11)
			}
		} else {
			// Not Russian number
			formatedInputValue = '+' + inputNumbersValue.substring(0, 15)
		}

		input.value = formatedInputValue;
		
	}

	const onKeydown = (event) => {
		event.preventDefault()
		let keycode = event.keyCode;
		if(keycode === 8 && input.value.length === 1) {
			input.value = '';
		}
	}

	const onPasteInput = event => {
		let pasted = event.clipboardData || window.clipboardData,
				inputNumbersValue = input.value.replace(/\D/g, '');

		if(pasted) {
			let passedText = pasted.getData('text');
			if(/\D/g.test(passedText)) {
				input.value = inputNumbersValue
			}
		}
	}

	input.addEventListener('input', onPhoneInput)
	input.addEventListener('input', onKeydown)
	input.addEventListener('paste', onPasteInput)
	
}

const cancelAddAndChangeForm = (container, closeFormFc) => {
	const cancelBtn = container.querySelector('.cancel-button')
	cancelBtn.addEventListener('click', () => {
		let titleForm = document.querySelector('.modal__title');
		let idOnForm = document.querySelector('.modal__client-id')
		const addAndChangeContainer = document.querySelector('.modal__form');
		const cancelFormBtn = document.querySelector('.cancel-button')
		addAndChangeContainer.remove()
		cancelFormBtn.remove()
		titleForm.textContent = 'Новый клиент';
		idOnForm.textContent = '';
	})
}


export { addContactBtnEvent, createContactElem, selectChange, cancelAddAndChangeForm }

