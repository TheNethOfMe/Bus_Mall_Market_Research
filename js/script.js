'use strict';

// create product constructor
function Product(filepath, heading) {
  this.filepath = filepath;
  this.heading = heading;
  this.votes = 0;
  this.displays = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

// grab images
const img1 = document.getElementById('img-1');
const img2 = document.getElementById('img-2');
const img3 = document.getElementById('img-3');

// random image grabber
function randomImage() {
  const result = Math.floor(Math.random() * Product.allProducts.length);
  return Product.allProducts[result];
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
new Product('wanter-can.jpg', 'Inverse Watering Can');
new Product('wine-glass.jpg', 'Spherical Wine Glass');
