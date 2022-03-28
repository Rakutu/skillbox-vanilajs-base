'use strict'

import { toolTipActive } from './_eventListeners.js'
import { createStudentListItem } from './_mainListComponent.js';


function usersSort(btn, serverUrl, activeClass, firstProp, secondProp, thirdProp) {
	let createBtn = document.querySelector(btn);
	let reverse = false;
	
	createBtn.addEventListener('click', async function (event) {

		event.preventDefault()
		removeList()

		let response = await fetch(serverUrl);
		let data = await response.json();

		if (!reverse) {
			createBtn.classList.add(activeClass)
			data.sort((a, b) => {
				if(a[firstProp] === b[firstProp]) {
					if(a[secondProp] === b[secondProp]) {
						return a[thirdProp] < b[thirdProp] ? 1 : -1
					}
					return a[secondProp] < b[secondProp] ? 1 : -1
				}

				return a[firstProp] < b[firstProp] ? 1 : -1
			})

			data.forEach(user => {
				createStudentListItem(user)
			})
			toolTipActive()
			reverse = true;
			
		} else {
			createBtn.classList.remove(activeClass)

			data.sort((a, b) => {
				if(a[firstProp] === b[firstProp]) {
					if(a[secondProp] === b[secondProp]) {
						return a[thirdProp] > b[thirdProp] ? 1 : -1
					}
					return a[secondProp] > b[secondProp] ? 1 : -1
				}

				return a[firstProp] > b[firstProp] ? 1 : -1
			})

			data.forEach(user => {
				createStudentListItem(user)
			})

			toolTipActive()
			reverse = false
		}
	})
}

const removeList = () => {
	let allUsers = document.querySelectorAll('.main__list-item');
	allUsers.forEach(user => {
		user.remove();
	})
}


export { usersSort, removeList } 
