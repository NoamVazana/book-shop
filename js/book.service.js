'use strict'

const gBooks = createInitBooks()

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

function createInitBooks(){
    const atImgUrl = 'https://m.media-amazon.com/images/M/MV5BMjkxMzIwNmQtMzM5Ni00YWJiLTg4YjQtNjBiN2IxMjZhMGQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    const atInfo = 'A psychic middle school boy tries to live a normal life and keep his growing powers under control, even though he constantly gets into trouble.'
    const jojosImgUrl ='https://m.media-amazon.com/images/M/MV5BMzIyNzY4NTMtNmVhYS00OWFhLTkwMWMtOGFkNTdmNWU2ZDdiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    const jojosInfo = 'The story of the Joestar family, who are possessed with intense psychic strength, and the adventures each member encounters throughout their lives.'
    const MobPsyImgUrl = 'https://m.media-amazon.com/images/M/MV5BYzU3NDM4ZjgtY2UyMi00YTczLTgyNDEtMjBiMDJlOGUxNjcxXkEyXkFqcGc@._V1_.jpg'
    const mobPsyInfo = 'A 12-year-old boy and his best friend, a wise 28-year-old dog with magical powers, go on a series of surreal adventures in a remote future.'
    return [
        createBook('Adventure time', 120, atImgUrl,),
        createBook("Jojo's bizzare adventure", 120,jojosImgUrl, ),
        createBook('Mob psycho 100', 120, MobPsyImgUrl, )
    ]
}

function createBook(name, price, coverImgUrl, info){
    if(!coverImgUrl) coverImgUrl = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'
    if(!info) info = 'No available info'
    return {id: makeid(), name, price, coverImgUrl, info}
}

function getBookById(id){
    return gBooks.find(book => book.id === id)
}
