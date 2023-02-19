from . import db

    # table
class Word(db.Model):

    # Columns

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)

    word = db.Column(db.String(50))

    phone = db.Column(db.String(50))

    rhyming_part = db.Column(db.String(50))

    def __repr__(self):
        return f'<word {self.word}>'
