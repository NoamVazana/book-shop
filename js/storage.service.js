'use strict'

function saveToLocalStorage(key, val){
    const json = JSON.stringify(val)
    localStorage.setItem(key,json)
}

function loadFromStorage(key){
    return JSON.parse(localStorage.getItem(key))
}