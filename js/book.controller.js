'use strict'

var gQueryOptions= {
    filterBy: {txt:'', rating: 0 },
    sortBy: {},
    page:{idx:0, size: 4}
}
var gIsCardView = false


function onInit(){
    render()
}

function render(){
   
    const books = getBooks(gQueryOptions) 

    const elBookTable = document.querySelector('.book-table')
    const elCards = document.querySelector('.card-container')
    const elMain = document.querySelector('.main-content')

    if (gIsCardView) {
        elBookTable.style.display = 'none'
        elCards.style.display = 'flex'
        renderCardView(books, elCards)
    } else {
        elBookTable.style.display = 'table'
        elCards.style.display = 'none'
        renderTableView(books, elBookTable)
    }

}

function renderCardView(books, elContainer){
    var strHtml = books.map(book => `
        <div class="book-card">
            <h3>${book.name}</h3>
            <p><strong>Price:</strong> $${book.price}</p>
            <div class="book-img-container">
                <img class="book-img" src="${book.coverImgUrl}">
            </div>
            <div class="card-footer">
                <div class="rating-cell">
                    ${renderStars(book.rating, book.id)}
                </div>
                <div class="actions">
                    <button class="details" onClick='onShowDetails("${book.id}")'>Details</button>
                    <button class="update" onClick='onUpdateBook("${book.id}")'>Update</button>
                    <button class="delete" onClick='onRemoveBook("${book.id}")'>Delete</button>
                </div>
            </div>
        </div>`)
        elContainer.innerHTML = strHtml.join('')
}

function renderTableView(books, elBookTable){
    const thHtml = `
                    <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Rating</th>
                    </tr>`

    var strHtml = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
                <button class="details" onClick='onShowDetails("${book.id}")'>Details</button>
                <button class="update" onClick='onUpdateBook("${book.id}")'>Update</button>
                <button class="delete" onClick='onRemoveBook("${book.id}")'>Delete</button>
            </td>
            <td class="rating-cell">
            ${renderStars(book.rating, book.id)} 
            </td>
        </tr>
        `)
    elBookTable.innerHTML = thHtml + strHtml.join('')
}

function renderStars(rating, bookId){
    var strHtml = ''
    for (var i = 0; i < 5; i++) {
        strHtml +=`<img onclick="onRate(this, '${bookId}')" src="img/${i < rating ? 'full-star' : 'empty-star'}.png" alt="star" class="star" data-star="${i+1}">`
    }
    return strHtml
}

function onRate(elStar, bookId){
    const updatedRating = elStar.dataset.star
    updateRating(bookId, updatedRating)
    render()
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
    const elAddBookModal = document.querySelector('.add-book-modal')
    const elAddBookForm = elAddBookModal.querySelector('form')

    elAddBookForm.reset() // clears the form
    elAddBookModal.showModal() //show the modal

}

function onSubmitNewBook(ev){
    ev.preventDefault();   

    const bookName = document.querySelector('.title-input').value
    const bookPrice = document.querySelector('.price-input').value
    const bookImgURL = document.querySelector('.img-input').value
    const bookInfo = document.querySelector('.info-input').value
    
    addBook(bookName, bookPrice, bookImgURL,bookInfo)
    render()
    document.querySelector('.add-book-modal').close()

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

function onSetFilter() {
    const elTitle = document.querySelector('.title-search')
    const elRating = document.querySelector('.rating-filter')
    
    gQueryOptions.filterBy.txt = elTitle.value.toLowerCase()
    gQueryOptions.filterBy.rating = +elRating.value
    
    render();
}

function onClearFilters(){
    document.querySelector('.title-search').value = ''
    document.querySelector('.rating-filter').value='0' 

    gQueryOptions.filterBy.txt=''
    gQueryOptions.filterBy.rating = 0
}

function onSetSort(){
    const elSortField = document.querySelector('.sort-options')
    const elSortDir = document.querySelector('.decending')

    gQueryOptions.sortBy.sortField = elSortField.value
    gQueryOptions.sortBy.sortDir = elSortDir.checked ? -1:1

    render()
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


function onToggleView(elToggleBtn) {
    gIsCardView = !gIsCardView
    elToggleBtn.innerText = gIsCardView ? 'Table View' : 'Cards View'
    render()
}

