from flask_restful import Resource
from backend.models.product import ProductModel
from backend.models.accounts import AccountModel


class AccountProducts(Resource):
    def get(self, username, id_product):
        account = AccountModel.find_by_username(username)
        for product in account.products:

            if str(product.id) == id_product:
                return {"product": product.json()}, 200
        return {'message': "Product with id[{}] not found".format(id_product)}, 404

    def delete(self, username, id_product):

        account = AccountModel.find_by_username(username)
        for product in account.products:
            if str(product.id) == id_product:
                account.products.remove(product)
                account.commit_change()
                return {'message': "Product with id[{}] safe deleted from account with username[{}]".format(id_product, username)}, 200
        return {'message': "Could not find any product with id[{}] in account with username[{}]".format(id_product, username)}, 200

    def post(self, username, id_product):
        account = AccountModel.find_by_username(username)
        if id_product is not None:
            product = ProductModel.find_by_id(id_product)
            if product not in account.products:
                account.products.append(product)
                account.commit_change()
                return {'message': "Product with id[{}] safe added to account with username[{}]".format(id_product, username)}, 200
            return {"message": "Product with id[{}] already exist in account with username[{}]".format(id_product, username)}, 404
        else:
            products = ProductModel.products_list()
            for aux in products:
                if aux not in account.products:
                    account.products.append(aux)
                    account.commit_change()
                    return {'message': "Product with id[{}] safe added to account with username[{}]".format(aux.id,
                                                                                                  username)}, 200

        return {"message": "Can't add any product for you, please try to create a new product".format(id_product,
                                                                                                    username)}, 404
