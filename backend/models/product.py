from backend.db import db


class ProductModel(db.Model):
    __tablename__ = 'products'  # This is table name
    __table_args__ = (
        db.UniqueConstraint('id', 'name'),)


    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    inventorystatus = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(60))
    rating = db.Column(db.Float)
    category = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(50))
    image_data = db.Column(db.LargeBinary)

    def __init__(self, name, category, price, quantity=1):
        self.name = name
        self.category = category
        self.price = price
        self.quantity = quantity
        self.description = ""
        self.rating = 0.0
        self.inventorystatus = "InStock"
        self.image = ""
        self.image_data = None

    def json(self):
        return {'id': self.id, 'name':self.name, 'inventorystatus':self.inventorystatus,
                'price':self.price, 'description':self.description, 'rating':self.rating,
                'category':self.category, 'quantity':self.quantity,'image':self.image,
                'image_data':self.image_data}


    def save_to_db(self):
        try:
            db.session.add(self)
        except:
            return {"message": "An error occurred inserting the product."}, 500
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def set_id(self, id):
        self.id = id

    def commit_change(self):
        db.session.commit()

    def set_image(self, file_name, file_binary):
        self.image = file_name
        self.image_data = file_binary

    def get_image(self):
        return self.image, self.image_data

    def set_name(self, new_name):
        self.name = new_name

    def get_name(self):
        return self.name

    def set_category(self, new_category):
        self.category = new_category

    def get_category(self):
        return self.category

    def set_price(self, new_price):
        self.price = new_price

    def get_price(self):
        return self.price

    def set_quantity(self, new_quantity):
        self.quantity = new_quantity

    def get_quantity(self):
        return self.quantity

    def set_description(self, new_description):
        self.description = new_description

    def get_description(self):
        return self.description

    def set_rating(self, new_rating):
        self.rating = new_rating

    def get_rating(self):
        return self.rating

    def set_status(self, new_status):
        self.inventorystatus = new_status

    def get_status(self):
        return self.inventorystatus

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def products_list(cls):
        return cls.query.all()

    @classmethod
    def last_element(cls):
        return cls.query.order_by(ProductModel.id.desc()).first()
