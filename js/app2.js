const openModalBtn = document.querySelector(".open-modal");
const modalScreen = document.querySelector(".modal-screen");
const closeModalBtn = document.querySelector(".close");
const addBookBtn = document.querySelector(".continue");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const releaseInput = document.querySelector(".release-input");
const booksContainer = document.querySelector("tbody");
const booksCountElem = document.querySelector(".books-count");

const books = [];

function showModal() {
  modalScreen.classList.remove("hidden");
}

function hideModal() {
  modalScreen.classList.add("hidden");
}

function addBook() {
  const title = titleInput.value;
  const author = authorInput.value;
  const releaseYear = releaseInput.value;

  const newBook = {
    id: Math.floor(Math.random() * 99999),
    title: title,
    author: author,
    releaseYear: releaseYear,
  };

  books.push(newBook);
  saveIntoLocalStorage(books);
  showBooks(books);
  hideModal();
  clearInputs();
}

function clearInputs() {
  titleInput.value = "";
  authorInput.value = "";
  releaseInput.value = "";
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
          <td class="px-6 py-4">${book.releaseYear}</td>
        </tr>
      `
    );
  });

  booksCountElem.innerHTML = books.length;
}

function saveIntoLocalStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function fetchBooksFromLocalStorage() {
  const localBooks = JSON.parse(localStorage.getItem("books"));

  if (localBooks) {
    books = localBooks;
  }
}

openModalBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
addBookBtn.addEventListener("click", addBook);
