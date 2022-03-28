'use strict'

import { checkInputValue } from './_validFormComponents.js'
import { deleteUserInfo, getClientInfo, changeClientInfo } from './_clientServer.js'
import { createContactElem, selectChange, addContactBtnEvent, cancelAddAndChangeForm } from './_formComponent.js'
import { getUserInfoOnForm, formSubmit } from './_form.js'
import { contactsTooltip, createContactsIcons } from './_mainListComponent.js'
import { createModalDelete, createModalForm } from './_modal.js'

let clientUrl = 'http://localhost:3000/api/clients';

const openAddForm = () => {
	let openBtn = document.querySelector('.main__add-button');

	openBtn.addEventListener('click', () => {
		const form = document.querySelector('.modal__container')
		createModalForm()
		setTimeout(activatedAddForm, 100)
		addContactBtnEvent()
		checkInputValue()
		formSubmit()
	})
}

// const openChangeForm = () => {
// 	let changeBtns = document.querySelectorAll('.main__list-change');

// 	changeBtns.forEach(btn => {
// 		btn.addEventListener('click' , changeModalForm)
// 	})
// }

function changeModalForm(clientElem) {

	let form = document.querySelector('.modal__form')
	let cancelBtn = document.querySelector('.cancel-button')
	let fullId = clientElem.dataset.id;
	let titleForm = document.querySelector('.modal__title');
	let idOnForm = document.querySelector('.modal__client-id');
	let clientId = clientElem.querySelector('.main__list-id').innerText;
	let surnameForm = document.querySelector('.surname-input');
	let nameForm = document.querySelector('.name-input');
	let lastnameForm = document.querySelector('.middlename-input');

	getClientInfo(clientUrl, fullId)
		.then(data => {
			titleForm.textContent = 'Изменить данные';
			idOnForm.textContent = `ID: ${clientId}`;

			let allContacts = data.contacts
			allContacts.forEach(contact => {
				let contactType = contact.type;
				let contactValue = contact.value;
				createContactElem(contactType, contactValue);
			})
			surnameForm.value = data.surname.slice(0, 1).toUpperCase() + data.surname.slice(1);
			nameForm.value = data.name.slice(0, 1).toUpperCase() + data.name.slice(1);
			lastnameForm.value = data.lastName.slice(0, 1).toUpperCase() + data.lastName.slice(1);

			checkInputValue()
			selectChange()
			deleteContactBtnVisible()

			form.addEventListener('submit', (event) => {
				event.preventDefault();
				if (idOnForm.innerText === '') return
				changeClientInfo(clientUrl, fullId, getUserInfoOnForm())
				.then(data => {
					changeCLientInfoOnlist(clientElem, data)
				})
				setTimeout(() => {
					form.remove()
					cancelBtn.remove()
					toolTipActive()
				}, 100);
				removedAddForm()
			})
		})


	activatedAddForm()
}

const changeCLientInfoOnlist = (userElem, data) => {
	let userName = userElem.querySelector('.main__list-name');
	let userDataChange = userElem.querySelector('.change__data');
	let userTimeChange = userElem.querySelector('.change__time');
	let userContactBlock = userElem.querySelector('.main__list-contacts');
	let contacts = userElem.querySelectorAll('.contact__icon');

	contacts.forEach(contact => contact.remove())
	
	userName.textContent = `${data.surname.slice(0, 1).toUpperCase() + data.surname.slice(1)} ${data.name.slice(0, 1).toUpperCase() + data.name.slice(1)} ${data.lastName.slice(0, 1).toUpperCase() + data.lastName.slice(1)}`;

	userDataChange.textContent = `${data.updatedAt.slice(0, 4)}:${data.updatedAt.slice(5, 7)}:${data.updatedAt.slice(8, 10)}`;
	userTimeChange.textContent = `${data.updatedAt.slice(11, 16)}`
	createContactsIcons(data.contacts, userContactBlock)
}

const openDeleteForm = () => {
  const mainList = document.querySelector('.main__list');
	let modal = document.querySelector('.modal');

 
	mainList.addEventListener('click', function(event) {
		event.preventDefault()
		const deleteBtn = event.target.closest('.main__list-delete')
		const changeBtn = event.target.closest('.main__list-change')


		if(deleteBtn) {
			createModalDelete()

			setTimeout(() => {
				let deleteModal = document.querySelector('.delete__container');
				modal.classList.add('modal--on');
				deleteModal.classList.add('delete__container--on');
				closeModalForm('.delete__cancel', '.delete__container', 'delete__container--on')
			}, 0)
			const clientElem = deleteBtn.parentElement
			deleteClientServerAndList(clientElem)
		} else if (changeBtn) {
			let clientElem = changeBtn.parentElement;
			createModalForm()
			setTimeout(activatedAddForm, 100)
			addContactBtnEvent()
			checkInputValue()
			changeModalForm(clientElem)
		}
	})
  
}

function deleteClientServerAndList(client) {
	const deleteContainer = document.querySelector('.delete__container');

	deleteContainer.addEventListener('click', (event) => {
		event.preventDefault();

		const deleteBtn = event.target.closest('.delete__button');
		const cancelBtn = event.target.closest('.delete__cancel')


		if(deleteBtn) {
			let itemId = client.dataset.id;
			deleteUserInfo(clientUrl, itemId);
			closeDelteForm()
			client.remove()
			setTimeout(() => deleteContainer.remove(), 100)
			
		}

		if(cancelBtn) {
			closeDelteForm()
			setTimeout(() => deleteContainer.remove(), 100)
		}
	})
}	


const closeDelteForm = () => {
	let modal = document.querySelector('.modal');
	let deleteModal = document.querySelector('.delete__container');
	modal.classList.remove('modal--on');
	deleteModal.classList.remove('delete__container--on');
}

const closeModalForm = (closeSelector, modalContainer, activeClass) => {
	const deleteContainer = document.querySelector('.delete__container');
	const addAndChangeContainer = document.querySelector('.modal__form');
	const cancelFormBtn = document.querySelector('.cancel-button')
	const closeBtns = document.querySelectorAll('.cancel-button')
	let modal = document.querySelector('.modal');
	let form = document.querySelector(modalContainer);
	let titleForm = document.querySelector('.modal__title');
	let idOnForm = document.querySelector('.modal__client-id')
	
	const deleteActiveModalClass = () => {
		modal.classList.remove('modal--on');
		form.classList.remove(activeClass);
		checkInputValue()
		setTimeout(() => {
			if(deleteContainer) deleteContainer.remove()
			if(addAndChangeContainer) {
				addAndChangeContainer.remove()
				cancelFormBtn.remove()
				titleForm.textContent = 'Новый клиент';
				idOnForm.textContent = '';
			}
		}, 300)
		
	}

	closeBtns.forEach(btn => btn.addEventListener('click', deleteActiveModalClass))

	modal.addEventListener('click', (e) => {
		let target = e.target;
		if(target === modal) {
			deleteActiveModalClass();
		}
	})
}


const deleteContactBtnVisible = () => {
	let inputs = document.querySelectorAll('.contact-input');

	inputs.forEach(item => {

		const changeBtnVisible = () => {
			let deleteBtn = item.nextSibling;
			if(item.value !== '') {
				deleteBtn.classList.add('contact-delete--on');
			} else deleteBtn.classList.remove('contact-delete--on');
		}
		changeBtnVisible()
		item.addEventListener('input', () => {
			changeBtnVisible()
		})
	})
}

const activatedAddForm = () => {
	let modal = document.querySelector('.modal');
	let form = document.querySelector('.modal__container');

	modal.classList.add('modal--on');
	form.classList.add('form--on');
	closeModalForm('.cancel-form', '.modal__container', 'form--on');
}

const removedAddForm = () => {
	let modal = document.querySelector('.modal');
	let form = document.querySelector('.modal__container');
	let titleForm = document.querySelector('.modal__title');
	let idOnForm = document.querySelector('.modal__client-id')

	modal.classList.remove('modal--on');
	form.classList.remove('form--on');
	titleForm.textContent = 'Новый клиент';
	idOnForm.textContent = '';
	closeModalForm('.cancel-form', '.modal__container', 'form--on');
}

let toolTipActive = () => {
	let allContacts = document.querySelectorAll('.contact__icon');

	allContacts.forEach(contactIcon => {
		contactIcon.addEventListener('mousemove', function(event) {
			let tooltip = document.querySelector('.tooltip');
			if(tooltip) tooltip.remove()
			tooltip = contactsTooltip()
			let topPosition = event.clientY;
			let leftPosition = event.clientX;
			let contactValue = this.getAttribute('data-value');
			let contactType = this.getAttribute('data-type');
			
			tooltip.firstChild.textContent = `${contactType}: ${contactValue}`;
			let elementWidth = tooltip.clientWidth;

			tooltip.style.top = topPosition - 45 + 'px';
			tooltip.style.left = leftPosition - (elementWidth / 2) + 'px';
		})
		contactIcon.addEventListener('mouseout', function() {
			let tooltip = document.querySelector('.tooltip');
			if(tooltip) tooltip.remove()
		})
	})
}



export { openAddForm, openDeleteForm, deleteContactBtnVisible, activatedAddForm, toolTipActive, deleteClientServerAndList }
