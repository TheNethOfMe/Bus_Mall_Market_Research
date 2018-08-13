'use strict';

// create product constructor
function Product(filename, heading) {
  this.filename = filename;
  this.heading = heading;
  this.votes = 0;
  this.displays = 0;
  this.status = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

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

// places random products
function productPlacer() {
  // update product status
  // 0 = available; 1 = currently in use; 2 = was just used
  Product.allProducts.forEach((product) => {
    if (product.status === 1) { product.status++; }
    if (product.status === 2) { product.status = 0; }
  });
  for (let i = 0; i < 3; i++) {
    let j = randomProductGenerator();
    while (Product.allProducts[j].status) {
      j = randomProductGenerator();
    }
    const pickedProduct = Product.allProducts[j];
    // display picked product
    imgArr[i].src = `img/products/${pickedProduct.filename}`;
    imgArr[i].alt = pickedProduct.heading;
    h3Arr[i].innerText = pickedProduct.heading;
    // adjust picked product properties
    pickedProduct.displays += 1;
    pickedProduct.status++;
    console.log(pickedProduct);
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
