'use strict'

import { createStudentListItem } from './_mainListComponent.js'

let updateStorage = (users) => {
	let commonArray = [];
	if(!users) return
	let getlocalList = JSON.parse(localStorage.getItem('users'));

	if(getlocalList) {
		for (let user of getlocalList) {
			commonArray.push(user);
		}
	} 

	for (let user of users) {
		commonArray.push(user)
	}

	localStorage.setItem('users', JSON.stringify(commonArray));
}

let initialStorage = () => {
	let users = JSON.parse(localStorage.getItem('users'));

	if(users) {
		users.forEach(user => {
			createStudentListItem(user);
		})
	}
}

export { updateStorage, initialStorage }
