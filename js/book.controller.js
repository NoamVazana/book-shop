'use strict'

function onInit(){
    render()
}

function render(){
    const elBookTable = document.querySelector('.book-table')
    const Books = getBooks()

    var srtHtml = Books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
                <button class="read">Read</button>
                <button class="update">Update</button>
                <button class="delete">Delete</button>            </td>
        </tr>
        `)
    elBookTable.innerHTML += srtHtml.join('')

}