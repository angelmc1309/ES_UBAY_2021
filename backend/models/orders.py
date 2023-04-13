from backend.db import db
class OrdersModel(db.Model):
    __tablename__ = 'orders'


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), db.ForeignKey('accounts.username'), nullable=False)
    id_product = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    def __init__(self, id_product, quantity):
        self.id_product = id_product
        self.quantity = quantity

    def set_id(self,id):
        self.id=id
    def set_username(self,username):
        self.username=username
    def json(self):
        return {'id': self.id, 'username': self.username, 'id_product': self.id_product,
                'quantity': self.quantity}

    @classmethod
    def orders_list(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def last_element(cls):
        return cls.query.order_by(OrdersModel.id.desc()).first()
    def add_to_db(self):
        try:
            db.session.add(self)
        except:
            return {"message": "An error occurred inserting the artist."}, 500
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()