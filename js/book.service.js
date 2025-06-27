'use strict'

const gBooks = [
    {id: makeid(), name:'Adventure time', price:120 },
    {id: makeid(), name:"Jojo's bizzare adventure", price:120 },
    {id: makeid(), name:'Mob psycho 100', price:120 }
]

function getBooks(){
    return gBooks
}

function removeBook(id){
    const bookIdx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookIdx, 1)
}

function updatePrice(id, price){
    const updatedBook = gBooks.find(book => book.id === id).price = price
    return updatedBook
}

function addBook(name, price){
    gBooks.push(createBook(name, price))
}

function createBook(name, price){
    return {id: makeid(), name, price}
}

function getBookById(id){
    return gBooks.find(book => book.id === id)
}
