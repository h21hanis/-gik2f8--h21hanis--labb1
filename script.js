'use strict';

var htmlbox = `<div style="display: flex" class="w-21 custom-box mb-1 mx-1 "></div>`
let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');
  const root = document.getElementById('root');
  const bookList_item = document.getElementsByClassName('book-list__item');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
  

function CreateInfoBox(Info){
  var node = Info.target;
  
  node.insertAdjacentHTML("afterend", htmlbox)
  const box = document.getElementsByClassName('custom-box')

  getByBookId(node.value).then((book) => RenderInfoBox(book, box[0]))
}

function RenderInfoBox(book, box){

  box.style = "flex-flow: row wrap; border: 5px green; border-style: dashed double none;"


  const head = document.createElement('h1')
  head.innerText = `Rubrik: ${book.title} , Date: (${book.releaseDate})`
  head.style = "display:inline;"

  const author = document.createElement('h1')
  author.innerText = `Författaren: ${book.author}`
  author.style = "display:block"

  const pages = document.createElement('text')
  pages.innerText = `Sidor: boken är ${book.pages} sidor .`
  pages.style = "display:block;"

  const img = document.createElement('img')
  img.src=`${book.coverImage}`;
  img.style = "display:inline;"


  box.appendChild(img)
  box.appendChild(head)
  box.appendChild(author)
  box.appendChild(pages)
  

}

function RemoveDisplay(x){
  var node = x.target;
  var nextSibling = node.nextElementSibling;
  node.parentNode.removeChild(nextSibling);
}

  for (let i=0; i < bookList_item.length; i++){
    bookList_item[i].addEventListener('mouseover', CreateInfoBox)
    bookList_item[i].addEventListener('mouseout', RemoveDisplay)
  }
}
