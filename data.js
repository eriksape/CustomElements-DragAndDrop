
import './components/custom-group-list.js';

const main = document.getElementById('main');

const list = document.createElement('custom-group-list');
list.results = window.data;
main.appendChild(list);
list.addEventListener('list-changed', function(e){
    console.log(e.currentTarget.results)
});

document.getElementById('insert-action').addEventListener('click', function(e){
    e.preventDefault();
    let inputText = document.getElementById('input-text');
    if(inputText.value != ''){
        list.addData = {name: inputText.value}
        inputText.value = '';
    }

});