from flask_restful import Resource, reqparse
from backend.models.product import ProductModel

class Product(Resource):

    def get(self, id):
        product = ProductModel.find_by_id(id)
        if product:
            return {'product': product.json()}, 200
        else:
            return {'message': "Product with id[{}] does not exists".format(id)}, 404

    def delete(self, id):
        aux = ProductModel.find_by_id(id)
        if not aux:
            return {'message': "Product with id[{}] does not exists".format(id)}, 404
        aux.delete_from_db()
        return {'message': "Product with id[{}] safe deleted".format(id)}, 200

    def post(self, id=None):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('inventorystatus', type=str, required=False)
        parser.add_argument('category', type=str,required=True, help="This field cannot be left blank")
        parser.add_argument('price', type=float, required=True, help="This field cannot be left blank")
        parser.add_argument('quantity', type=int, required=True, help="This field cannot be left blank")
        parser.add_argument('description', type=str, required=False)
        parser.add_argument('rating', type=float, required=False)
        parser.add_argument('image', type=str, required=False)
        parser.add_argument('image_data', required=False)

        data = parser.parse_args()

        if (id != None):
            exist = False
            product = ProductModel.find_by_id(id)
            if product:
                exist = True
            if (exist):
                return {'message': "Product with id[{}] already exists".format(id)}, 404
        else:
            aux = ProductModel.last_element()
            if aux is None:
                id = 1
            else:
                id = aux.id + 1
        new_prod = ProductModel(data["name"], data["category"], data["price"],data["quantity"])
        new_prod.set_id(id)
        if data["description"]:
            new_prod.set_description(data["description"])
        if data["inventorystatus"]:
            new_prod.set_status(data["inventorystatus"])
        if data["category"]:
            new_prod.set_category(data["category"])
        if data["image"]:
            new_prod.set_image(data["image"])
        new_prod.save_to_db()
        return {'message': "Product with id[{}] safe added".format(id)}, 200

    def put(self, id):
        aux = ProductModel.find_by_id(id)
        if not aux:
            self.post(id=id)
            return {'message': "Product with id[{}] does not exists, we'll create a new product for you".format(id)}, 200

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('inventorystatus', type=str, required=False)
        parser.add_argument('category', type=str,required=True, help="This field cannot be left blank")
        parser.add_argument('price', type=float, required=True, help="This field cannot be left blank")
        parser.add_argument('quantity', type=int, required=True, help="This field cannot be left blank")
        parser.add_argument('description', type=str, required=False)
        parser.add_argument('rating', type=float, required=False)
        parser.add_argument('image', type=str, required=False)
        parser.add_argument('image_data', required=False)


        #'id', 'name', 'inventorystatus', 'price', 'description', 'rating', 'category', 'quantity', 'code', 'image', 'image_data'
        data = parser.parse_args()
        aux.name = data["name"]
        aux.inventorystatus = data["inventorystatus"]
        aux.category = data["category"]
        aux.price = data["price"]
        aux.quantity=data["quantity"]
        aux.description = data["description"]
        aux.rating = data["rating"]
        aux.image = data["image"]
        aux.image_data = data["image_data"]

        aux.commit_change()
        return {'message': "Product with id[{}] updated correctly".format(id)}, 200