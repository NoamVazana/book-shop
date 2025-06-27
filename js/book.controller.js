'use strict'

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
    const Books = getBooks()

    var strHtml = Books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
                <button class="read" onClick='onReadBook("${book.id}")'>Read</button>
                <button class="update" onClick='onUpdateBook("${book.id}")'>Update</button>
                <button class="delete" onClick='onRemoveBook("${book.id}")'>Delete</button>            </td>
        </tr>
        `)
    elBookTable.innerHTML = thHtml + strHtml.join('')
}

function onRemoveBook(id){
    removeBook(id)
    render()
}