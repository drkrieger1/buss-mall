'use strict';

function Photo(number) {
  this.name = number;
  this.source = 'img/' + this.name + '.jpg';
  this.timeShown = 0;
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

Photo.randomImg = [];


function randomNumber(){
  Photo.randomImg = [];
  for(var i = 0; i < 4 ; i++){
    var randomIndex = Math.floor(Math.random() * Photo.all.length);
    console.log(randomIndex);
    Photo.randomImg.push(randomIndex);
  };
  while(Photo.randomImg[0] === Photo.randomImg[1] || Photo.randomImg[0] === Photo.randomImg[2] || Photo.randomImg[1] === Photo.randomImg[2]){
    randomNumber();
  }
  Photo.imgElOne.src = Photo.all[Photo.randomImg[0]].source;
  Photo.imgElOne.alt = Photo.all[Photo.randomImg[0]].name;
  Photo.imgElTwo.src = Photo.all[Photo.randomImg[1]].source;
  Photo.imgElTwo.alt = Photo.all[Photo.randomImg[1]].name;
  Photo.imgElThree.src = Photo.all[Photo.randomImg[2]].source;
  Photo.imgElThree.alt = Photo.all[Photo.randomImg[2]].name;
}

document.getElementById('img1').addEventListener('click', randomNumber);
document.getElementById('img2').addEventListener('click', randomNumber);
document.getElementById('img3').addEventListener('click', randomNumber);


randomNumber();
