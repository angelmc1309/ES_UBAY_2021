from flask import Flask, render_template, jsonify, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_restful import Api
from backend.resources import Product, ProductList,Accounts, AccountsList, AccountProducts, AccountProductsList,OrderList,Order
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.models import product, orders, accounts
from backend.db import db

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Only use this line when working in local environmentherok
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.sqlite3'
# Only use this line when working in deployment enviorment (Check heroku config --app ubay-2021-es)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ozgxyrodaubigg:3b369857c652e7b8dc24f85eb22d04d581ae9752df215b2c6bdf4c6ea4bb0966@ec2-3-208-157-78.compute-1.amazonaws.com:5432/d9olc4er43t9ut'


app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)
api = Api(app)
db.init_app(app)
migrate = Migrate(app, db)

api.add_resource(Product.Product, '/product/<int:id>', '/product/')
api.add_resource(ProductList.productList, '/products/')
api.add_resource(Accounts.Account, '/account/<string:username>')
api.add_resource(AccountProducts.AccountProducts, '/account/<string:username>/product/<int:id_product>')
api.add_resource(AccountProductsList.AccountProductsList,'/account/<string:username>/products/')
api.add_resource(AccountsList.accountList, '/accounts')
api.add_resource(Order.Order, '/order/<string:username>')
api.add_resource(OrderList.OrderList, '/orders')

@app.route('/')
def index():
    return render_template('index.html', static_url_path='', static_folder='dist', template_folder='dist')


if __name__ == '__main__':
    app.run(port=5000)
