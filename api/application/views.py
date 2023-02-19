import pronouncing
import re
import time
from .models import *

from flask import (
    Blueprint, request, request
)

v1 = Blueprint('api', __name__, url_prefix='/v1')

pattern = re.compile(r"[A-Z]{2}\d\s?")
seen = [] #TODO cache?

@v1.route('/time')
def get_current_time():
    return {'time': time.time()}

@v1.route('/words/<word>/rhyming-parts', methods=["GET"])
def rhyming_part(word):
    #TODO escape chars for sql injection
    if request.method == "GET":
        if word in seen or Word.query.filter_by(word=word).first():
            res = Word.query.filter_by(word=word).all()
            return {
                word: [w.rhyming_part for w in res]
            }
        else:
            try:
                phones = pronouncing.phones_for_word(word)
                for phone in phones:
                    rhyming_part = pronouncing.rhyming_part(phone)
                    rhyming_part_string = "".join(pattern.findall(rhyming_part))
                    w = Word(
                        word = word,
                        phone = phone,
                        rhyming_part = rhyming_part_string,
                    )
                    db.session.add(w)
                    db.session.commit()
                seen.append(word)
                return "Success", 200
            except:
                #log word not found in pronouncing library
                w = Word(
                    word = word,
                    phone = None,
                    rhyming_part = None,
                )
                db.session.add(w)
                db.session.commit()
                return "Failure", 200

    return {}