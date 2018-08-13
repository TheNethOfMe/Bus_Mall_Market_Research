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
    const finalResult = [];
    Product.allProducts.forEach((item) => {
      let result = {};
      result.name = item.heading;
      result.votes = item.votes;
      result.chosenPercentage = Math.floor((item.votes / item.displays) * 100);
      finalResult.push(result);
    });
    console.log(finalResult.sort(voteTally));
  }
}

// places random products
function productPicker() {
  Product.allProducts.forEach((product) => {
    if (product.status === 'displayed') {
      product.status = 'used';
    } else if (product.status === 'used') {
      product.status = 'available';
    }
  });
  for (let i = 0; i < 3; i++) {
    let j = randomProductGenerator();
    while (Product.allProducts[j].status !== 'available') {
      j = randomProductGenerator();
    }
    const pickedProduct = Product.allProducts[j];
    // display picked product
    imgArr[i].src = `img/products/${pickedProduct.filename}`;
    imgArr[i].alt = pickedProduct.heading;
    h3Arr[i].innerText = pickedProduct.heading;
    // adjust picked product properties
    pickedProduct.displays += 1;
    pickedProduct.status = 'displayed';
  }
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
