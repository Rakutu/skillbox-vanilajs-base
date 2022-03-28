'use strict'

const autocomplete = (url, value) => {
	const response = fetch(url)
	.then(data => data.json())
	.then(data => {
		data.forEach(dataItem => searchOnServer(value, dataItem))
	})
	
}

const searchOnServer = (what, where) => {
	const values =  [where.surname, where.lastName, where.name];
	const contactsValue = []
	const result = new Set()
	let listItems = document.querySelectorAll('.autocomplete-item')

	if(what === '') {
		setActive(false)
		return
	}

	where.contacts.forEach(contact => {
		contactsValue.push(contact.value)
	})

	
	for(let i of values) {
		if(i.includes(what)) result.add(i)
	}

	for(let i of contactsValue) {
		if(i.includes(what)) result.add(i)
	}

	if(listItems.length === 0) setActive(false)
	result.forEach(item => {
		setActive(true)
		createListItem(item)
	})


}

const createListItem = (text) => {
	const listContainer = document.querySelector('.autocomplete-list')
	const listItem = document.createElement('p');
	listItem.className = 'autocomplete-item';
	listItem.textContent = text;
	listContainer.append(listItem)
}

const setActive = active => {
	const valueContainer = document.querySelector('.input__autocomplete')

	if(active) {
		valueContainer.style.display = 'block'
	} else {
		valueContainer.style.display = 'none'
	}
}

export { autocomplete, setActive } 
