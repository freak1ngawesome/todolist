window.addEventListener('DOMContentLoaded',function(){
  let addButton = document.querySelector('.fa-calendar-plus-o'),
  mainList = document.querySelector('.main_list'),
  popup = document.querySelector('.popup'),
  popupClose = popup.querySelector('.popup_close'),
  popupAdd = popup.querySelector('.popup_add'),
  popupLabel = popup.querySelector('.popup_label'),
  popupText = popup.querySelector('.popup_text'),
  defaultTask = mainList.querySelector('.default-item'),
  taskClose = document.querySelectorAll('.item_close'),
  mainItems = mainList.getElementsByClassName('main_item');

  // const moment = require('moment');
  // let indexArray = [],
  let indexCounter;
  
  // console.log(indexCounter);

  class Task{
    constructor(params){
      this.id = params.id,
      this.type = params.type,
      this.time = params.time,
      this.label = params.label,
      this.text = params.text
    }
  };

  fillTaskList();
  function fillTaskList(){
    if (localStorage.length === 0){
      indexCounter = 0;
    }
    indexCounter = localStorage.length;
    console.log(indexCounter);
    for( let i = 0; i < localStorage.length; i++){
      let object = JSON.parse(localStorage.getItem(`Запись ${i + 1}`));
      // indexCounter = object.id;
      addTask(object);
    }
  };

  function addTask (value){
    let item = document.createElement('li');
    item.classList.add('main_item');
    item.innerHTML = `<div class="item_label">${value.label}</div>
    <div class="item_text">${value.text}</div><i class="fa fa-times item_close" aria-hidden="true"></i>`;
    mainList.appendChild(item);
  };

  function deleateItem(num){
    // if (num == (localStorage.length)){
    //   localStorage.removeItem(`Запись ${num}`);
    // }

    for (let i = num; i < localStorage.length; i++){
      let objNext = JSON.parse(localStorage.getItem(`Запись ${i + 1}`));
      objNext.id = num;
      localStorage.setItem(`Запись ${num}`,JSON.stringify(objNext));
    }
    localStorage.removeItem(`Запись ${localStorage.length}`);
    indexCounter = localStorage.length;
    console.log(indexCounter);

  }
  

  addButton.addEventListener('click',()=>{
    popup.style.display = 'block';
    
  });

  popup.addEventListener('click', (e)=>{
    if(e.target.classList.contains('popup') || e.target.classList.contains('popup_close')){
      popup.style.display = 'none';
    }
    
  });

  popupAdd.addEventListener('click', ()=>{
    if (popupLabel.value && popupText.value) {
      let obj = new Task({
        id: ++indexCounter,
        type: 'regular',
        time:  new Date(),
        label: popupLabel.value,
        text: popupText.value
      })
      popupLabel.value = '';
      popupText.value = '';
      localStorage.setItem(`Запись ${indexCounter}`,JSON.stringify(obj));
      addTask(obj);
      popup.style.display = 'none';
      
    } else {
      alert('Заполните все поля');
    }
    // defaultTask.style.display = 'none';
  })



  document.addEventListener('click', function(e){
    if (e.target.classList.contains('item_close')){
      let parentNode = e.target.parentNode;
      let arr = [...mainItems];
      let ind = arr.indexOf(parentNode) + 1;
      mainList.removeChild(parentNode);
      deleateItem(ind);
    }
    

  });
  


});