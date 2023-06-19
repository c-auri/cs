import { Node } from "./Node"
import { sort } from "../mergesort/sort.js"

export class Tree {
    #root

    constructor(array) {
        this.#root = buildTree(sort(array), 0, array.length - 1)
    }

    get root() {
        return this.#root
    }

    find(key) {
        return find(this.#root, key).target
    }

    insert(key) {
        insert(this.#root, key)
    }

    delete(key) {
        const { target, parent } = find(this.#root, key)

        if (target === null) {
            return
        }

        remove(target, parent)
    }
}

function buildTree(array, start, end) {
    if (start > end) {
        return null
    }

    const middle = parseInt((start + end) / 2)

    return new Node(
        array[middle],
        buildTree(array, start, middle - 1),
        buildTree(array, middle + 1, end))
}

function find(node, key) {
    if (node === null || node.data === key) {
        return { target: node, parent: null }
    }

    if (node.data > key) {
        if (node.left?.data === key) {
            return { target: node.left, parent: node }
        } else {
            return find(node.left, key)
        }
    }

    if (node.data < key) {
        if (node.right?.data === key) {
            return { target: node.right, parent: node }
        } else {
            return find(node.right, key)
        }
    }
}

function insert(node, key) {
    if (node === null) {
        return new Node(key)
    }

    if (node.data === key) {
        return
    }

    if (node.data > key) {
        if (!node.hasLeft) {
            node.left = new Node(key)
        } else {
            insert(node.left, key)
        }
    }

    if (node.data < key) {
        if (!node.hasRight) {
            node.right = new Node(key)
        } else {
            insert(node.right, key)
        }
    }
}

function remove(target, parent) {
    const targetIsLeft = parent.left?.data === target.data

    if (target.isLeaf) {
        if (targetIsLeft) {
            parent.removeLeft()
        } else {
            parent.removeRight()
        }
    } else if (!target.hasRight) {
        if (targetIsLeft) {
            parent.left = target.left
        } else {
            parent.right = target.left
        }
    } else if (!target.hasLeft) {
        if (targetIsLeft) {
            parent.left = target.right
        } else {
            parent.right = target.right
        }
    } else {
        // TODO: target has both children
    }
}