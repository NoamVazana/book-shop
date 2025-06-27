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
