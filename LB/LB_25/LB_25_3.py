from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

def init_db():
    with app.app_context():
        db.create_all()
        if not Product.query.first():
            db.session.add_all([
                Product(name='Яблуко', price=1.2),
                Product(name='Банан', price=0.8),
                Product(name='Апельсин', price=1.5),
                Product(name='Виноград', price=2.0),
                Product(name='Кавун', price=3.5),
                Product(name='Полуниця', price=2.8),
                Product(name='Ананас', price=4.0),
                Product(name='Манго', price=1.8)
            ])
            db.session.commit()

@app.route('/')
def index():
    products = Product.query.all()
    return render_template('index.html', products=products)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
