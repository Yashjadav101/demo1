const uData = [
  {
    id: "Fri Aug 05 2022 15:44:56 GMT+0530 (India Standard Time)",
    uname: "John",
    email: "john@example.com",
    gender: "male",
    hobbies: "writing",
    age: 23,
    states: "Gujarat",
    city: "Rajkot",
  },
  {
    id: "Fri Aug 05 2022 15:44:57 GMT+0530 (India Standard Time)",
    uname: "doe",
    email: "doe@example.com",
    gender: "male",
    hobbies: "cooking",
    age: 20,
    states: "Gujarat",
    city: "Surat",
  },
];

const stateArr = {
  chooseState: ["Choose City"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Odisha: ["Bhubaneswar", "Puri", "Cuttack"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Kerala: ["kochi", "Kanpur"],
};

function makeSubmenu(value) {
  console.log("first", value);
  if (value.length)
    document.getElementById("city").innerHTML = "<option></option>";
  else {
    let citiesOptions = "";
    for (cityId in stateArr[value]) {
      citiesOptions += "<option>" + stateArr[value][cityId] + "</option>";
    }
    document.getElementById("city").innerHTML = citiesOptions;
  }
}

function showArr(uData) {
  var row = ``;
  uData.forEach(function (v, i) {
    row += `<tr>
   
    <td>${v.uname}</td>
    <td>${v.email}</td>
    <td>${v.gender}</td>
    <td>${v.hobbies}</td>
    <td>${v.age}</td>
    <td>${v.states}</td>
    <td>${v.city}</td>
    <td><button class = "btn btn-primary" onclick = "onEdit(this)"  >Edit</button></td>
    <td><button class = "btn btn-danger" onclick = "deleterow(this)" >Delete</button></td>`;
  });
  document.getElementById("root").innerHTML = row;
}
showArr(uData);

var selectedRow = null;

function handleSubmit(e) {
  event.preventDefault();
  const d = new Date();
  var id = d.toString();
  // var id  = i + 1;
  var uname = document.getElementById("uname").value;
  var email = document.getElementById("email").value;
  // var gender = document.querySelector('input[type=radio][name=gender]:checked').value;
  var rates = document.getElementsByName("gender");
  var gender;
  for (var i = 0; i < rates.length; i++) {
    if (rates[i].checked) {
      gender = rates[i].value;
    }
  }

  console.log("gender", gender);

  var hobbies = document.querySelectorAll(
    "input[type=checkbox][name=hobbies]:checked"
  );
  // hobbies1 = document.querySelector('input[type=checkbox][name=hobbies]:checked').value;
  // var a = document.getElementsByName("hobbies");
  console.log("hobbies.length", hobbies.value);
  let selected = [];

  for (let i = 0; i < hobbies.length; i++) {
    selected.push(hobbies[i].value);
    // console.log('hobbies[i].value', hobbies)
  }

  var hobbies = selected.join(",");
  var age = document.getElementById("age").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;

  console.log(id, uname, email, age, hobbies, state, city, state);
  if (uname == "") {
    document.getElementById("message").innerHTML = "please enter name";

    return false;
  }
  if (uname.length > 15) {
    document.getElementById("message").innerHTML =
      "please enter less than 15 characters";
    return false;
  }

  if (email == "") {
    document.getElementById("message").innerHTML = "please enter email";
    return false;
  }

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    document.getElementById("message").innerHTML = "please enter valid email";
    return false;
  }

  if (rates[0].checked == false && rates[1].checked == false) {
    document.getElementById("message").innerHTML = "please enter valid gender";
    return false;
  }
  console.log("seleted", selected.length === 0);
  if (!selected.length) {
    document.getElementById("message").innerHTML = "please enter valid hobbies";
    return false;
  }

  if (age == "") {
    document.getElementById("message").innerHTML = "plese enter age";
    return false;
  }

  if (state == "State") {
    document.getElementById("message").innerHTML = "plese select state";
    return false;
  }

  let data = {
    id: id,
    uname: uname,
    email: email,
    gender: gender,
    hobbies: hobbies,
    age: age,
    states: state,
    city: city,
  };

  uData.push(data);

  if (selectedRow == null) {
    insert(data);
  } else {
    handleupdate(data);
    clear();
  }

  // console.log("data",data)

  console.log("uData", uData);

  clear();
}

let form = document.getElementById("myform");
form.addEventListener("submit", handleSubmit);

function insert(data) {
  let table = document
    .getElementById("listItem")
    .getElementsByTagName("tbody")[0];
  // console.log('table', table);

  let row = table.insertRow(table.length);
  // var id = row.insertCell(0);
  var uname = row.insertCell(0);
  var email = row.insertCell(1);
  var gender = row.insertCell(2);
  var hobbies = row.insertCell(3);
  var age = row.insertCell(4);
  var state = row.insertCell(5);
  var city = row.insertCell(6);
  var edit = row.insertCell(7);
  var Delete = row.insertCell(8);

  uname.innerHTML = data.uname;
  email.innerHTML = data.email;
  gender.innerHTML = data.gender;
  hobbies.innerHTML = data.hobbies;
  age.innerHTML = data.age;
  state.innerHTML = data.states;
  city.innerHTML = data.city;
  edit.innerHTML = `<button class = "btn btn-primary" onclick = "onEdit(this)" >Edit</button>`;
  Delete.innerHTML = `<button class = "btn btn-danger" onclick = "deleterow(this)">Delete</button>`;

  document.getElementById("message").innerHTML = "";
}

function clear() {
  document.getElementById("myform").reset();
  makeSubmenu(document.getElementById("state"));
  selectedRow = null;
}

function delBtn() {
  document.getElementById("cancel").style.display = "none";
  clear();
  document.getElementById("submit").innerHTML = "Submit";
}

let row = document.getElementById("root");

function deleterow(td) {
  row.removeChild(td.parentNode.parentNode);
}

function onEdit(td) {
  console.log("td");
  selectedRow = td.parentNode.parentNode;
  console.log("selectedRow", selectedRow);
  document.getElementById("uname").value = selectedRow.cells[0].innerHTML;
  // console.log('uname', document.getElementById("root").rows[0].cells[1].innerHTML )
  document.getElementById("email").value = selectedRow.cells[1].innerHTML;

  type = selectedRow.cells[2].innerHTML;
  if (type == "male") {
    m.checked = true;
  } else if (type == "female") {
    f.checked = true;
  }
  let hob = selectedRow.cells[3].innerHTML;
  let text = hob.split(",");
  let chekboxes = document.querySelectorAll("input[name=hobbies]");
  for (let i = 0; i < text.length; i++) {
    for (const chekbox of chekboxes) {
      text[i] == chekbox.value ? (chekbox.checked = true) : false;
      // text[i] == chekbox.value ? chekbox.checked  : false;
      console.log(
        "text[i] == chekbox.value",
        text[i],
        chekbox.value,
        text[i] == chekbox.value,
        chekbox.checked
      );
    }
    console.log("text[i]", text);
  }

  document.getElementById("age").value = selectedRow.cells[4].innerHTML;
  state = selectedRow.cells[5].innerText;

  document.getElementById("state").value = selectedRow.cells[5].innerText;
  makeSubmenu(state);
  document.getElementById("city").value = selectedRow.cells[6].innerText;
  document.getElementById("submit").innerHTML = "Update";
  document.getElementById("cancel").style.display = "block";
}

function handleupdate(data) {
  console.log("data", data);
  selectedRow.cells[0].innerText = data.uname;
  selectedRow.cells[1].innerText = data.email;
  selectedRow.cells[2].innerText = data.gender;
  selectedRow.cells[3].innerHTML = data.hobbies;
  selectedRow.cells[4].innerText = data.age;
  selectedRow.cells[5].innerText = data.states;
  // console.log('data.state', data.states)
  selectedRow.cells[6].innerText = data.city;

  document.getElementById("submit").innerHTML = "submit";
  document.getElementById("cancel").style.display = "none";
  document.getElementById("message").innerHTML = "";
  delBtn();
  clear();
}

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("root");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    // console.log('td', td)
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortAsd(sort) {
  let rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = sort.value;
  console.log("sort", sort);
  while (switching) {
    switching = false;
    rows = row.rows;
    console.log("rows", rows);
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      console.log("first", x, y);
      if (dir == "ascending") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "descending") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
