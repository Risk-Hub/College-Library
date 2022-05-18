console.log("Welcome to College Library");
showItem();
function saveItem(book) {
  let booksObject;
  let localBooks = localStorage.getItem("books");
  if (localBooks == null) {
    booksObject = [];
  } else {
    booksObject = JSON.parse(localBooks);
  }
  let myBookObj = {
    name: book.name,
    author: book.author,
    type: book.type,
  };
  booksObject.push(myBookObj);
  localStorage.setItem("books", JSON.stringify(booksObject));
  showItem();
}
function showItem() {
  let booksObject;
  let localBooks = localStorage.getItem("books");
  if (localBooks == null) {
    booksObject = [];
  } else {
    booksObject = JSON.parse(localBooks);
  }
  let html = "";
  booksObject.forEach(function (element, index) {
    html += `<tr>
      <th scope="row">${index + 1}</th>
      <td>${element.name}</td>
      <td>${element.author}</td>
      <td>${element.type}</td>
      <td><button type="button" class="btn btn-outline-danger btn-sm" id="${index}" onclick="deleteItem(this.id)">Delete</button></td>
        </tr>`;
  });
  let tableBody = document.getElementById("tableBody");
  if (booksObject.length != 0) {
    tableBody.innerHTML = html;
  } else {
    tableBody.innerHTML = `<th colspan=4><center>No books added! Use Submit button to add a book</center></th>`;
  }
}
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
class Display {
  add(book) {
    let html;
    html = `<tr class="bookList">
          <th scope="row">1</th>
          <td class="bookListName">${book.name}</td>
          <td>${book.author}</td>
          <td>${book.type}</td>
            </tr>`;
    tableBody.innerHTML += html;
  }
  validate(book) {
    if (book.name.length > 2 || book.author.length > 2) {
      return true;
    } else {
      return false;
    }
  }
  clear() {
    let formGroup = document.getElementById("formGroup");
    formGroup.reset();
  }
  alertMsg(type, msg) {
    let message = document.getElementById("message");
    let text;
    let type1 = "#check-circle-fill";
    let type2 = "#exclamation-triangle-fill";
    if (type === "success") {
      text = "success";
      message.innerHTML = `<div class="alert alert-${type} d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                              <use xlink:href=${type1} />
                            </svg>
                            <div>${msg}</div>
                          </div>`;
    } else {
      text = "danger";
      message.innerHTML = `<div class="alert alert-${type} d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                              <use xlink:href=${type2} />
                            </svg>
                            <div>${msg}</div>
                            </div>`;
    }
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
  }
}
function deleteItem(index) {
  let booksObject;
  let localBooks = localStorage.getItem("books");
  if (localBooks == null) {
    booksObject = [];
  } else {
    booksObject = JSON.parse(localBooks);
  }
  booksObject.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksObject));
  showItem();
}
// Driver Function
let formGroup = document.getElementById("formGroup");
formGroup.addEventListener("submit", function (e) {
  console.log("Submitting");
  let author = document.getElementById("author");
  let bookName = document.getElementById("book");
  let type;
  let physics = document.getElementById("physics");
  let chemistry = document.getElementById("chemistry");
  let mathematics = document.getElementById("mathematics");
  if (physics.checked) {
    type = physics.value;
  }
  if (chemistry.checked) {
    type = chemistry.value;
  }
  if (mathematics.checked) {
    type = mathematics.value;
  }
  let book = new Book(bookName.value, author.value, type);
  let display = new Display();
  if (display.validate(book)) {
    console.log("Book added");
    display.add(book);
    console.log("hi");
    saveItem(book);
    console.log("bye");
    display.clear();
    display.alertMsg("success", "Your book has been added successfully.");
  } else {
    display.alertMsg("danger", "Your book has not been added!");
  }
  e.preventDefault();
});
// let searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click", function (e) {
//   console.log("Searching...");
//   let searchTxt = document.getElementById("searchTxt");
//   let inputVal = searchTxt.value;
//   console.log(inputVal);
//   let bookList = document.getElementsByClassName("bookList");
//   Array.from(bookList).forEach(function (element) {
//     let bookTxt = element.getElementsByClassName("bookListName")[0].innerText;
//     if (bookTxt.includes(inputVal)) {
//       element.style.display = "block";
//     } else {
//       element.style.display = "none";
//     }
//   });
//   e.preventDefault();
// });
