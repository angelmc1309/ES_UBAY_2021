from flask_restful import Resource
from backend.models.accounts import AccountModel


class accountList(Resource):
    def get(self):
        accounts = AccountModel.accounts_list()
        data = []
        for account in accounts:
            data.append(account.json())
        return {"Accounts": data}