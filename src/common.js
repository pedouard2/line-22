class Word {
    constructor(pronunciations) {
        this.pronunciations = pronunciations
    }

    get pronunciations () {
        return this.pronunciations
    }

}

class Pronunciation {
    constructor(syllables, phonemes) {
        this.syllables = syllables
        this.phonemes = phonemes
    }

    get syllables() {
        return this.syllables
    }

    get phonemes() {
        return this.phonemes
    }


}