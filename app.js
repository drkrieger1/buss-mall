'use strict';
var lastShowen = [];
var names = [];
var clicks = [];
var shown = [];
var jasonArray = [];

function Photo(number) {
  this.name = number;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Photo.totalClicks = 0;
  Photo.all.push(this);
}
Photo.all = [];
Photo.allNames = ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','usb','water-can','wine-glass', 'unicorn'];

Photo.imgElOne = document.getElementById('img1');
Photo.imgElTwo = document.getElementById('img2');
Photo.imgElThree = document.getElementById('img3');
Photo.imgConatner = document.getElementById('img_contaner');

function randomNumber(){
  return Math.floor(Math.random() * Photo.all.length);
}
function renderImg(){
  var numbers = [];
  numbers[0] = randomNumber();
  numbers[1] = randomNumber();

  while(numbers[0] === numbers[1]){
    console.log('Dupe Found!');
    numbers[1] = randomNumber();
  }
  numbers[2] = randomNumber();
  while(numbers[2] === numbers[1] || numbers[2] === numbers[0]){
    numbers[2] = randomNumber();
  }
  for(var i = 0; i < numbers.length; i++){
    while (numbers[i] === lastShowen[0] || numbers[i] === lastShowen[1] || numbers[i] === lastShowen[2] || numbers[0] === numbers[1] || numbers[0] === numbers[2] || numbers[1] === numbers[2]) {
      console.log('for while dupe');
      numbers[i] = randomNumber();
    }
  }
  Photo.imgElOne.src = Photo.all[numbers[0]].source;
  Photo.imgElOne.alt = Photo.all[numbers[0]].name;
  Photo.all[numbers[0]].timesShown += 1;
  Photo.imgElTwo.src = Photo.all[numbers[1]].source;
  Photo.imgElTwo.alt = Photo.all[numbers[1]].name;
  Photo.all[numbers[1]].timesShown += 1;
  Photo.imgElThree.src = Photo.all[numbers[2]].source;
  Photo.imgElThree.alt = Photo.all[numbers[2]].name;
  Photo.all[numbers[2]].timesShown += 1;
  lastShowen = numbers;
}

function cache(){
  localStorage.setItem('clicks', JSON.stringify(jasonArray));
}
function summonCache(){
  jasonArray = JSON.parse(localStorage.clicks);
}
//+++++++++++++++++Clear Servay+++++++++++++++++
function surveyDelete(){
  alert('Thank you for taking our survey!');
  Photo.imgElOne.src = '';
  Photo.imgElTwo.src = '';
  Photo.imgElThree.src = '';
  Photo.imgElOne.alt = '';
  Photo.imgElTwo.alt = '';
  Photo.imgElThree.alt = '';
}
//---------This is the list------------------
// function showList(){
//   var ulEl = document.getElementById('list');
//
//   for(var i = 0; i < Photo.all.length; i++){
//     var liEl = document.createElement('li');
//     liEl.textContent = Photo.all[i].name + ' was shown ' + Photo.all[i].timesShown + ' times, and clicked ' + Photo.all[i].timesClicked + ' times.';
//     ulEl.appendChild(liEl);
//   }
// }
function handleClick(e){
  if(e.target.id === 'img_contaner'){
    return alert('Please select a photo');
  }
  Photo.totalClicks += 1;
  console.log(e.target.alt);
  for(var i = 0; i < Photo.all.length; i++){
    if(e.target.alt === Photo.all[i].name){
      Photo.all[i].timesClicked += 1;
    }
  }
  if(Photo.totalClicks === 25){
    jasonArray.push(Photo.all);
    Photo.imgConatner.removeEventListener('click', handleClick);
    // showList();
    surveyDelete();
    tableUpdate();
    cache();
    console.log('chache in bank yo!');
    drawChart();
    return;
  }
  renderImg();
}

//Update Table data
function tableUpdate(){
  for(var i = 0; i < Photo.all.length; i++){
    shown[i] = Photo.all[i].timesShown;
    clicks[i] = Photo.all[i].timesClicked;
    names[i] = Photo.all[i].name;
  }
}
var data = {
  labels: names,
  datasets: [
    {
      data: clicks,
      label: 'Click Chart',
      backgroundColor: [
        '#58D68D',
        '#D2B4DE',
        '#F1C40F',
        '#D35400',
        '#E74C3C',
        '#5DADE2',
        '#76D7C4',
        '#641E16',
        '#16A085',
        '#D35400',
        '#D2B4DE',
        '#F1C40F',
        '#D35400',
        '#E74C3C',
        '#5DADE2',
        '#76D7C4',
        '#641E16',
        '#16A085',
        '#D35400',
        '#42f4f1'
      ],
      hoverBackgroundColor:[
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4',
        '#D0D3D4'
      ]
    }
  ]
};

//Chart
function drawChart(){
  var ctx = document.getElementById('chart').getContext('2d');
  clickChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      anamation: {
        duration: 1000,
        easing: 'easOutBounce'
      }
    },
    scales:{
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }

  });

}

if(localStorage.clicks){
  summonCache();
  console.log('Summoned Cache!');
  for(var i = 0; i < Photo.allNames.length; i++){
    new Photo(Photo.allNames[i]);
  }

}else{
  for(var j = 0; j < Photo.allNames.length; j++){
    new Photo(Photo.allNames[j]);
  }
}

renderImg();
Photo.imgConatner.addEventListener('click', handleClick);
