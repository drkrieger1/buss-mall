'use strict';

function Photo(number) {
  this.name = number;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Photo.totalClicks = 0;
  Photo.all.push(this);
}
Photo.all = [];
Photo.allNames = ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','usb','water-can','wine-glass'];

for(var i = 0; i < Photo.allNames.length; i++){
  new Photo(Photo.allNames[i]);
}
Photo.imgElOne = document.getElementById('img1');
Photo.imgElTwo = document.getElementById('img2');
Photo.imgElThree = document.getElementById('img3');
Photo.imgConatner = document.getElementById('img_contaner');
//add id for container


Photo.memoryImg = [];

function randomNumber(){
  return Math.floor(Math.random() * Photo.all.length);
}
function renderImg(){
  var numbers = [];
  numbers[0] = randomNumber();
  numbers[1] = randomNumber();
  numbers[2] = randomNumber();

  while(numbers[0] === numbers[1] || numbers[0] === numbers[2] || numbers[1] === numbers[2]){
    console.log('Dupe Found!');
    numbers[1] = randomNumber();
    numbers[2] = randomNumber();
  }
  // while(){
  //   randomNumber();
  // }
  Photo.imgElOne.src = Photo.all[numbers[0]].source;
  Photo.imgElOne.alt = Photo.all[numbers[0]].name;
  Photo.all[numbers[0]].timesShown += 1;
  Photo.imgElTwo.src = Photo.all[numbers[1]].source;
  Photo.imgElTwo.alt = Photo.all[numbers[1]].name;
  Photo.all[numbers[1]].timesShown += 1;
  Photo.imgElThree.src = Photo.all[numbers[2]].source;
  Photo.imgElThree.alt = Photo.all[numbers[2]].name;
  Photo.all[numbers[2]].timesShown += 1;
}

  // make a for loop that will push random img into a new array and check it
  //at the begining of the random function.



function showList(){
  var ulEl = document.getElementById('list');

  for(var i = 0; i < Photo.all.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Photo.all[i].name + ' was shown ' + Photo.all[i].timesShown + ' times, and clicked ' + Photo.all[i].timesClicked + ' times.';
    ulEl.appendChild(liEl);
  }
}
function handleClick(e){
  Photo.totalClicks += 1;
  console.log(e.target.alt);
  for(var i = 0; i < Photo.all.length; i++){
    if(e.target.alt === Photo.all[i].name){
      Photo.all[i].timesClicked += 1;
    }
  }
  if(Photo.totalClicks === 25){
    Photo.imgConatner.removeEventListener('click', handleClick);
    showList();
    return;
  }
  renderImg();
}
// document.getElementById('img_contaner').addEventListener('click', handleClick);
Photo.imgConatner.addEventListener('click', handleClick);

renderImg();
