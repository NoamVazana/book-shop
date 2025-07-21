'use strict'

const STORAGE_KEY = 'books'

var gBooks = _createInitBooks()

function getBooks(options = {}){
    const filterBy = options.filterBy
    const sortBy = options.sortBy

    var books = _filterBooks(filterBy)

    if (sortBy.sortField) {
        switch (sortBy.sortField) {
            case 'title':
                books.sort((book1, book2) => book1.name.toLowerCase().localeCompare(book2.name.toLowerCase()) * sortBy.sortDir)                
                break;
            case 'price':
                books.sort((book1, book2) => (book1.price - book2.price) * sortBy.sortDir)                               
                break;
            case 'rating':
                books.sort((book1, book2) => (book1.rating - book2.rating) * sortBy.sortDir)                                              
                break;
        }
    }

    return books
}

function _filterBooks(filterBy){
    var books = gBooks.slice()

    if (filterBy.txt) {
        books = books.filter(book => book.name.toLowerCase().includes(filterBy.txt))
    }

    if (filterBy.rating) {
        books = books.filter(book => book.rating >= filterBy.rating)
    }
            
    return books

}

function removeBook(id){
    const bookIdx = gBooks.findIndex(book => book.id === id)
    var deletedBook = gBooks.splice(bookIdx, 1)
    _saveBooks()
    return deletedBook[0]
}

function updatePrice(id, price){
    const updatedBook = gBooks.find(book => book.id === id).price = price
    _saveBooks()
    return updatedBook
}

function updateRating(id, rating) {
    const updatedBook = gBooks.find(book => book.id === id).rating = rating
    _saveBooks()
    return updatedBook
}

function addBook(name, price, imgURL, info, rating){
    gBooks.push(createBook(name, price, imgURL, info, rating))
    _saveBooks()
}

function _createInitBooks(){
    gBooks = loadFromStorage(STORAGE_KEY)   //load the saved data from storage
    if(gBooks && gBooks.length > 0) return gBooks //ensures the strage is not empty

    // create demo data
    const atImgUrl = 'https://m.media-amazon.com/images/M/MV5BMjkxMzIwNmQtMzM5Ni00YWJiLTg4YjQtNjBiN2IxMjZhMGQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    const atInfo = 'A psychic middle school boy tries to live a normal life and keep his growing powers under control, even though he constantly gets into trouble.'
    const jojosImgUrl ='https://m.media-amazon.com/images/M/MV5BMzIyNzY4NTMtNmVhYS00OWFhLTkwMWMtOGFkNTdmNWU2ZDdiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    const jojosInfo = 'The story of the Joestar family, who are possessed with intense psychic strength, and the adventures each member encounters throughout their lives.'
    const MobPsyImgUrl = 'https://m.media-amazon.com/images/M/MV5BYzU3NDM4ZjgtY2UyMi00YTczLTgyNDEtMjBiMDJlOGUxNjcxXkEyXkFqcGc@._V1_.jpg'
    const mobPsyInfo = 'A 12-year-old boy and his best friend, a wise 28-year-old dog with magical powers, go on a series of surreal adventures in a remote future.'
    _saveBooks()
   
    return [
        createBook('Adventure time', 120, atImgUrl,atInfo),
        createBook("Jojo's bizzare adventure", 120,jojosImgUrl,jojosInfo ),
        createBook('Mob psycho 100', 120, MobPsyImgUrl, mobPsyInfo)
    ]
}

function createBook(name, price, coverImgUrl, info, rating = 0){
    if(!coverImgUrl) coverImgUrl = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'
    if(!info) info = 'No available info'
    // if(!rating) rating = 0
    _saveBooks()
    return {id: makeid(), name, price, coverImgUrl, info, rating}
}

function getBookById(id){
    return gBooks.find(book => book.id === id)
}


function _saveBooks(){
    saveToLocalStorage(STORAGE_KEY, gBooks)
}

