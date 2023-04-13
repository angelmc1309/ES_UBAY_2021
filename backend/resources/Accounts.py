from flask_restful import Resource, reqparse
from backend.models.accounts import AccountModel
class Account(Resource):
    def get(self, username):
        user = AccountModel.find_by_username(username)
        if user:
            return {'account': user.json()}, 200
        else:
            return {'message': "Account with username: [{}] does not exist".format(username)}, 404

    def post(self, username):
        parser = reqparse.RequestParser()
        parser.add_argument('password', type=str, required=True)
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('surname', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('direction', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('cp', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('city', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('province', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('country', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('email', type=str, required=True, help="This field cannot be left blank")
        data = parser.parse_args()
        exist = AccountModel.find_by_username(username)
        if exist:
            return {'message': "Account with username[{}] cannot be add, please verify your data".format(
                username)}, 404

        new_user = AccountModel(username,data["name"],data["surname"],data["direction"],data["cp"],data["city"]
                                ,data["province"],data["country"],data["email"])
        new_user.hash_password(data['password'])
        new_user.save_to_db()
        return {'message': "Account with username [{}] safe added".format(username)}, 200


    def delete(self, username):
        user = AccountModel.find_by_username(username)
        if user:
            user.delete_from_db()
            return {'message', "account with username[{}] safe deleted".format(username)}, 200
        else:
            return {'message', "Cannot find account with username [{}]".format(username)}, 404

    def put(self, username):
        exist = False
        aux = AccountModel.find_by_username(username)
        if aux:
            exist = True
        if (not exist):
            self.post(username=username)
            return {'message': "Show with username[{}] does not exists, we'll create a new show for you".format(username)}, 200
        parser = reqparse.RequestParser()
        parser.add_argument('password', type=str)
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('surname', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('direction', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('cp', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('city', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('province', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('country', type=str, required=True, help="This field cannot be left blank")
        parser.add_argument('email', type=str, required=True, help="This field cannot be left blank")

        data = parser.parse_args()
        aux.name = data["name"]
        aux.surname = data["surname"]
        aux.direction = data["direction"]
        aux.cp = data["cp"]
        aux.city = data["city"]
        aux.province = data["province"]
        aux.country = data["country"]
        aux.email = data["email"]
        aux.commit_change()

        return {'message': "Show with username[{}] updated correctly".format(username)}, 200