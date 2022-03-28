'use strict'

// Создаем логотип
let createHeaderLogo = () => {
	let headerLogoLink = document.createElement('a');
	let headerLogoImg = document.createElement('img');

	headerLogoLink.classList.add('header__logo-link');
	headerLogoLink.setAttribute('href', '#');
	headerLogoImg.classList.add('header__logo-img');
	headerLogoImg.setAttribute('alt', 'Логотип компании Skillbox');
	headerLogoImg.setAttribute('src', 'img/logo.png');
	

	headerLogoLink.appendChild(headerLogoImg);

	return headerLogoLink
}

// Создание формы и инпута
let createHeaderInputForm = () => {
	let inputForm = document.createElement('form');
	let headerInput = document.createElement('input');
	const autocompleteWrap = document.createElement('div');
	autocompleteWrap.classList.add('input__autocomplete');
	const autocompleteList = document.createElement('ul');
	autocompleteList.classList.add('autocomplete-list');

	inputForm.classList.add('header__form');
	headerInput.classList.add('header__input');
	headerInput.placeholder = 'Введите запрос'
	headerInput.type = 'search'

	autocompleteWrap.append(autocompleteList)
	inputForm.append(headerInput, autocompleteWrap);
	return {
		headerInput,
		inputForm,
	}
}

// Создаем элемент хедер
let createHeader = () => {
	let container = document.querySelector('.container');
	let header = document.createElement('header');
	let headerLogo = createHeaderLogo();
	let headerInputForm = createHeaderInputForm().inputForm;

	header.classList.add('header')

	header.append(headerLogo);
	header.append(headerInputForm);
	container.append(header);

	return header
}

// экспорт в main файл
export { createHeader }
