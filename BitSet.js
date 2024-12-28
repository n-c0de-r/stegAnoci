/** 
 * Rewritten from Java's BitSet & taken documentation from it.
 * This class implements a vector of bits that grows as needed.
 *  Each component of the bit set has a boolean value. 
 * The bits of a BitSet are indexed by nonnegative integers.
 * Individual indexed bits can be examined, set, or cleared.
 */
class BitSet {
    #BITS_PER_WORD = 32;
    #ADDRESS_BITS_PER_WORD = 5;
    #WORD_MASK = 0xFFFFFFFF;

    /**
     * Constructs a BitSet with a given number of bits.
     * @param {number} nbits 
     */
    constructor(nbits) {
        if (typeof nbits === 'undefined') {
            this.words = [0];
            this.sizeIsSticky = false;
        } else {
            if (nbits < 0) throw new RangeError("nbits < 0");
            this.#initWords(nbits);
            this.sizeIsSticky = true;
        }
        
        this.wordsInUse = 0;
    }
    
    #initWords(nbits) {
        const size = this.wordIndex(nbits - 1) + 1;
        this.words = new Array(size).fill(0);
    }
    
    wordIndex(bitIndex) {
        return bitIndex >> this.#ADDRESS_BITS_PER_WORD;
    }

    size() {
        return this.words.length * this.#BITS_PER_WORD;
    }
}