export class Node {
    #data
    left
    right

    constructor(data, left = null, right = null) {
        this.#data = data
        this.left = left
        this.right = right
    }

    get data() {
        return this.#data
    }
}