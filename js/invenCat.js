function addKlik() {
  document.querySelector('.popup').classList.remove("off");
  document.querySelector('.overlay').classList.remove("off");
}

function cancelKlik() {
  document.querySelector('.popup').classList.add("off");
  document.querySelector('.overlay').classList.add("off");
}

const tabel = document.getElementById('tbody');
const catCode = document.getElementById('cat-cd');
const sysCat = document.getElementById('sys-cat');
const astName = document.getElementById('ast-nm');
const astDesc = document.getElementById('ast-desc');

var selectedRow = null

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
    cancelKlik()
  }
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["code"] = catCode.value;
  formData["sys"] = sysCat.value;
  formData["name"] = astName.value;
  formData["desc"] = astDesc.value;
  return formData;
}

function insertNewRecord(data) {
  var newRow = tabel.insertRow(tabel.length);
  newRow.classList.add('warna');
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = '<input type="checkbox" class="chkgroup" name="cbg1[]" value="1">';
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = newRow.rowIndex;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.code;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.name;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.name;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<a onClick="onEdit(this)" class="btn btn-warning btn-sm">Edit</a>
                     <a onClick="onDelete(this)" class="btn btn-danger btn-sm">Delete</a>`;
  resetForm();
  cancelKlik();
}

function resetForm() {
  catCode.value = '';
  sysCat.value = '';
  astName.value = '';
  astDesc.value = '';
  selectedRow = null;
}

function onEdit(td) {
  addKlik()
  selectedRow = td.parentElement.parentElement;
  catCode.value = selectedRow.cells[2].innerHTML;
  astName.value = selectedRow.cells[3].innerHTML;
  astDesc.value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[2].innerHTML = formData.code;
  selectedRow.cells[3].innerHTML = formData.name;
  selectedRow.cells[4].innerHTML = formData.desc;
}

function onDelete(td) {
  row = td.parentElement;
  tabel.deleteRow(row.rowIndex);
  resetForm();
}

function togglecheckboxes(master, group) {
  var cbarray = document.getElementsByName(group);
  for (var i = 0; i < cbarray.length; i++) {
    cbarray[i].checked = master.checked;
  }
}
