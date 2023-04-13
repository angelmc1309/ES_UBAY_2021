from flask_restful import Resource, reqparse
#from data import artists
from backend.models.orders import OrdersModel
from backend.models.accounts import AccountModel
from backend.models.product import ProductModel
class Order(Resource):
    def get(self, username):
        if not AccountModel.find_by_username(username):
            return {'message': "Order with id[{}] does not exists".format(username)},404
        orders=OrdersModel.orders_list()
        data=[]
        for order in orders:
            if order.username == username:
                data.append(order.json())
        return {"orders":data}

    def post(self, username):

        id = 0
        parser = reqparse.RequestParser()
        parser.add_argument('id_product', type=int, required=True, help="This field cannot be left blank")
        parser.add_argument('quantity', type=int, required=True, help="This field cannot be left blank")
        data = parser.parse_args()

        aux = OrdersModel.last_element()
        if aux:
            id = aux.id + 1

        product = ProductModel.find_by_id(data["id_product"])
        user = AccountModel.find_by_username(username)


        if product.inventorystatus == "OUTOFSTOCK" and product.quantity < data["quantity"]:
            return {'message': "There are not remainig".format(username)}, 403

        new_ord=OrdersModel(data["id_product"],data["quantity"])
        new_ord.set_id(id)
        new_ord.set_username(username)
        new_ord.add_to_db()
        user.orders.append(new_ord)
        aux = product.quantity-data["quantity"]
        product.set_quantity(aux)
        if aux < 10:
            product.set_status("LOWSTOCK")
        if aux == 0:
            product.set_status("OUTOFSTOCK")
        product.commit_change()
        return {'message': "Order with id[{}] safe added".format(id)}, 200