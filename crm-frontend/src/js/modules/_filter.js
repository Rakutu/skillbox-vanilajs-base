'use strict'

import { createStudentListItem } from './_mainListComponent.js'
import { removeList } from './_sort.js'
import { openDeleteForm, toolTipActive } from './_eventListeners.js'
import { autocomplete, setActive } from './_autocomplete.js'


const inputFilter = (serverUrl) => {
	const input = document.querySelector('.header__input');
	let timeOutInput;

	const inputValue = () => {
		let autocompleteResult = document.querySelectorAll('.autocomplete-item');
		let value = input.value.toLowerCase();
		autocomplete(serverUrl, value)
		dataFilter(value, serverUrl)
		autocompleteResult.forEach(item => item.remove())
	}

	input.addEventListener('input', function() {
		clearInterval(timeOutInput);
		timeOutInput = setTimeout(inputValue, 300)
	})

	let focusedItem = -1;

	input.addEventListener('keydown', (event) => {
		let keycode = event.keyCode
		let autocompleteItems = document.querySelectorAll('.autocomplete-item');

		
		const focusItem = (index) => {
			if(!autocompleteItems.length) return false
			if(index > autocompleteItems.length - 1) return focusItem(0)
			if(index < 0) return focusItem(autocompleteItems.length - 1)
			focusedItem = index
			unfocusAllItems(autocompleteItems)
			autocompleteItems[index].classList.add('focused');
		}


		if(keycode === 40) { // arrow down
			event.preventDefault()
			focusedItem++
			focusItem(focusedItem);
		} else if(keycode === 38) { // arrow up
			event.preventDefault()
			if(focusedItem > 0) focusedItem--
			focusItem(focusedItem)
		} else if(keycode === 27) { // escape
			 setActive(false);
		} else if (keycode === 13) { // enter
			event.preventDefault()
			input.value = autocompleteItems[focusedItem].innerText;
			dataFilter(input.value, serverUrl)
			setActive(false)
		}

	})

	const changeInputValueOnMouse = () => {
		const container = document.querySelector('.autocomplete-list')
	
		container.addEventListener('click', (event) => {
			event.preventDefault();
	
			const listItem = event.target.closest('.autocomplete-item');
	
			if(listItem) {
				input.value = listItem.innerText;
				setActive(false);
				dataFilter(input.value, serverUrl)
			} else {
				setActive(false)
			}
		})
	}

	changeInputValueOnMouse()

}



const unfocusAllItems = data => {
	data.forEach(item => {
		item.classList.remove('focused')
	})
}

async function dataFilter(inputValue, serverUrl) {
	removeList()
	const response = await fetch (`${serverUrl}/?search=${inputValue}`);
	const data = await response.json()
	data.forEach(item => createStudentListItem(item))
	toolTipActive()
}

// async function dataFilter(inputValue, serverUrl) {
// 	const response = await fetch(serverUrl);
// 	const data = await response.json();
// 	let findSet = new Set;

// 	data.forEach(user => {
// 		if(!inputValue) return
// 		let value = Object.values(user);

// 		for(let i of value) {
// 			if(i.includes(inputValue)) findSet.add(user);
// 		}
// 	})

// 	if(inputValue === '') {
// 		removeList()
// 		data.forEach(item => createStudentListItem(item))
// 		openDeleteForm()
// 		toolTipActive()
// 		return
// 	}

// 	removeList()
// 	findSet.forEach(item => createStudentListItem(item))
// 	toolTipActive()
// }

export { inputFilter }
