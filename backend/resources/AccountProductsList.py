from flask_restful import Resource
from backend.models.accounts import AccountModel
from backend.models.product import ProductModel

class AccountProductsList (Resource):
    def get(self, username):
        account = AccountModel.find_by_username(username)
        data=[]
        for product in account.products:
            data.append(product.json())
        return {"products": data}
