'use strict'

let createStudentList = () => {
	let container = document.querySelector('.list-container');
	
	let mainList = document.createElement('ul');
	mainList.classList.add('main__list');

	container.append(mainList);
	return mainList;
}

let createStudentListItem = (userParams) => {
	let container = document.querySelector('.main__list');

	let createItem = document.createElement('li');
	createItem.classList.add('main__list-item');
	createItem.setAttribute('data-id', userParams.id)

	let createItemId = document.createElement('span');
	createItemId.classList.add('main__list-id');
	createItemId.textContent = userParams.id;

	let createItemName = document.createElement('span');
	let surname = userParams.surname;
	let name = userParams.name;
	let lastname = userParams.lastName;
	createItemName.classList.add('main__list-name');
	createItemName.textContent = `${surname.slice(0, 1).toUpperCase() + surname.slice(1)} ${name.slice(0, 1).toUpperCase() + name.slice(1)} ${lastname.slice(0, 1).toUpperCase() + lastname.slice(1)}`;

	let createItemAddBlock = document.createElement('div');
	createItemAddBlock.classList.add('main__list-add-block');
	let createItemAddDate = document.createElement('span');
	let create = userParams.createdAt;
	const createDate = new Date(create);
	let addDate = `${createDate.getFullYear()}:${createDate.getMonth() + 1}:${createDate.getDate() > 9 ? createDate.getDate() : '0' + createDate.getDate()}`;
	createItemAddDate.classList.add('add__data');
	createItemAddDate.textContent = addDate;
	let createItemAddTime = document.createElement('span');
	let addTime = `${createDate.getHours()}:${createDate.getMinutes()}`;
	createItemAddTime.classList.add('add__time');
	createItemAddTime.textContent = addTime;
	createItemAddBlock.append(createItemAddDate, createItemAddTime)

	let createItemChangeBlock = document.createElement('div');
	createItemChangeBlock.classList.add('main__list-change-block');
	let createItemChangeDate = document.createElement('span');
	const updateDate = new Date(userParams.updatedAt)
	let updateFullDate = `${updateDate.getFullYear()}:${updateDate.getMonth() + 1}:${updateDate.getDate() > 9 ? updateDate.getDate() : '0' + updateDate.getDate()}`;
	createItemChangeDate.classList.add('change__data');
	createItemChangeDate.textContent = updateFullDate;
	let createItemChangeTime = document.createElement('span');
	let updateTime = `${updateDate.getHours()}:${updateDate.getMinutes()}`;;
	createItemChangeTime.classList.add('change__time');
	createItemChangeTime.textContent = updateTime;
	createItemChangeBlock.append(createItemChangeDate, createItemChangeTime)

	let createContactsBlock = document.createElement('div');
	createContactsBlock.classList.add('main__list-contacts');

	let createChangeButton = document.createElement('div');
	createChangeButton.classList.add('main__list-change');
	let createChangeButtonIcon = document.createElement('span');
	createChangeButtonIcon.classList.add('change__icon');
	createChangeButtonIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M4.29289 13.5H2.5V11.7071L9.37333 4.83373L11.1662 6.62662L4.29289 13.5ZM13.4531 4.10684C13.5179 4.17158 13.5179 4.275 13.4531 4.33974L12.5867 5.20618L10.7938 3.41329L11.6602 2.54684C11.725 2.48211 11.8284 2.48211 11.8931 2.54684L13.4531 4.10684Z" fill="#9873FF" stroke="#9873FF"/></g></svg>`
	let createChangeButtonText = document.createElement('span');
	createChangeButtonText.classList.add('change__text');
	createChangeButtonText.textContent = 'Изменить';

	createChangeButton.append(createChangeButtonIcon);
	createChangeButton.append(createChangeButtonText);

	
	let createDeleteButton = document.createElement('div');
	createDeleteButton.classList.add('main__list-delete');
	let createDeleteButtonIcon = document.createElement('span');
	createDeleteButtonIcon.classList.add('delete__icon');
	createDeleteButtonIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g></svg>`
	let createDeleteButtonText = document.createElement('span');
	createDeleteButtonText.classList.add('delete__text');
	createDeleteButtonText.textContent = 'Удалить';

	createDeleteButton.append(createDeleteButtonIcon);
	createDeleteButton.append(createDeleteButtonText);


	createItem.append(createItemId, createItemName, createItemAddBlock, createItemChangeBlock, createContactsBlock, createChangeButton, createDeleteButton);
	container.append(createItem);

	createContactsIcons(userParams.contacts, createContactsBlock)

	return {
		createItem,
		createItemId,
		createItemName,
		createItemAddBlock,
		createItemChangeBlock,
		createContactsBlock,
	}

}

let createContactsIcons = (userContacts, userContactBlock) => {
	if (!userContacts) return
	for (let contact of userContacts) {
		let createContactIcon = document.createElement('span');
		createContactIcon.classList.add('contact__icon');
		switch (contact.type) {
			case 'ВКонтакте' :
				createContactIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></g></svg>`;
				createContactIcon.setAttribute('data-type', 'VK');
				createContactIcon.setAttribute('data-value', contact.value);
				userContactBlock.append(createContactIcon);
				continue;
			case 'Facebook':
				createContactIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>`;
				createContactIcon.setAttribute('data-type', 'Facebook');
				createContactIcon.setAttribute('data-value', contact.value);
				userContactBlock.append(createContactIcon);
				continue;
			case 'Почта':
				createContactIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><mask id="path-1-inside-1_121:2369" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z"/></mask><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/><path d="M11.04 6.59375L11.5458 7.45646L11.5545 7.45124L11.04 6.59375ZM8.424 8.1275L7.91822 7.26483L7.91499 7.26674L8.424 8.1275ZM10.68 6.05375L10.1811 5.18706L10.1742 5.19108L10.68 6.05375ZM8 7.625L7.49423 8.48767L8 8.78419L8.50577 8.48767L8 7.625ZM5.32 6.05375L5.82579 5.19106L5.8189 5.18709L5.32 6.05375ZM4.96 6.59375L4.44548 7.45129L4.45422 7.45641L4.96 6.59375ZM7.576 8.1275L8.08501 7.26673L8.08178 7.26484L7.576 8.1275ZM15 8C15 11.866 11.866 15 8 15V17C12.9706 17 17 12.9706 17 8H15ZM8 1C11.866 1 15 4.13401 15 8H17C17 3.02944 12.9706 -1 8 -1V1ZM1 8C1 4.13401 4.13401 1 8 1V-1C3.02944 -1 -1 3.02944 -1 8H1ZM8 15C4.13401 15 1 11.866 1 8H-1C-1 12.9706 3.02944 17 8 17V15ZM4.8 4C3.86949 4 3 4.7254 3 5.75H5C5 5.84389 4.9576 5.91361 4.91894 5.94985C4.88117 5.98526 4.83756 6 4.8 6V4ZM11.2 4H4.8V6H11.2V4ZM13 5.75C13 4.7254 12.1305 4 11.2 4V6C11.1624 6 11.1188 5.98526 11.0811 5.94985C11.0424 5.91361 11 5.84389 11 5.75H13ZM13 10.25V5.75H11V10.25H13ZM11.2 12C12.1305 12 13 11.2746 13 10.25H11C11 10.1561 11.0424 10.0864 11.0811 10.0502C11.1188 10.0147 11.1624 10 11.2 10V12ZM4.8 12H11.2V10H4.8V12ZM3 10.25C3 11.2746 3.86949 12 4.8 12V10C4.83756 10 4.88117 10.0147 4.91894 10.0501C4.9576 10.0864 5 10.1561 5 10.25H3ZM3 5.75V10.25H5V5.75H3ZM10.5342 5.73109L7.91822 7.26484L8.92978 8.99016L11.5458 7.45641L10.5342 5.73109ZM10.2 6.32375C10.2 6.05148 10.3507 5.84113 10.5255 5.73626L11.5545 7.45124C11.9293 7.22637 12.2 6.81352 12.2 6.32375H10.2ZM11.1789 6.92041C10.979 7.0355 10.7469 7.02706 10.5661 6.93353C10.3812 6.83789 10.2 6.62071 10.2 6.32375H12.2C12.2 5.1801 10.9661 4.7352 10.1811 5.18709L11.1789 6.92041ZM8.50577 8.48767L11.1858 6.91642L10.1742 5.19108L7.49423 6.76233L8.50577 8.48767ZM4.81423 6.91642L7.49423 8.48767L8.50577 6.76233L5.82577 5.19108L4.81423 6.91642ZM5.8 6.32375C5.8 6.62071 5.61883 6.83789 5.43392 6.93353C5.2531 7.02706 5.02103 7.0355 4.8211 6.92041L5.8189 5.18709C5.03391 4.7352 3.8 5.1801 3.8 6.32375H5.8ZM5.4745 5.73626C5.64928 5.84113 5.8 6.05148 5.8 6.32375H3.8C3.8 6.81352 4.07072 7.22637 4.4455 7.45124L5.4745 5.73626ZM8.08178 7.26484L5.46578 5.73109L4.45422 7.45641L7.07022 8.99016L8.08178 7.26484ZM7.91499 7.26674C7.96894 7.23484 8.03106 7.23484 8.08501 7.26674L7.06699 8.98826C7.64094 9.32766 8.35906 9.32766 8.93301 8.98826L7.91499 7.26674Z" fill="#9873FF" mask="url(#path-1-inside-1_121:2369)"/></g></svg>`
				createContactIcon.setAttribute('data-type', 'Почта');
				createContactIcon.setAttribute('data-value', contact.value);
				userContactBlock.append(createContactIcon);
				continue;
			case 'Телефон': 
				createContactIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="7.5" fill="#9873FF" stroke="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>`;
				createContactIcon.setAttribute('data-type', 'Телефон');
				createContactIcon.setAttribute('data-value', contact.value);
				userContactBlock.append(createContactIcon);
				continue;
			default:
				createContactIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>`;
				createContactIcon.setAttribute('data-type', 'Другое');
				createContactIcon.setAttribute('data-value', contact.value);
				userContactBlock.append(createContactIcon);
				continue;
		}
	}
}

let contactsTooltip = () => {
	let container = document.querySelector('.container');
	let tooltipContainer = document.createElement('div');
	tooltipContainer.classList.add('tooltip');
	let tooltip = document.createElement('span');
	tooltip.classList.add('tooltip-text');
	let tooltipArrow = document.createElement('span');
	tooltipArrow.classList.add('tooltip-arrow');

	tooltipContainer.append(tooltip, tooltipArrow);
	container.append(tooltipContainer)
	return tooltipContainer
}

const preloader = () => {
	const container = document.querySelector('.main__list');
	const preloaderItem = document.createElement('li');
	preloaderItem.classList.add('preloader-container');
	const loadindCircle = document.createElement('div');
	loadindCircle.classList.add('load');
	
	preloaderItem.append(loadindCircle)
	container.append(preloaderItem)
}

const firstErrorMessage = () => {
	const container = document.querySelector('.main__list');
	const messageContainer = document.createElement('li');
	messageContainer.classList.add('preloader-container');
	const message = document.createElement('h2');
	message.classList.add('error');
	message.textContent = `Упс, что-то пошло не так :( попробуте в другой раз`;

	messageContainer.append(message)
	container.append(messageContainer)
}

export { createStudentList, createStudentListItem, contactsTooltip, createContactsIcons, preloader, firstErrorMessage }
