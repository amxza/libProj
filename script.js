const newBookBtn = document.getElementById("newBookBtn");
const bookModal = document.getElementById("bookModal");
const library = document.querySelector("#library");
const cardBtns = document.querySelector(".card-buttons");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

function Book(title, author, pages, isRead) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

}

function getBookId(book) {
  return book.id;
}



const myLibrary = [];



function displayBooks() {
  library.innerHTML = "";
  for(const book of myLibrary) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const pAuthor = document.createElement("p");
    const pPages = document.createElement("p");
    const pRead = document.createElement("p");

    const divBtns = document.createElement("div");
    const toggleBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    divBtns.classList.add("card-buttons");
    toggleBtn.classList.add("toggle-read-btn");
    toggleBtn.textContent = "Toggle Read"
    deleteBtn.classList.add("remove-btn");
    deleteBtn.textContent = "Remove";
    deleteBtn.dataset.id = book.id;

    divBtns.append(toggleBtn);
    divBtns.append(deleteBtn);

    toggleBtn.addEventListener("click", () => {
      if(book.isRead === true) {
        book.isRead = false;
        pRead.classList.remove("card-status", "read");
        pRead.classList.add("card-status", "not-read");
        pRead.textContent = "Not Read";
      }
      else if(book.isRead === false) {
        book.isRead = true;
        pRead.classList.remove("card-status", "not-read");
        pRead.classList.add("card-status", "read");
        pRead.textContent = "Read";
      }
    });

    deleteBtn.addEventListener("click", (event) => {
      const targetId = event.target.dataset.id;
      removeBook(targetId);
    });
    

    div.classList.add("card");
    h3.classList.add("card-title");
    pAuthor.classList.add("card-author");
    pPages.classList.add("card-pages")
    if (book.isRead === true) {
      pRead.classList.add("card-status", "read");
      pRead.textContent = "Read";
    }
    else {
      pRead.classList.add("card-status", "not-read");
      pRead.textContent = "Not Read";
    }
    h3.textContent = book.title;
    pAuthor.textContent = `by ${book.author}`;
    pPages.textContent = `${book.pages} pages`;
    div.append(h3);
    div.append(pAuthor);
    div.append(pPages);
    div.append(pRead);
    div.append(divBtns);
    library.append(div);
  }  
}



newBookBtn.addEventListener("click", () => {
  bookModal.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookModal.close();
})

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = Number(document.getElementById("pages").value);
  const isRead = document.getElementById("isRead").checked;

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  
  displayBooks();
  bookForm.reset();
  bookModal.close();
})

function removeBook(bookID) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookID);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }
    displayBooks();
}

displayBooks();

