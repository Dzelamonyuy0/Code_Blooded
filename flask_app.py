import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

load_dotenv()

app = Flask(__name__)
CORS(app)

def _ensure_supabase_sslmode(db_url):
    """Supabase Postgres connections should explicitly require SSL."""
    if not db_url:
        return db_url

    parsed = urlparse(db_url)
    host = parsed.hostname or ""
    if not host.endswith(".supabase.co"):
        return db_url

    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    if "sslmode" not in query:
        query["sslmode"] = "require"
        return urlunparse(parsed._replace(query=urlencode(query)))

    return db_url

app.config['SQLALCHEMY_DATABASE_URI'] = _ensure_supabase_sslmode(os.getenv("DATABASE_URL"))
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
@app.route('/api/parties', methods=['GET'])
def get_parties():
    all_parties = Party.query.all()
    return jsonify([party.to_dict() for party in all_parties])

@app.route('/api/parties/search', methods=['GET'])
def search_parties():
    # 1. Get the keyword from the URL (e.g., /api/parties/search?q=olaf)
    query = request.args.get('q', '')

    if not query:
        return jsonify([]) # Return empty list if no search term

    # .ilike makes it case-insensitive (olaf vs Olaf doesn't matter)
    search_results = Party.query.filter(
        (Party.school.ilike(f'%{query}%')) | 
        (Party.house.ilike(f'%{query}%')) | 
        (Party.address.ilike(f'%{query}%'))
    ).all()

    return jsonify([party.to_dict() for party in search_results])

def main():
    print(get_parties())

if __name__ == '__main__':
    app.run(debug=True, port=5000)