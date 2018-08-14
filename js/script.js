'use strict';

let clickCounter = 0;

function voteTally(a, b) {
  if (a.votes < b.votes) {
    return 1;
  }
  if (a.votes > b.votes) {
    return -1;
  }
  return 0;
}

// create product constructor
function Product(filename, heading) {
  this.filename = filename;
  this.heading = heading;
  this.votes = 0;
  this.displays = 0;
  this.status = 'available'; // determins if product can currently be used
  Product.allProducts.push(this);
}

Product.allProducts = [];

// grab all voting buttons
const voteBtn1 = document.getElementById('voting-btn-1');
const voteBtn2 = document.getElementById('voting-btn-2');
const voteBtn3 = document.getElementById('voting-btn-3');

// grab images and product names
const imgArr = [
  document.getElementById('img-1'),
  document.getElementById('img-2'),
  document.getElementById('img-3'),
];

const h3Arr = [
  document.getElementById('img1-name'),
  document.getElementById('img2-name'),
  document.getElementById('img3-name')
];

// grab sections
const votePanel = document.getElementById('vote-panel');
const resultPanel = document.getElementById('result-panel');

// generate random number for products
function randomProductGenerator() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// function for casting vote
function castVote(x) {
  clickCounter++;
  const chosenProduct = Product.allProducts.find((product) => {
    if (product.heading === h3Arr[x].innerText) {
      return product;
    }
  });
  chosenProduct.votes++;
  if (clickCounter < 25) {
    productPicker();
  } else {
    displayResults();
  }
}

// places random products
let indexTracker = [];
function productPicker() {
  let currentDisplays = [];
  const previousDisplay = indexTracker;
  for (let i = 0; i < 3; i++) {
    let j = randomProductGenerator();
    while (currentDisplays.includes(j) || previousDisplay.includes(j)) {
      j = randomProductGenerator();
    }
    currentDisplays.push(j);
    const pickedProduct = Product.allProducts[j];
    imgArr[i].src = `img/products/${pickedProduct.filename}`;
    imgArr[i].alt = pickedProduct.heading;
    h3Arr[i].innerText = pickedProduct.heading;
    pickedProduct.displays += 1;
  }
  indexTracker = currentDisplays;
}

// function to display results
function displayResults() {
  votePanel.classList.add('hidden');
  resultPanel.classList.remove('hidden');
  const newList = document.createElement('ul');
  const finalResult = Product.allProducts.sort(voteTally);
  finalResult.forEach((item) => {
    const newItem = document.createElement('li');
    const itemHead = document.createElement('h4');
    const headText = document.createTextNode(item.heading);
    newItem.appendChild(itemHead).appendChild(headText);
    const itemVotes = document.createElement('p');
    const voteText = document.createTextNode(`Votes: ${item.votes}`);
    newItem.appendChild(itemVotes).appendChild(voteText);
    const itemPercent = document.createElement('p');
    const percentText = document.createTextNode(`You voted for this ${Math.floor((item.votes / item.displays) * 100)}% of the time.`);
    newItem.appendChild(itemPercent).appendChild(percentText);
    newList.appendChild(newItem);
  });
  resultPanel.appendChild(newList);
}

// create all products
new Product('bag.jpg', 'R2-D2 Bag');
new Product('banana.jpg', 'Banana Slicer');
new Product('bathroom.jpg', 'Bathroom Tablet Holder');
new Product('boots.jpg', 'Yellow Rubber Boots');
new Product('breakfast.jpg', '3-in-1 Breakfast Maker');
new Product('bubblegum.jpg', 'Meatball Bubble Gum');
new Product('chair.jpg', 'A Convex-Seated Chair');
new Product('cthulhu.jpg', 'C\'thulhu Action Figure');
new Product('dog-duck.jpg', 'Duck Beak-Shaped Muzzle');
new Product('dragon.jpg', 'Canned Dragon Meat');
new Product('pen.jpg', 'Utensil-Shaped Pens');
new Product('pet-sweep.jpg', 'Pet Sweep Dusting Dog Mittens');
new Product('scissors.jpg', 'Pizza Cutting Scissors');
new Product('shark.jpg', 'Shark Sleeping Bag');
new Product('sweep.png', 'Dusting Baby Onesie');
new Product('tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Product('unicorn.jpg', 'Unicorn Meat');
new Product('usb.gif', 'Tenticle USB Drive');
new Product('water-can.jpg', 'Inverse Watering Can');
new Product('wine-glass.jpg', 'Spherical Wine Glass');

// event listeners
voteBtn1.addEventListener('click', () => {
  castVote(0);
});
voteBtn2.addEventListener('click', () => {
  castVote(1);
});
voteBtn3.addEventListener('click', () => {
  castVote(2);
});

productPicker();
