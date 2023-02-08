// localStorage.removeItem('obj');
let TaskObj = {
	items : [],
	};
let index=0;

if(localStorage.getItem('obj')==""||localStorage.getItem('obj')==undefined){
	localStorage.setItem('obj',JSON.stringify(TaskObj.items));
	index=0;
}
else{
	index = JSON.parse(localStorage.getItem('obj')).length;
}


addItem = () => {
	// document.getElementById('added').style.display = "none";
	document.getElementById('invalidDate').style.display = "none";
	document.getElementById('emptyEdate').style.display = "none";
	document.getElementById('emptySdate').style.display = "none";
	document.getElementById('invalidName').style.display = "none";
	document.getElementById('emptyName').style.display = "none";
	let addButton= document.getElementById("addButton");
	let editButton = document.getElementById("update");
	let name = document.getElementById("addName");
	let desc = document.getElementById("addDescription");
	let status = document.getElementById("status");
	let sDate = document.getElementById("startDate");
	let eDate = document.getElementById("endDate");
	addButton.style.display = "block";
	editButton.style.display = "none";
	let regEx = /^[a-zA-Z][a-zA-Z 0-9]*$/;
	if(name.value==""){
		document.getElementById('invalidName').style.display = "none";
		document.getElementById('emptyName').style.display = "block";
	}
	else if(!regEx.test(name.value) ){
		document.getElementById('emptyName').style.display = "none"
		document.getElementById('invalidName').style.display = "block";
	}
	else if(sDate.value==""){
		document.getElementById('emptySdate').style.display = "block";
	}
	else if(eDate.value==""){
		document.getElementById('emptyEdate').style.display = "block";
	}
	else if(eDate.value<sDate.value){
		document.getElementById('invalidDate').style.display = "block";
	}
	else {
		document.getElementById('invalidDate').style.display = "none";
		document.getElementById('emptyEdate').style.display = "none";
		document.getElementById('emptySdate').style.display = "none";
		document.getElementById('invalidName').style.display = "none";
		document.getElementById('emptyName').style.display = "none";
		// document.getElementById('added').style.display = "block";
		alert('Your task has been added');
		listObj(index, name, desc, status, sDate, eDate);
		index++;
	}
}





listObj = (taskIndex, taskName, taskDesc, taskStatus, taskStart, taskEnd) => {
	

	// console.log(TaskObj);
	let itemId = 'item'+ taskIndex;
	let itemObj = {index: index, id: itemId, name: taskName.value, description: taskDesc.value, status: taskStatus.value, start: taskStart.value, end: taskEnd.value, add: 1, edit:0};
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	// console.log(typeof(TaskObj));
	// console.log(TaskObj);
	TaskObj.items.push(itemObj);
	console.log(TaskObj);
	localStorage.removeItem('obj');
	localStorage.setItem('obj',JSON.stringify(TaskObj.items));	
	let name = document.getElementById("addName");
	let desc = document.getElementById("addDescription");
	let status = document.getElementById("status");
	let sDate = document.getElementById("startDate");
	let eDate = document.getElementById("endDate");
	name.value = '';
	desc.value = '';
	status.value ='Active';
	sDate.value = '';
	eDate.value = '';
}




displayItems = () => {
	// let show = document.getElementById('show');
	// show.style.display = "none";
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	console.log(TaskObj);
	for(i=0;i<TaskObj.items.length;i++){
		TaskObj.items[i].edit = 0;
		TaskObj.items[i].add = 1;
	}
	localStorage.removeItem('obj');
	localStorage.setItem('obj', JSON.stringify(TaskObj.items));
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));

	let listContainer = document.querySelector('#listContainer');
	
	

	for(i=0;i<TaskObj.items.length;i++){
		// let x = TaskObj.items[i];
		let itemPointer = TaskObj.items[i];
		//Container
		let itemContainer = document.createElement('div');
		itemContainer.setAttribute('id',itemPointer.id);
		listContainer.appendChild(itemContainer);
		itemContainer.setAttribute('class', 'itemContainer');

		//index Number
		let itemNo = document.createElement('div');
		let itemNoText = document.createTextNode(itemPointer.index+1);
		itemNo.appendChild(itemNoText);
		// itemNo.style.padding = '25px';
		itemNo.setAttribute('class','list-item');
		itemNo.style.width = '5%';

		//Name
		let itemName = document.createElement('div');
		let itemNameText = document.createTextNode(itemPointer.name);
		itemName.appendChild(itemNameText);
		// itemName.style.padding = '25px';
		itemName.setAttribute('class','list-item');
		itemName.setAttribute('id','name'+itemPointer.index);

		//description
		let itemDesc =document.createElement('div');
		let itemDescText = document.createTextNode(itemPointer.description);
		itemDesc.appendChild(itemDescText);
		// itemDesc.style.padding = '25px';
		itemDesc.setAttribute('class','list-item');
		itemDesc.setAttribute('id','desc'+itemPointer.index);

		//Status
		let itemStatus = document.createElement('div');
		let itemStatusText = document.createTextNode(itemPointer.status);
		itemStatus.appendChild(itemStatusText);
		// itemStatus.style.padding = '25px';
		itemStatus.setAttribute('class','list-item');
		itemStatus.setAttribute('id','stat'+itemPointer.index);

		//Edit button
		let editButtonCon =document.createElement('div');
		let editButton = document.createElement('button');
		// let editAnchor =document.createElement('a')
		let editText = document.createTextNode('Edit');
		// editAnchor.appendChild(editButton);
		editButtonCon.appendChild(editButton);
		editButton.appendChild(editText);
		// editAnchor.setAttribute('href','index.html');	
		editButtonCon.setAttribute('class', 'list-item');
		editButton.setAttribute('id', 'edit'+itemPointer.index);
		editButton.setAttribute('onclick','editId(this.id)');
		editButtonCon.style.width = '10%';
		// editButtonCon.style.marginLeft = '5px';

		//delete Button
		let deleteButtonCon = document.createElement('div');
		let deleteButton = document.createElement('button');
		let deleteText = document.createTextNode('delete');
		deleteButtonCon.appendChild(deleteButton);
		deleteButton.appendChild(deleteText);
		// deleteButton.style.marginLeft ='10px';
		deleteButtonCon.setAttribute('class', 'list-item');
		deleteButton.setAttribute('id', itemPointer.index);
		deleteButton.setAttribute('onclick', 'deleteItem(this.id)')
		deleteButtonCon.style.width = '10%';
		deleteButton.style.margin = 'auto';
		// deleteButton.style.padding = 'auto';
		// deleteButtonCon.style.marginLeft='5px';
		// deleteButton

		//Date
		let startDate = new Date(TaskObj.items[i].start);
		let endDate = new Date(TaskObj.items[i].end);

		let itemStartDate = document.createElement('div');
		let itemsdText = document.createTextNode(startDate.getDate() + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear()); 
		itemStartDate.appendChild(itemsdText);
		itemStartDate.setAttribute('id', 'strt'+itemPointer.index);
		// itemStartDate.style.padding ='25px';
		itemStartDate.setAttribute('class','list-item');

		let itemEndDate = document.createElement('div');
		let itemedText = document.createTextNode(endDate.getDate() + "/" + (endDate.getMonth()+1) + "/" + endDate.getFullYear()); 
		itemEndDate.appendChild(itemedText);
		itemEndDate.setAttribute('id','endd'+itemPointer.index);
		// itemEndDate.style.padding ='25px';
		itemEndDate.setAttribute('class','list-item');



		itemContainer.appendChild(itemNo);
		itemContainer.appendChild(itemName);
		itemContainer.appendChild(itemDesc);
		itemContainer.appendChild(itemStatus);
		itemContainer.appendChild(itemStartDate);
		itemContainer.appendChild(itemEndDate);
		itemContainer.appendChild(editButtonCon);
		itemContainer.appendChild(deleteButtonCon);
		itemContainer.style.marginLeft = '10px';
		itemContainer.style.marginRight = '10px';
		// itemContainer.style.marginBottom = '10px';
	}

}




deleteItem = (deleteId) => {
	let indexNo=0;
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	for(i=0;i<TaskObj.items.length;i++){
		if(TaskObj.items[i].id == 'item'+deleteId){
			indexNo = TaskObj.items[i].index;
		}
	}

	TaskObj.items.splice(indexNo,1);
	for(i=indexNo;i<TaskObj.items.length;i++){
		TaskObj.items[i].index-=1;
	}
	console.log(TaskObj);
	document.getElementById(deleteId).parentNode.remove();
	localStorage.removeItem('obj');
	localStorage.setItem('obj', JSON.stringify(TaskObj.items));
	location.reload();
	alert('Task has been deleted');
}



let eId ="";
editId = (edit_id) => {
	eId = edit_id;
	let indexNum;
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	for(i=0;i<TaskObj.items.length;i++){
		let str = TaskObj.items[i].id;
		if(str.slice(-1) == eId.slice(-1)){
			indexNum = TaskObj.items[i].index;
		}
	}
	TaskObj.items[indexNum].add = 0;
	TaskObj.items[indexNum].edit = 1;
	localStorage.removeItem('obj');
	localStorage.setItem('obj',JSON.stringify(TaskObj.items));
	window.location.href="https://rajakhani.github.io/to-do-using-only-JS/";
	
}

editUpdate = (indexNumber) => {
	let addButton= document.getElementById("addButton");
	let updateButton = document.getElementById("update");
	let name = document.getElementById("addName");
	let desc = document.getElementById("addDescription");
	let status = document.getElementById("status");
	let sDate = document.getElementById("startDate");
	let eDate = document.getElementById("endDate");
	updateButton.style.display = "block";
	addButton.style.display = "none";
	TaskObj.items=JSON.parse(localStorage.getItem('obj'));
	name.value = TaskObj.items[indexNumber].name;
	desc.value =TaskObj.items[indexNumber].description;
	status.value = TaskObj.items[indexNumber].status;
	sDate.value = TaskObj.items[indexNumber].start;
	eDate.value = TaskObj.items[indexNumber].end;
	
}


editItem = () => {
	let name = document.getElementById("addName");
	let desc = document.getElementById("addDescription");
	let status = document.getElementById("status");
	let sDate = document.getElementById("startDate");
	let eDate = document.getElementById("endDate");
	let indexNum=0;
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	for(i=0;i<TaskObj.items.length;i++){
		if(TaskObj.items[i].add==0 && TaskObj.items[i].edit==1){
			indexNum=i;
			break;
		}
	}

	let regEx = /^[a-zA-Z][a-zA-Z 0-9]*$/;


	if(!regEx.test(name.value) ){
		document.getElementById('emptyName').style.display = "none"
		document.getElementById('invalidName').style.display = "block";
	}
	
	else if (eDate.value<sDate.value)
		document.getElementById('invalidDate').style.display = "block";

	else{
		if(name.value!=""){
			TaskObj.items[indexNum].name = name.value;
		}
		if(desc.value!=""){
			TaskObj.items[indexNum].description = desc.value;	
		}
		if(status.value!=""){
			TaskObj.items[indexNum].status = status.value;
		}
		if(sDate.value!=""){
			TaskObj.items[indexNum].start = sDate.value;
		}
		if (eDate.value!="") {
			TaskObj.items[indexNum].end = eDate.value;
		}
		document.getElementById('emptyName').style.display = "none"
		document.getElementById('invalidName').style.display = "none";
		document.getElementById('invalidDate').style.display = "none";
		// document.getElementById('updated').style.display = "block";
		alert('Your task has been updated');
	}
	TaskObj.items[indexNum].edit = 0;
	TaskObj.items[indexNum].add = 1;
	localStorage.removeItem('obj');
	localStorage.setItem('obj', JSON.stringify(TaskObj.items));
	
	console.log(TaskObj);
}

check = () => {
	// document.getElementById('updated').style.display = "none";
	// document.getElementById('added').style.display = "none";
	TaskObj.items = JSON.parse(localStorage.getItem('obj'));
	let indexNumber=0;
	for(i=0;i<TaskObj.items.length;i++){
		if(TaskObj.items[i].add==0 && TaskObj.items[i].edit==1){
			indexNumber=i;
			editUpdate(indexNumber);
			break;
		}
	}
}


reset = () => {
	localStorage.removeItem('obj');
	alert("List has been reseted");
	window.location.href="https://rajakhani.github.io/to-do-using-only-JS/";
}
