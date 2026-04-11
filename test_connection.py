from urllib.parse import urlparse
import socket

from flask_app import app, db


def _host_can_resolve(hostname):
    try:
        socket.getaddrinfo(hostname, 5432)
        return True
    except socket.gaierror:
        return False

with app.app_context():
    try:
        db_uri = app.config.get('SQLALCHEMY_DATABASE_URI', '')
        parsed = urlparse(db_uri)
        host = parsed.hostname

        if host and not _host_can_resolve(host):
            print(f"CONNECTION FAILED. DNS cannot resolve database host: {host}")
            print("This is not a password error.")
            print("Use the Supabase pooler connection string from Database > Connection string and set it as DATABASE_URL.")
            print("Also ensure your URL includes ?sslmode=require.")
            raise SystemExit(1)

        # tries connecting to the database
        db.engine.connect()
        print("CONNECTION SUCCESSFUL! Flask is talking to Supabase.")
    except Exception as e:
        print(f"CONNECTION FAILED.\nError: {e}")