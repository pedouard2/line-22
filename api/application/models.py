from . import db

    # table
class Word(db.Model):

    __table_args__ = (
        db.UniqueConstraint('word','phone','rhyming_part', name='phone_rhymes'),

    )
    # Columns

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)

    word = db.Column(db.String(50))

    phone = db.Column(db.String(50))

    rhyming_part = db.Column(db.String(50))

    syllable = db.Column(db.String(50))
    
    # db.UniqueConstraint('word','phone','rhyming_part', name='phone_rhymes')

    def __repr__(self):
        return f'<word {self.word}>'
