const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
      res.render("admin/edit-product", {
            pageTitle: " Add Product",
            path: "/admin/add-product",
            editing: false
      });
};

exports.postAddProduct = (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      // const product = new Product(null, title, imageUrl, description, price);
      // product
      // .save()
      // .then(() => {
      //       res.redirect("/");
      // })
      // .catch(err => console.log(err));
      req.user.createProduct({
            price: price,
            title: title,
            imageUrl: imageUrl,
            description: description,
            userId: req.user.id
      })
      .then(result => {
            console.log(result);
            res.redirect('/admin/products');
      }).catch( err => {
            console.log(err);
      })
      
};

exports.getEditProduct = (req, res, next) => {
      const editMode = req.query.edit;
      const productId = req.params.productId;
      req.user.getProducts({where: {id: productId}})
      .then( products => {
            const product = products[0];
            if(!product) {
                  return res.redirect('/');
            }

            res.render("admin/edit-product", {
                  pageTitle: "Edit Product",
                  path: "/admin/edit-product",
                  product: product,
                  editing: editMode

            });

      }
      ).catch(err => console.err);
};

exports.getProducts = (req, res, next) => {
      req.user.getProducts().then(
            products => {
                  res.render("admin/products", {
                  prods: products,
                  pageTitle: "Admin Products",
                  path: "/admin/products",
            });
            }
      ).catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
      const productId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImageUrl = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDescription = req.body.description;
      Product.findByPk(productId).then( product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save();
      }).then(
            result => {
                  console.log('Updated Product!');
                  res.redirect('/admin/products');
            }
      ).catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next)=> {
      const productId = req.body.productId;
      Product.findByPk(productId).then(product => {
            return product.destroy();
      }).then(result => {console.log('Product deleted!');
            res.redirect('/admin/products');
      } 
      ).catch(err => console.log(err => console.log(err)));
}
