'use strict';

function Photo(number) {
  this.name = number;
  this.source = 'img/' + this.name + '.jpg';
  this.timeShown = 0;
  Photo.timesClicked = 0;
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

Photo.randomImg = [];
Photo.memoryImg = [];

function randomNumber(){
  Photo.randomImg = [];
  for(var i = 0; i < 4 ; i++){
    var randomIndex = Math.floor(Math.random() * Photo.all.length);
    console.log(randomIndex);
    Photo.randomImg.push(randomIndex);
  };
  while(Photo.randomImg[0] === Photo.randomImg[1] || Photo.randomImg[0] === Photo.randomImg[2] || Photo.randomImg[1] === Photo.randomImg[2]){
    console.log('Dupe Found!');
    randomNumber();
  }
  renderImg();
  for(var j = 0; j < Photo.randomImg.length; j++){
    Photo.memoryImg.push(Photo.randomImg[j]);
  }
  // make a for loop that will push random img into a new array and check it
  //at the begining of the random function.
}
function renderImg(){
  Photo.imgElOne.src = Photo.all[Photo.randomImg[0]].source;
  Photo.imgElOne.alt = Photo.all[Photo.randomImg[0]].name;
  Photo.all[Photo.randomImg[0]].timesShown += 1;
  Photo.imgElTwo.src = Photo.all[Photo.randomImg[1]].source;
  Photo.imgElTwo.alt = Photo.all[Photo.randomImg[1]].name;
  Photo.all[Photo.randomImg[1]].timesShown += 1;
  Photo.imgElThree.src = Photo.all[Photo.randomImg[2]].source;
  Photo.imgElThree.alt = Photo.all[Photo.randomImg[2]].name;
  Photo.all[Photo.randomImg[2]].timesShown += 1;
}
function handleClick(e){
  Photo.totalClicks += 1;
  console.log(e.target.alt);
  for(var i = 0; i < Photo.all.length; i++){
    if(e.target.alt === Photo.all[i].name){
      Photo.all[i].timesClicked += 1;
    }
  }
  randomNumber();
}
// document.getElementById('img_contaner').addEventListener('click', handleClick);
Photo.imgConatner.addEventListener('click', handleClick);

randomNumber();
