'use strict';

// create clickCounter and appends it to the h2 for the user
let clickCounter = 25;
const voteCounter = document.getElementById('votes-remain');
voteCounter.innerText = clickCounter;

// function to order the products by votes after user is out of votes
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
function Product(filename, description) {
  this.filename = filename;
  this.description = description;
  this.votes = 0;
  this.displays = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];

// variables to hold arrays of dynamically generated elements
const votingArea = document.getElementById('voting-area');
const voteBtnArr = [];
const h3Arr = [];
const imgArr = [];

// function to generate voting areas
function generateVoteAreas() {
  for (let i = 0; i < 3; i++) {
    const newVotingArea = document.createElement('div');
    newVotingArea.classList.add('voting-display');
    const newVotingButton = document.createElement('button');
    newVotingButton.innerText = 'VOTE!';
    newVotingButton.classList.add('voting-button');
    voteBtnArr.push(newVotingButton);
    newVotingArea.appendChild(newVotingButton);
    const newVoteH3 = document.createElement('h3');
    h3Arr.push(newVoteH3);
    newVotingArea.appendChild(newVoteH3);
    const newImgTag = document.createElement('img');
    newImgTag.classList.add('product-image');
    imgArr.push(newImgTag);
    newVotingArea.appendChild(newImgTag);
    votingArea.appendChild(newVotingArea);
  }
}

// grab sections
const votePanel = document.getElementById('vote-panel');
const resultPanel = document.getElementById('result-panel');

// generate random number for products
function randomProductGenerator() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// function for casting vote
function castVote(x) {
  clickCounter--;
  const chosenProduct = Product.allProducts.find((product) => {
    if (product.description === h3Arr[x].innerText) {
      return product;
    }
  });
  chosenProduct.votes++;
  if (clickCounter > 0) {
    productPicker();
  } else {
    displayResults();
  }
  voteCounter.innerText = clickCounter;
}

// places random products
let indexTracker = [];
function productPicker() {
  let currentDisplays = [];
  const previousDisplay = indexTracker;
  for (let i = 0; i < 3; i++) {
    let j = randomProductGenerator();
    do {
      j = randomProductGenerator();
    } while (currentDisplays.includes(j) || previousDisplay.includes(j));
    currentDisplays.push(j);
    const pickedProduct = Product.allProducts[j];
    imgArr[i].src = `img/products/${pickedProduct.filename}`;
    imgArr[i].alt = pickedProduct.description;
    h3Arr[i].innerText = pickedProduct.description;
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
    const headText = document.createTextNode(item.description);
    newItem.appendChild(itemHead).appendChild(headText);
    const itemVotes = document.createElement('p');
    const voteText = document.createTextNode(`Votes: ${item.votes}`);
    newItem.appendChild(itemVotes).appendChild(voteText);
    const itemPercent = document.createElement('p');
    const percentText = item.displays ? (
      document.createTextNode(`You voted for this ${Math.floor((item.votes / item.displays) * 100)}% of the time.`)
    ) : (
      document.createTextNode('This item wasn\'t displayed')
    );
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

// generate the voting areas and populate them for the first time
generateVoteAreas();
productPicker();

// event listeners for voting buttons
for (let i = 0; i < voteBtnArr.length; i++) {
  voteBtnArr[i].addEventListener('click', () => {
    castVote(i);
  });
}