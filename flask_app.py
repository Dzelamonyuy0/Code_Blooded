from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/parties_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Party(db.Model):
    __tablename__ = 'parties'
    id = db.Column(db.Integer, primary_key=True)
    school = db.Column(db.String(50))
    house = db.Column(db.String(100))
    address = db.Column(db.String(255))
    party_date = db.Column(db.Date)

    # turns the database row into a dictionary for React
    def to_dict(self):
        return {
            "id": self.id,
            "school": self.school,
            "house": self.house,
            "address": self.address,
            "date": str(self.party_date)
        }

 # create route for React to call
@app.route('/homepage', methods=['GET'])
def get_parties():
    all_parties = Party.query.all()
    return jsonify([party.to_dict() for party in all_parties])

def main():
    print(get_parties())

if __name__ == '__main__':
    # main()
    app.run(debug=True, port=5000)