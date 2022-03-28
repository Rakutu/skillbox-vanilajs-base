'use strict'

let createModal = (title = 'Новый клиент', id) => {
	let container = document.querySelector('.container');

	let modalContainer = document.createElement('div');
	modalContainer.classList.add('modal');

	let modalBlock = document.createElement('div');
	modalBlock.classList.add('modal__container');

	let titleContainer = document.createElement('div');
	titleContainer.classList.add('.modal__title-container');

	let modalTitle = document.createElement('h3');
	modalTitle.classList.add('modal__title');
	modalTitle.textContent = title;

	let modalClientId = document.createElement('span');
	modalClientId.classList.add('modal__client-id');
	modalClientId.textContent = id;

	titleContainer.append(modalTitle, modalClientId)
	modalBlock.append(titleContainer);
	modalContainer.append(modalBlock);
	container.append(modalContainer);

	return {
		modalContainer,
		modalTitle,
		modalClientId,
	}
}


let createModalForm = () => {
	let modalContainer = document.querySelector('.modal__container');

	let modalForm = document.createElement('form');
	modalForm.classList.add('modal__form');

	let surnameLabel = document.createElement('label');
	surnameLabel.classList.add('modal__label', 'surname-label');

	let surnameDesc = document.createElement('span');
	surnameDesc.classList.add('modal__label-desc', 'surname-desc');
	surnameDesc.textContent = 'Фамилия';

	let surnameInput = document.createElement('input');
	surnameInput.classList.add('modal__input', 'surname-input');
	surnameInput.setAttribute('required', 'true');

	surnameLabel.append(surnameInput);
	surnameLabel.append(surnameDesc);
	modalForm.append(surnameLabel);



	let nameLabel = document.createElement('label');
	nameLabel.classList.add('modal__label', 'name-label');

	let nameDesc = document.createElement('span');
	nameDesc.classList.add('modal__label-desc', 'name-desc');
	nameDesc.textContent = 'Имя';

	let nameInput = document.createElement('input');
	nameInput.classList.add('modal__input', 'name-input');
	nameInput.setAttribute('required', 'true');
	
	nameLabel.append(nameInput);
	nameLabel.append(nameDesc);
	modalForm.append(nameLabel);



	let middlenameLabel = document.createElement('label');
	middlenameLabel.classList.add('modal__label', 'middlename-label');

	let middlenameDesc = document.createElement('span');
	middlenameDesc.classList.add('modal__label-desc', 'middlename-desc');
	middlenameDesc.textContent = 'Отчество';

	let middlenameInput = document.createElement('input');
	middlenameInput.classList.add('modal__input', 'middlename-input');
	
	middlenameLabel.append(middlenameInput);
	middlenameLabel.append(middlenameDesc);
	modalForm.append(middlenameLabel);


	let addContactBtnContainer = document.createElement('div');
	addContactBtnContainer.classList.add('modal__button-container');
	let contactContainer = document.createElement('div');
	contactContainer.classList.add('modal__contact-container');

	let addContactButton = document.createElement('button');
	addContactButton.classList.add('modal__button', 'add-button');

	let addContactButtonIcon = document.createElement('span');
	addContactButtonIcon.classList.add('modal__button-icon');
	addContactButtonIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 3.66659C6.63334 3.66659 6.33334 3.96659 6.33334 4.33325V6.33325H4.33334C3.96668 6.33325 3.66668 6.63325 3.66668 6.99992C3.66668 7.36659 3.96668 7.66659 4.33334 7.66659H6.33334V9.66659C6.33334 10.0333 6.63334 10.3333 7.00001 10.3333C7.36668 10.3333 7.66668 10.0333 7.66668 9.66659V7.66659H9.66668C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66668 6.33325H7.66668V4.33325C7.66668 3.96659 7.36668 3.66659 7.00001 3.66659ZM7.00001 0.333252C3.32001 0.333252 0.333344 3.31992 0.333344 6.99992C0.333344 10.6799 3.32001 13.6666 7.00001 13.6666C10.68 13.6666 13.6667 10.6799 13.6667 6.99992C13.6667 3.31992 10.68 0.333252 7.00001 0.333252ZM7.00001 12.3333C4.06001 12.3333 1.66668 9.93992 1.66668 6.99992C1.66668 4.05992 4.06001 1.66659 7.00001 1.66659C9.94001 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.94001 12.3333 7.00001 12.3333Z" fill="#9873FF"/></svg>`;

	let addContactButtonText = document.createElement('span');
	addContactButtonText.classList.add('modal__button-text');
	addContactButtonText.textContent = 'Добавить контакт';

	addContactButton.append(addContactButtonIcon, addContactButtonText);
	addContactBtnContainer.append(contactContainer, addContactButton)
	modalForm.append(addContactBtnContainer);


	const serverErrorStatus = document.createElement('span');
	serverErrorStatus.classList.add('modal__error');

	modalForm.append(serverErrorStatus);


	let saveButton = document.createElement('button');
	saveButton.classList.add('modal__button', 'save-button', 'firm-button');
	saveButton.textContent = 'Сохранить';
	modalForm.append(saveButton);


	let cancelButton = document.createElement('button');
	cancelButton.classList.add('modal__button', 'cancel-button', 'cancel-form');
	cancelButton.textContent = 'Отменить';

	modalContainer.append(modalForm);
	modalContainer.append(cancelButton);

	return modalForm
}

const createModalDelete = () => {
	const container = document.querySelector('.modal');

	const modalForm = document.createElement('div');
	modalForm.classList.add('delete__container');

	const title = document.createElement('strong');
	title.classList.add('delete__title', 'modal__title');
	title.textContent = 'Удалить клиента';

	const desc = document.createElement('p');
	desc.classList.add('delete__desc');
	desc.textContent = 'Вы действительно хотите удалить данного клиента';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete__button', 'modal__button', 'firm-button');
	deleteBtn.textContent = 'Удалить';

	const cancel = document.createElement('span');
	cancel.classList.add('delete__cancel', 'modal__button', 'cancel-button');
	cancel.textContent = 'Отмена';

	const cancelIcon = document.createElement('span');
	cancelIcon.classList.add('delete__cancel', 'cancel-icon');
	cancelIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>`

	modalForm.append(title, desc, deleteBtn, cancel, cancelIcon);
	container.append(modalForm);

	return modalForm;
}



export { createModal, createModalForm, createModalDelete }
