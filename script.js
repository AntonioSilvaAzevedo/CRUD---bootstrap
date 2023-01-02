const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const fName = document.querySelector("#f-name");
const lName = document.querySelector("#l-name");
const email = document.querySelector("#email");
const birthday = document.querySelector("#birthday");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

function openModal() {
  let modal = document.getElementById("modalContainer");
  let openModal = new bootstrap.Modal(modal);
  openModal.show();
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.fName}</td>
    <td>${item.lName}</td>
    <td>${item.email}</td>
    <td>${item.birthday}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class="bi bi-pencil-square"></i></span></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = fName.value;
    itens[id].lname = lName.value;
    itens[id].email = email.value;
    itens[id].birthday = birthday.value;
  } else {
    itens.push({
      fName: fName.value,
      lName: lName.value,
      email: email.value,
      birthday: birthday.value,
    });
  }

  setItensBD();

  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();
