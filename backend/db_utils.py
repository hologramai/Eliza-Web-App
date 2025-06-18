# backend/db_utils.py

class NotFoundError(Exception):
    pass

class DummyDB:
    def __init__(self):
        self.users = {}

    def __getitem__(self, key):
        return self

    def table_names(self):
        return ["users"]

    def get(self, email):
        if email in self.users:
            return self.users[email]
        raise NotFoundError()

    def insert(self, user):
        email = user["email"]
        self.users[email] = {"id": email, "count": user["count"]}
        return self.users[email]

    def update(self, user_id, updates):
        if user_id in self.users:
            self.users[user_id].update(updates)
        else:
            raise NotFoundError()

# Instantiate global DB
DB = DummyDB()
