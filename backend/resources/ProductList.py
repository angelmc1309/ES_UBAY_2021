from flask_restful import Resource
from backend.models.product import ProductModel

class productList(Resource):
    def get(self):
        products = ProductModel.products_list()
        data = []
        for product in products:
            data.append(product.json())
        return {'products': data}

