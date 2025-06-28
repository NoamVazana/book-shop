'use strict'

var gFilterBy = ''


function onInit(){
    render()
}

function render(){
    const thHtml = `
    <tr>
      <th>Title</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>`

    const elBookTable = document.querySelector('.book-table')
    const books = getBooks(gFilterBy)

    var strHtml = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
                <button class="details" onClick='onShowDetails("${book.id}")'>Details</button>
                <button class="update" onClick='onUpdateBook("${book.id}")'>Update</button>
                <button class="delete" onClick='onRemoveBook("${book.id}")'>Delete</button>            </td>
        </tr>
        `)
    elBookTable.innerHTML = thHtml + strHtml.join('')
}

function onRemoveBook(id){
    var deletedBook = removeBook(id)
    render()
    showSuccessMsg(`The book ${deletedBook.name} was removed successfully`)
}

function onUpdateBook(id){
    var price = prompt('Please enter the updated price:')
    var updatedBook = updatePrice(id, price)
    render()
    showSuccessMsg(`The book ${updatedBook} has been updated successfully`)
}

function onAddBook(){
    var bookName = prompt("Please add the book's name")
    var bookPrice = prompt("Please add the book's price")
    var bookImgURL = prompt('Please add a URL to the cover image. click enter to skip')
    var bookInfo = prompt('Please add info about the book. click enter to skip')

    addBook(bookName, bookPrice, bookImgURL,bookInfo)
    render()
    showSuccessMsg(`The book ${bookName} has been added successfully`)
}

function onShowDetails(bookId){
    const book = getBookById(bookId)
    const elDetailsModal = document.querySelector('.book-details')
    const elForm = elDetailsModal.querySelector('form'); 

    var innerHTML = `
            <button>x</button>
            <header>
                <h2 class="title">${book.name}</h2> 
                <p class="price">price: ${book.price}$</p>                      
            </header>
            <img class="book-img" src="${book.coverImgUrl}">
            <p class="info">${book.info}</p>`

    elForm.innerHTML= innerHTML
    elDetailsModal.showModal()
}

function onFilter(ev){
    ev.preventDefault();         
    const elInput = document.querySelector('input')
    if (!elInput.value) return

    gFilterBy = elInput.value
    render()
}

function onSetFilter(txt) {
  gFilterBy = txt;
  render();
}

function onClearFilter() {
  gFilterBy = '';
  doctument.querySelector('.input').value = ''
  render();
}

function showSuccessMsg(msg){
    const elSuccessModal = document.querySelector('.success-message')
    const elForm = elSuccessModal.querySelector('form'); 

    elForm.innerHTML= `
        <button>x</button>
        <p>${msg}</p>
    `
    elSuccessModal.showModal()
     setTimeout(() => elSuccessModal.close(), 2000)
}


