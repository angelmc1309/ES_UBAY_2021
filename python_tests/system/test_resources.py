import unittest

import requests

import responses
import unittest

from flask import Flask , render_template, jsonify, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_migrate import Migrate
from backend.models import product, orders, accounts
from backend.db import db
from backend.resources import Product, ProductList, Accounts, AccountProducts, AccountsList


class TestCase(unittest.TestCase):

    def test_get_product(self):
        with self.app.app_context():
            c = self.app.test_client()
            response = c.post('/product/1', json={"name":"Product2", "category":"Category2", "price":2.0, "quantity":5})
            response = c.get('/product/1')
            self.assertEqual({'product': {'category': 'Category2',
                 'description': '',
                 'id': 1,
                 'image': '',
                 'image_data': None,
                 'inventorystatus': 'InStock',
                 'name': 'Product2',
                 'price': 2.0,
                 'quantity': 5,
                 'rating': 0.0}}, response.json)
            self.assertEqual(200, response.status_code)

    def test_get_account(self):
        with self.app.app_context():
            c = self.app.test_client()
            c.post('/account/admin3', json={
                "password":"admin3",
                "name":"admin3",
                "surname":"admin3",
                "direction":"admin3",
                "cp":"admin3",
                "city":"admin3",
                "province":"admin3",
                "country":"admin3",
                "email":"admin3"
            })
            response = c.get('/account/admin3')
            self.assertEqual(response.json,
                             {'account': {'city': 'admin3',
                                          'country': 'admin3',
                                          'cp': 'admin3',
                                          'direction': 'admin3',
                                          'email': 'admin3',
                                          'name': 'admin3',
                                          'password': 'admin3',
                                          'products': [],
                                          'province': 'admin3',
                                          'surname': 'admin3',
                                          'username': 'admin3'}}
                             )

    def setUp(self):
        """
        Creates a new database for the unit test to use
        """
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        # Only use this line when working in local environmentherok
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.sqlite3'
        # Only use this line when working in deployment enviorment (Check heroku config --app ubay-2021-es)
        #self.app.config[
            #'SQLALCHEMY_DATABASE_URI'] = 'postgresql://ozgxyrodaubigg:3b369857c652e7b8dc24f85eb22d04d581ae9752df215b2c6bdf4c6ea4bb0966@ec2-3-208-157-78.compute-1.amazonaws.com:5432/d9olc4er43t9ut'

        self.app.config['CORS_HEADERS'] = 'Content-Type'
        CORS(self.app)
        api = Api(self.app)
        db.init_app(self.app)
        migrate = Migrate(self.app, db)

        api.add_resource(Product.Product, '/product/<int:id>', '/product/')
        api.add_resource(ProductList.productList, '/products/')
        api.add_resource(Accounts.Account, '/account/<string:username>')
        api.add_resource(AccountProducts.AccountProducts, '/account/<string:username>/product/<int:id_product>')
        # api.add_resource(AccountProductsList,'/account/<string:username>/products/')
        api.add_resource(AccountsList.accountList, '/accounts')

        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        """
        Ensures that the database is emptied for next unit test
        """
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        # Only use this line when working in local environmentherok
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.sqlite3'
        #self.app.config[
            #'SQLALCHEMY_DATABASE_URI'] = 'postgresql://ozgxyrodaubigg:3b369857c652e7b8dc24f85eb22d04d581ae9752df215b2c6bdf4c6ea4bb0966@ec2-3-208-157-78.compute-1.amazonaws.com:5432/d9olc4er43t9ut'

        db.init_app(self.app)
        with self.app.app_context():
            db.drop_all()