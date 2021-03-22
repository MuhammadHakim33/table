function addKlik() {
  document.querySelector('.popup').classList.remove("off");
  document.querySelector('.overlay').classList.remove("off");
}

function cancelKlik() {
  document.querySelector('.popup').classList.add("off");
  document.querySelector('.overlay').classList.add("off");
}

const tabel = document.getElementById('tbody');
const inNama = document.getElementById('brand-nm');

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
  formData["nama"] = inNama.value;
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
  cell3.innerHTML = data.nama;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<a onClick="onEdit(this)" class="btn btn-warning btn-sm">Edit</a>
                     <a onClick="onDelete(this)" class="btn btn-danger btn-sm">Delete</a>`;
  resetForm();
  cancelKlik();
}

function resetForm() {
  inNama.value = "";
  selectedRow = null;
}

function onEdit(td) {
  addKlik()
  selectedRow = td.parentElement.parentElement;
  inNama.value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[2].innerHTML = formData.nama;
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
