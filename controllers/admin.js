const path = require('path');
const express = require('express');

const router = express.Router();

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        res.render('admin/index', {
          prods: rows,
          pageTitle: 'Inicio',
          path: '/'
        });
      })
      .catch(err => console.log(err));
  };

exports.routers = router;