import pronouncing
import re
import time
from .models import *

from flask import (
    Blueprint, request, request
)

v1 = Blueprint('api', __name__, url_prefix='/v1')

pattern = re.compile(r"[A-Z]{2}\d\s?")

@v1.route('/time')
def get_current_time():
    return {'time': time.time()}

def get_word_entry(wrd):
    res = Word.query.filter_by(word=wrd).all()
    return {
        "word": wrd,
        "rhyming_parts": [w.rhyming_part for w in res]
        }

@v1.route('/words/<word>/rhyming-parts', methods=["GET"])
def rhyming_part(word):
    #TODO escape chars for sql injection
    if request.method == "GET":
        if Word.query.filter_by(word=word).first():
            return get_word_entry(word)
        else:
            try:
                phones = pronouncing.phones_for_word(word)
                for phone in phones:
                    rhyming_part = pronouncing.rhyming_part(phone)
                    rhyming_part_string = "".join(pattern.findall(rhyming_part))
                    w = Word(
                        word = word,
                        phone = phone,
                        rhyming_part = rhyming_part_string
                    )
                    db.session.add(w)
                db.session.commit()
            except Exception as e:
                print(e) # log error
                db.session.rollback()
                return {}
            else:
                return get_word_entry(word)

    return {}