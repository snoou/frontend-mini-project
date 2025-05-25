const searchIcon = document.getElementById('search-icon')
const search = document.getElementById('search')
const item = document.getElementById('item')
const close = document.getElementById('close')
searchIcon.addEventListener('click' , function(){
    item.style.display  = 'none'
    search.style.display = 'block'
    close.style.display = 'block'
})

close.addEventListener('click' , function(){
    search.style.display = 'none'
    item.style.display  = 'flex'
    close.style.display = 'none'

})