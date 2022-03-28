'use strict'

// Создаем main секцию
let createSectionAndTitle = () => {
	let container = document.querySelector('.container');
	let listContainer = document.createElement('div')
	listContainer.classList.add('list-container')

	let mainSection = document.createElement('section');
	let mainTitle = document.createElement('h1');
	let pageTitle = document.createElement('h2');

	mainSection.classList.add('main');
	mainTitle.classList.add('visually-hidden');
	mainTitle.textContent = 'Учебнообразовательная платформа скиллбокс';
	pageTitle.classList.add('main__title');
	pageTitle.textContent = 'Клиенты';

	mainSection.append(mainTitle);
	mainSection.append(pageTitle);
	container.append(mainSection, listContainer);
	return mainSection;
}

// СОздаем список инструментов управление таблицей
let createTableToolsList = () => {
	let container = document.querySelector('.list-container');

	let mainBlock = document.createElement('ul');
	mainBlock.classList.add('main__tool-list');
	
	let idTool = document.createElement('li');
	idTool.classList.add('main__tool-item' , 'item-id');
	let idToolName = document.createElement('span');
	idToolName.classList.add('main__tool-item--name', 'id-name');
	idToolName.textContent = 'ID';
	let idToolIcon = document.createElement('span');
	idToolIcon.classList.add('main__tool-item--icon', 'id-icon');
	idToolIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></svg>`

	idTool.append(idToolName);
	idTool.append(idToolIcon);
	mainBlock.append(idTool)


	let nameTool = document.createElement('li');
	nameTool.classList.add('main__tool-item', 'item-name')
	let nameToolName = document.createElement('span');
	nameToolName.classList.add('main__tool-item--name', 'name-name');
	nameToolName.textContent = 'Фамилия Имя Отчество';
	let nameToolIcon = document.createElement('span');
	nameToolIcon.classList.add('main__tool-item--icon', 'name-icon');
	nameToolIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></svg>`
	let idToolIconText = document.createElement('span');
	idToolIconText.classList.add('main__tool-item--icon-text', 'name-icon-text');
	idToolIconText.textContent = 'А-Я';


	nameTool.append(nameToolName);
	nameTool.append(nameToolIcon, idToolIconText);
	mainBlock.append(nameTool)


	let dateTool = document.createElement('li');
	dateTool.classList.add('main__tool-item', 'item-created');
	let dateToolName = document.createElement('span');
	dateToolName.classList.add('main__tool-item--name', 'created-name');
	dateToolName.textContent = 'Дата и время создания';
	let dateToolIcon = document.createElement('span');
	dateToolIcon.classList.add('main__tool-item--icon', 'created-icon');
	dateToolIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></svg>`


	dateTool.append(dateToolName);
	dateTool.append(dateToolIcon);
	mainBlock.append(dateTool)


	let dateChangeTool = document.createElement('li');
	dateChangeTool.classList.add('main__tool-item', 'item-update');
	let dateChangeToolName = document.createElement('span');
	dateChangeToolName.classList.add('main__tool-item--name', 'update-name');
	dateChangeToolName.textContent = 'Последние изменения';
	let dateChangeToolIcon = document.createElement('span');
	dateChangeToolIcon.classList.add('main__tool-item--icon', 'update-icon');
	dateChangeToolIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/></svg>`

	
	dateChangeTool.append(dateChangeToolName);
	dateChangeTool.append(dateChangeToolIcon);
	mainBlock.append(dateChangeTool)


	let contactsTool = document.createElement('li');
	contactsTool.classList.add('main__tool-item');
	let contactsToolName = document.createElement('span');
	contactsToolName.classList.add('main__tool-item--name');
	contactsToolName.textContent = 'Контакты';
	let contactsToolIcon = document.createElement('span');
	contactsToolIcon.classList.add('main__tool-item--icon');
		
	contactsTool.append(contactsToolName);
	contactsTool.append(contactsToolIcon);
	mainBlock.append(contactsTool)

	
	let actionTool = document.createElement('li');
	actionTool.classList.add('main__tool-item');
	let actionToolName = document.createElement('span');
	actionToolName.classList.add('main__tool-item--name');
	actionToolName.textContent = 'Действия';
	let actionToolIcon = document.createElement('span');
	actionToolIcon.classList.add('main__tool-item--icon');
		
	actionTool.append(actionToolName);
	actionTool.append(actionToolIcon);
	mainBlock.append(actionTool)

	container.append(mainBlock)
	return mainBlock
}


export { createSectionAndTitle, createTableToolsList }

