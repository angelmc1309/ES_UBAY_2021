from flask_restful import Resource, reqparse
from backend.models.orders import OrdersModel
class OrderList(Resource):
    def get(self):
        orders=OrdersModel.orders_list()
        data=[]
        for order in orders:
            data.append(order.json())
        return {"orders":data}
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('orders', type=str, required=True,
                            action="append", help="This field cannot be left blank")
        data = parser.parse_args()
        for order in data['orders']:
            aux=OrdersModel(order[0],order[1])
            id_num = OrdersModel.last_element()
            if id_num is None:
                id = 1
            else:
                id = id_num.id + 1
            aux.id = id
            aux.add_to_db()