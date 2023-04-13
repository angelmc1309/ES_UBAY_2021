import unittest
from backend.models.product import ProductModel
from backend.models.accounts import AccountModel
from flask import Flask , render_template, jsonify, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_migrate import Migrate
from backend.models import product, orders, accounts
from backend.db import db



class TestCase(unittest.TestCase):

    def test_product_account_db_integration(self):
        with self.app.app_context():
            product1 = ProductModel("Opel Corsa", "Cars", 1000.0, 1)
            product1.save_to_db()
            product2 = ProductModel.find_by_id(1)
            assert product1.name == product2.name
            product1.delete_from_db()
            product3 = ProductModel.find_by_id(1)
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                    "test@gmail.com")
            account1.hash_password("test")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            assert account1.username == account2.username
            assert product3 == None

    def test_create_simultaneous(self):
        with self.app.app_context():
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                    "test@gmail.com")
            account1.hash_password("Test")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            product1 = ProductModel("Nike Air Force 1", "Shoes", 110.0, 10)
            product1.save_to_db()
            product1.set_quantity(5)
            product1.save_to_db()
            assert product1.get_quantity() == 5
            assert account1.name == account2.name
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