'use strict';

function Photo(number) {
  this.name = number;
  this.source = 'img/' + this.name + '.jpg';
  this.timeShown = 0;
  Image.all.push(this);
}

Photo.all = [];
Photo.allNames = ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','usb','water-can','wine-glass'];

for(var i = 0; i < Photo.all.length; i++){
  new Photo(Photo.allNames[i]);
}
