from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return 'Welcome to the user API!'

@app.route('/user', methods=['GET'])
def get_user():
    user_data = {
        'id': 1,
        'name': 'Іван',
        'email': 'ivan@example.com',
        'age': 25
    }
    return jsonify(user_data)

if __name__ == '__main__':
    app.run(debug=True)
