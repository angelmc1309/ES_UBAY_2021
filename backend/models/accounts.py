from backend.db import db
#import rsa
products_in_account = db.Table('products_in_account',
                               db.Column('accounts_username',db.String,db.ForeignKey('accounts.username')),
                           db.Column('products_id',db.Integer,db.ForeignKey('products.id'))
                           )
class AccountModel(db.Model):
    __tablename__ = 'accounts'  # This is table name
    __table_args__ = (
        db.UniqueConstraint('username', 'password','email'),)
    username = db.Column(db.String(30), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    surname = db.Column(db.String(), nullable=False)
    direction = db.Column(db.String(), nullable=False)
    cp = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    province = db.Column(db.String(), nullable=False)
    country = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    products = db.relationship("ProductModel",secondary=products_in_account,backref=db.backref('accounts'))
    orders = db.relationship('OrdersModel', backref='orders', lazy=True)


    def __init__(self, username, name, surname, direction, cp, city, province, country, email):
        self.username = username
        self.name = name
        self.surname = surname
        self.direction = direction
        self.cp = cp
        self.city = city
        self.province = province
        self.country = country
        self.email = email
        '''
        self.private_key = rsa.PrivateKey(
            7064228450439663483322878523447656681837639311085211733603224172989166210626649062752360995539705941825288548873990771005773470790566379542979017800792153, 65537,
            4400523772665811094597807585329670019012491033691712605464876739281363356831353974756371143346680503087128629230849494424474227000926795220215228593131973,
            5687115798960103597100463193608232195502329693578893984421845973066834814371791731,
            1242146054372827558239808368707798656946860688696712093473149826544540163
        )
        self.public_key = rsa.PublicKey(7064228450439663483322878523447656681837639311085211733603224172989166210626649062752360995539705941825288548873990771005773470790566379542979017800792153, 65537)
        '''
    def json(self):
        return {'username': self.username,'name': self.name,'surname': self.surname,
                'direction': self.direction,'cp': self.cp, 'city': self.city,
                'province': self.province,'country': self.country,
                #'password': rsa.decrypt(self.password, self.private_key).decode(),
                'password': self.password,
                'email': self.email,'products': [product.json() for product in self.products]}

    def save_to_db(self):
        try:
            db.session.add(self)
        except:
            return {"message": "An error occurred inserting the artist."}, 500
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def hash_password(self, password):
        #self.password = rsa.encrypt(password.encode(), self.public_key)
        self.password = password

    def commit_change(self):
        db.session.commit()

    def set_username(self, new_username):
        self.username = new_username

    def get_username(self):
        return self.username

    def set_name(self, new_name):
        self.name = new_name

    def get_name(self):
        return self.name

    def set_surname(self, new_surname):
        self.surname = new_surname

    def get_surname(self):
        return self.surname

    def set_direction(self, new_direction):
        self.direction = new_direction

    def get_direction(self):
        return self.direction

    def set_cp(self, new_cp):
        self.cp = new_cp

    def get_cp(self):
        return self.cp

    def set_city(self, new_city):
        self.city = new_city

    def get_city(self):
        return self.city

    def set_province(self, new_province):
        self.province = new_province

    def get_province(self):
        return self.province

    def set_country(self, new_province):
        self.province = new_province

    def get_country(self):
        return self.country

    def set_email(self, new_email):
        self.email = new_email

    def get_email(self):
        return self.email

    @classmethod
    def find_by_username(cls,username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def accounts_list(cls):
        return cls.query.all()
