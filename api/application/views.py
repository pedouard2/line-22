import pronouncing
import re
import time
import pyphen
from .models import *

from flask import (
    Blueprint, request, request
)

v1 = Blueprint('api', __name__, url_prefix='/v1')

pattern = re.compile(r"[A-Z]{2}\d\s?")

dic = pyphen.Pyphen(lang='en_US')

@v1.route('/time')
def get_current_time():
    return {'time': time.time()}

def get_word_entry(wrd):
    if wrd == "*":
        resp = Word.query.filter(True).all()
        seen = set()
        res = []
        for word in resp:
            if word.word not in seen:
                seen.add(word.word)
                word_entry = get_word_entry(word.word)
                res.append(word_entry)
        return res
    else:    
        res = Word.query.filter_by(word=wrd).all()
        if not res:
            return {}
        return {
            "word": wrd,
            "rhyming_parts": res[0].rhyming_part,
            "syllables": res[0].syllable,
            "children" : [add_child(wrd,w) for w in res[1:] if len(res) > 1]
            }

def add_child(word, word_entry):
    return {
        "word": word,
        "rhyming_parts": word_entry.rhyming_part,
        "syllables": word_entry.syllable
    }
@v1.route('/words/<word>/rhyming-parts', methods=["GET"])
def rhyming_part(word):
    # args = request.args
    # query = args.get('query')
    #TODO escape chars for sql injection
    if request.method == "GET":
        #TODO pattern match for space -> return space
        if Word.query.filter_by(word=word).first():
            return get_word_entry(word)
        # elif query and query == "all":
        #     return get_word_entry("*")
        else:
            try:
                phones = pronouncing.phones_for_word(word)
                syllables = dic.inserted(word)
                for phone in phones:
                    rhyming_part = pronouncing.rhyming_part(phone)
                    stresses = pattern.findall(rhyming_part)
                    if len(syllables.split("-")) == len(stresses):
                        rhyming_part_string = "".join(stresses)
                        w = Word(
                            word = word,
                            phone = phone,
                            rhyming_part = rhyming_part_string.strip(),
                            syllable = syllables
                        )
                        db.session.add(w)
                db.session.commit()
            except Exception as e:
                # print(e) # log error
                db.session.rollback()
                return  {
                    "word": word,
                    "rhyming_parts": "",
                    "syllables": word,
                    "children" : []
        }

            else:
                return get_word_entry(word)

    return {}