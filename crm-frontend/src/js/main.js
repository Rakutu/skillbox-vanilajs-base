import { createHeader } from './modules/_headerComponents.js'
import { createSectionAndTitle, createTableToolsList } from './modules/_mainComponents.js'
import { createAddButton } from './modules/_addButtonComponent.js'
import { createModal, createModalForm, createModalDelete } from './modules/_modal.js'
import { addContactBtnEvent } from './modules/_formComponent.js'
import { createStudentList, preloader } from './modules/_mainListComponent.js'
import { formSubmit } from './modules/_form.js'
import { getUserInfo } from './modules/_clientServer.js'
import { openAddForm, openDeleteForm, toolTipActive } from './modules/_eventListeners.js'
import { inputFilter } from './modules/_filter.js';

const clientUrl = 'http://localhost:3000/api/clients';
createHeader();
createSectionAndTitle();
createTableToolsList();
createStudentList();
preloader()
createAddButton();
createModal();





window.addEventListener('DOMContentLoaded', () => {
	openAddForm();
	getUserInfo(clientUrl)
	inputFilter(clientUrl)
	openDeleteForm()
})
