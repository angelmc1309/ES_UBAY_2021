import unittest
from backend.models.product import ProductModel
from backend.models.accounts import AccountModel
from backend.models.orders import OrdersModel
from backend.db import db
from flask import Flask , render_template, jsonify, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_migrate import Migrate
from backend.models import product, orders, accounts
from backend.db import db

class MyTestCase(unittest.TestCase):

    def test_new_product(self):
        product_ = ProductModel("Watch", "Accessories", 15.0, 3)
        assert product_.name == "Watch"
        assert product_.category == "Accessories"
        assert product_.price == 15.0
        assert product_.quantity == 3

    def test_find_exists_product(self):
        with self.app.app_context():
            product1 = ProductModel("Necklace", "Accessories", 25.0, 6)
            product1.save_to_db()
            product2 = ProductModel.find_by_id(1)
            assert product1.name == product2.name

    def test_find_not_exists_product(self):
        with self.app.app_context():
            product_ = ProductModel.find_by_id(0)
            assert product_ == None

    def test_upload_product(self):
        with self.app.app_context():
            product1 = ProductModel("Shirt", "Clothes", 20.0, 5)
            product1.save_to_db()
            product2 = ProductModel.find_by_id(1)
            assert product1.name == product2.name

    def test_delete_product(self):
        with self.app.app_context():
            product1 = ProductModel("Opel Corsa", "Cars", 1000.0, 1)
            product1.save_to_db()
            product2 = ProductModel.find_by_id(1)
            assert product1.name == product2.name
            product1.delete_from_db()
            product3 = ProductModel.find_by_id(1)
            assert product3 == None

    def test_update_product(self):
        with self.app.app_context():
            product1 = ProductModel("Nike Air Force 1", "Shoes", 110.0, 10)
            product1.save_to_db()
            product1.set_quantity(5)
            product1.save_to_db()
            assert product1.get_quantity() == 5

    def test_new_account(self):
        account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain", "test@gmail.com")
        assert account1.username == "UserTest"
        assert account1.name == "Adria"
        assert account1.surname == "Rojo"
        assert account1.direction == "Direction1"
        assert account1.cp == "00120"
        assert account1.city == "Calella"
        assert account1.province == "Barcelona"
        assert account1.country == "Spain"
        assert account1.email == "test@gmail.com"

    def test_find_exists_account(self):
        with self.app.app_context():
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                    "test@gmail.com")
            account1.hash_password("test")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            assert account1.username == account2.username

    def test_find_not_exists_account(self):
        with self.app.app_context():
            account1 = AccountModel.find_by_username("Test")
            assert account1 == None

    def test_create_account(self):
        with self.app.app_context():
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                "test@gmail.com")
            account1.hash_password("Test")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            assert account1.name == account2.name

    def test_delete_account(self):
        with self.app.app_context():
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                    "test@gmail.com")
            account1.hash_password("Test")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            assert account1.name == account2.name
            account1.delete_from_db()
            account3 = AccountModel.find_by_username("UserTest")
            assert account3 == None

    def test_update_account(self):
        with self.app.app_context():
            account1 = AccountModel("UserTest", "Adria", "Rojo", "Direction1", "00120", "Calella", "Barcelona", "Spain",
                                    "test@gmail.com")
            account1.hash_password("Test")
            account1.save_to_db()
            account1.set_name("Pepito")
            account1.save_to_db()
            account2 = AccountModel.find_by_username("UserTest")
            assert account2.name == "Pepito"

    def test_new_order(self):
        with self.app.app_context():
            order1 = OrdersModel(5, 2)
            order1.set_username("Adria")
            assert order1.id_product == 5
            assert order1.quantity == 2
            assert order1.username == "Adria"

    def test_find_exists_order(self):
        with self.app.app_context():
            order1 = OrdersModel(5, 2)
            order1.set_username("Adria")
            order1.add_to_db()
            order2 = OrdersModel.find_by_username("Adria")
            assert order1.username == order2.username

    def test_find_not_exists_order(self):
        with self.app.app_context():
            order1 = OrdersModel.find_by_username("Adria")
            assert order1 == None

    def test_delete_order(self):
        with self.app.app_context():
            order1 = OrdersModel(5, 2)
            order1.set_username("Adria")
            order1.add_to_db()
            order1.delete_from_db()
            order2 = OrdersModel.find_by_username("Adria")
            assert order2 == None

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

