const modal = document.querySelector(".modal-screen");
const createBook = document.querySelector(".open-modal");
const closeXButton = document.querySelector(".close-x-button");
const closeElem = document.querySelector(".close");
const continueElem = document.querySelector(".continue");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const releaseInput = document.querySelector(".release-input");
const booksContainer = document.querySelector("tbody");
const countElem = document.querySelector(".books-count");

//?<------------initialization zone--------------->
let bookList = [];
//<------------initialization zone--------------->
createBook.addEventListener("click", showModal);
closeXButton.addEventListener("click", hideModal);
closeElem.addEventListener("click", hideModal);
continueElem.addEventListener("click", addBookToList);
//!<--------------function zone------------------->
function showModal() {
  modal.classList.remove("hidden");
}
function hideModal() {
  modal.classList.add("hidden");
}
function saveInToLocalStorage(bookList) {
  localStorage.setItem("bookList", JSON.stringify(bookList));
}
function addBookToList() {
  const title = titleInput.value;
  const author = authorInput.value;
  const release = releaseInput.value;
  const newBook = {
    id: Math.floor(Math.random() * 9999),
    title,
    author,
    release,
  };
  bookList.push(newBook);
  clearInput();
  saveInToLocalStorage(bookList);
  hideModal();
  showBooks(bookList);
}
function showBooks(books) {
  booksContainer.innerHTML = "";
  books.forEach(function (book) {
    booksContainer.insertAdjacentHTML(
      "beforeend",
      `
          <tr class="table-row">
          <th scope="row" class="th">${book.title}</th>
          <td class="px-6 py-4">${book.author}</td>
          <td class="px-6 py-4">${book.release}</td>
        </tr>
        `,
    );
  });
  countElem.innerHTML = books.length;
}

function fetchBooksFromLocalStorage() {
  const localBooks = JSON.parse(localStorage.getItem("bookList"));

  if (localBooks) {
    bookList = localBooks;
  }
  showBooks(bookList)
}

function clearInput() {
  titleInput.value = "";
  authorInput.value = "";
  releaseInput.value = "";
}
