'use strict'

import { createStudentListItem } from './_mainListComponent.js'
import { setUserInfo, getUserInfo } from './_clientServer.js'
import { checkInputValue } from './_validFormComponents.js'

let clientUrl = 'http://localhost:3000/api/clients';

let formSubmit = () => {
	const form = document.querySelector('.modal__form');
	
	if(!form) return
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		let checkClintId = document.querySelector('.modal__client-id').innerText;
		if (checkClintId != '') return
		
		setUserInfo(clientUrl, getUserInfoOnForm(), createStudentListItem, deleteModalActiveClass);
		
	})
}

const getUserInfoOnForm = () => {
	let user = {};
	let contacts = document.querySelectorAll('.contact-input');
	let surnameInput = document.querySelector('.surname-input');
	let nameInput = document.querySelector('.name-input');
	let middleNameInput = document.querySelector('.middlename-input');

	user.name = nameInput.value.trim().toLowerCase();
	user.surname = surnameInput.value.trim().toLowerCase();
	user.lastName = middleNameInput.value.trim().toLowerCase();

	if(contacts) {
		user.contacts = [];
		contacts.forEach(contact => {
			let contactInfo = {};
			let property = contact.previousSibling.querySelector('.select__choose').innerText;
			contactInfo.type = property;
			contactInfo.value = contact.value.trim();
			user.contacts.push(contactInfo);
		})
	}
	return user
}

const deleteModalActiveClass = () => {
	let modal = document.querySelector('.modal');
	let formContainer = document.querySelector('.modal__container');
	const form = document.querySelector('.modal__form');
	const cancelBtn = document.querySelector('.cancel-button');
	
	modal.classList.remove('modal--on');
	formContainer.classList.remove('form--on');
	setTimeout(() => {
		form.remove()
		cancelBtn.remove()
	}, 100);
	checkInputValue()
}

// let getAddData = () => {
// 	let date = new Date();
// 	let normalDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
// 	let normalTime = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;

// 	return {
// 		normalDate,
// 		normalTime,
// 	}
// }


export { formSubmit, getUserInfoOnForm }
