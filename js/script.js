'use strict';

// CODE TO START GAME ***************************************
// grab sections
const votePanel = document.getElementById('vote-panel');
const votesChart = document.getElementsByTagName('canvas')[0].getContext('2d');
const percentageChart = document.getElementsByTagName('canvas')[1].getContext('2d');
const informationPanel = document.getElementById('information');

// variables for the game starting area
let productCounter = 3;
const productAmount = document.getElementById('product-amount');
const incrementProduct = document.getElementById('increment-product-btn');
const decrementProduct = document.getElementById('decrement-product-btn');
const startButton = document.getElementById('start-button');
productAmount.innerText = productCounter;

// increment and decrement products
incrementProduct.addEventListener('click', () => {
  if (productCounter < 10) {
    productCounter++;
    productAmount.innerText = productCounter;
  }
});

decrementProduct.addEventListener('click', () => {
  if (productCounter > 3) {
    productCounter--;
    productAmount.innerText = productCounter;
  }
});

// start the game and generate the voting areas for the first time
startButton.addEventListener('click', () => {
  votePanel.classList.remove('hidden');
  informationPanel.classList.add('hidden');
  generateVoteAreas(productCounter);
  productPicker(productCounter);
});

// CODE FOR WEB SITE GENERATION *****************************
// create clickCounter and appends it to the h2 for the user
const voteCounter = document.getElementById('votes-remain');
let clickCounter = 25;
voteCounter.innerText = clickCounter;

// variables to hold arrays of dynamically generated elements
const votingArea = document.getElementById('voting-area');
const voteBtnArr = [];
const h3Arr = [];
const imgArr = [];

// function to generate voting areas
function generateVoteAreas(amount) {
  for (let i = 0; i < amount; i++) {
    const newVotingArea = document.createElement('div');
    newVotingArea.classList.add('voting-display');
    const newVotingButton = document.createElement('button');
    newVotingButton.innerText = 'VOTE!';
    newVotingButton.classList.add('voting-button');
    newVotingButton.addEventListener('click', () => {
      castVote(i);
    });
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

// CODE FOR PLACING IMAGES ON SITE & VOTING ***********************
// places random products
let indexTracker = [];
function productPicker(amount) {
  let currentDisplays = [];
  const previousDisplay = indexTracker;
  for (let i = 0; i < amount; i++) {
    let j;
    do {
      j = Math.floor(Math.random() * Product.allProducts.length);
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

// function for casting vote
function castVote(idx) {
  clickCounter--;
  const chosenProduct = Product.allProducts.find((product) => {
    if (product.description === h3Arr[idx].innerText) {
      return product;
    }
  });
  chosenProduct.votes++;
  if (clickCounter > 0) {
    productPicker(productCounter);
  } else {
    displayResults();
  }
  voteCounter.innerText = clickCounter;
}

// CODE FOR RESULTS *************************************************
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

// function to display results
function displayResults() {
  votePanel.classList.add('hidden');
  informationPanel.classList.add('hidden');
  let voteLabels = [];
  let allLabels = [];
  let voteData = [];
  let allTimePercentage = [];
  const finalResult = Product.allProducts.sort(voteTally);
  finalResult.forEach((item) => {
    item.votesAllTime += item.votes;
    item.displaysAllTime += item.displays;
    if (item.votes) {
      voteLabels.push(item.description);
      voteData.push(item.votes);
    }
    if (item.displaysAllTime) {
      allTimePercentage.push(Math.floor((item.votesAllTime / item.displaysAllTime) * 100));
      allLabels.push(item.description);
    }
    saveVotesAndDisplays(item);
  });
  generateChart('Percentage of Votes (All Time)', allLabels, allTimePercentage, 'horizontalBar', percentageChart);
  generateChart('Number of Votes', voteLabels, voteData, 'pie', votesChart);
}

// create a chart
function generateChart(legendLabel, productLabels, chartData, chartType, canvas) {
  const colorArr = ['#4286f4', '#08a50a', '#aa0cad', '#49d1c8', '#b73709', '#f21d1d', '#4a0a7f'];
  let bgColors = [];
  productLabels.forEach((item, i) => {
    bgColors.push(colorArr[i % colorArr.length]);
  });
  new Chart(canvas, { // eslint-disable-line
    type: chartType,
    data: {
      labels: productLabels,
      datasets: [
        {
          label: legendLabel,
          data: chartData,
          backgroundColor: bgColors,
          borderColor: '#333',
          hoverBackgroundColor: 'yellow',
          borderWidth: 2,
          hoverBorderWidth: 0,
        }
      ]
    }
  });
}

// CODE FOR PRODUCT CREATION ****************************
// create product constructor
function Product(filename, description) {
  this.filename = filename;
  this.description = description;
  this.votes = 0;
  this.displays = 0;
  this.votesAllTime = 0;
  this.displaysAllTime = 0;
  Product.allProducts.push(this);
}
Product.allProducts = [];

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

// SAVE AND LOAD FUNCTIONS **************************
function getVotesAndDisplays(product) {
  if (localStorage.getItem(product.filename)) {
    const productStats = JSON.parse(localStorage.getItem(product.filename));
    product.votesAllTime = productStats[0];
    product.displaysAllTime = productStats[1];
  }
}

function saveVotesAndDisplays(product) {
  const productStats = JSON.stringify([product.votesAllTime, product.displaysAllTime]);
  localStorage.setItem(product.filename, productStats);
}

// get data when page loads
Product.allProducts.forEach((product) => {
  getVotesAndDisplays(product);
});
