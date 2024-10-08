const fs = require('fs');
const path = require('path');

const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "cart.json"
);

module.exports = class Cart {
      static addProduct(id, productPrice) {
            //Fetch the previous cart
            fs.readFile(p, (err, fileContent) => {
                  let cart = { products: [], totalprice: 0 };
                  if (!err) {
                        cart = JSON.parse(fileContent);
                  }
                  // Analyse the art => Fetch the existing product
                  const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                  const existingProduct = cart.products[existingProductIndex];
                  let updatedProduct;
                  if (existingProduct) {
                        updatedProduct = { ...existingProduct };
                        updatedProduct.qty = updatedProduct.qty + 1;
                        // cart.products = [... cart.products];
                        cart.products[existingProductIndex] = updatedProduct;

                  } else {
                        updatedProduct = { id: id, qty: 1 };
                        cart.products = [ ...cart.products, updatedProduct];
                  }
                  cart.totalprice = cart.totalprice + +productPrice;

                  // Add new product / Increasse quantity
                  fs.writeFile(p, JSON.stringify(cart), (err) => {
                        console.log(err);
                  });
            });


      }
      static deleteProduct(id, productPrice){
            fs.readFile(p, (err, fileContent) => {
                  if (err) {
                        return;
                  }
                  const updatedCart = {...JSON.parse(fileContent)};
                  const product = updatedCart.products.find(product => product.id === id);
                  if (!product) {
                        return;
                  }
                  updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
                  updatedCart.totalprice = updatedCart.totalprice - productPrice * product.qty;
                  fs.writeFile(p, JSON.stringify(updatedCart ), (err) => {
                        console.log(err);
                  });
            })
      }

      static getCart(cb) {
            fs.readFile(p, (err, fileContent) => {
                  const cart = JSON.parse(fileContent);
                  if (err) {
                        return cb(null);
                  }
                  cb(cart);
            })
      }
}