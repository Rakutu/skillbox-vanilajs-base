'use strict'

import { createStudentListItem, preloader, firstErrorMessage } from './_mainListComponent.js'
import { openDeleteForm, toolTipActive } from './_eventListeners.js'
import { usersSort } from './_sort.js'

let clientUrl = 'http://localhost:3000/api/clients';


async function setUserInfo(serverUrl, userInfo, createListItem, deleteFc) {
	let response = await fetch(serverUrl, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(userInfo)
	})
	const status = response.status
	const data = await response.json()

	const showErrorMessage = (message) => {
		const errorMessage = document.querySelector('.modal__error');
		errorMessage.style.display = 'block';
		errorMessage.textContent = message;
	}
	
	if(status === 422 || status >= 500) {
		let errorServerMessage = data.errors[0].message;
		showErrorMessage(errorServerMessage)
	} else if (status === 404) {
		showErrorMessage('Что-то пошло не так, попробуйте чуть позже :(')
	} else {
		createListItem(data)
		deleteFc()
	}

	toolTipActive()
}

async function getUserInfo(serverUrl) {
	const preloader = document.querySelector('.preloader-container');
	
	let response = await fetch(serverUrl)
	.catch(() => {
		preloader.remove();
		firstErrorMessage()
	})

	if(response.ok) preloader.remove()
	const data = await response.json();


	data.forEach(client => {
		createStudentListItem(client)
	})
	usersSort( '.item-id', clientUrl, 'item-id--on', 'id' )
	usersSort( '.item-created', clientUrl, 'item-created--on', 'createdAt' )
	usersSort( '.item-update', clientUrl, 'item-update--on', 'updatedAt' )
	usersSort( '.item-name', clientUrl, 'item-name--on', 'surname', 'name', 'lastName' )
	toolTipActive()
}

async function deleteUserInfo(serverUrl, id) {
	fetch(`${serverUrl}/${id}`, {
		method: 'DELETE',
	})
}

async function getClientInfo(serverUrl, id) {
	const response = await fetch(`${serverUrl}/${id}`);
	const data = await response.json();

	return data
}

async function changeClientInfo(serverUrl, id, userInfo) {
	const response = await fetch(`${serverUrl}/${id}`, {
		method: 'PATCH',
		header: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userInfo)
	})
	const data = await response.json()
	return data
}


export { setUserInfo, getUserInfo, deleteUserInfo, getClientInfo, changeClientInfo }
