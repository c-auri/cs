export function sort(array: number[]): number[] {
    if (array.length <= 1)
        return array

    const { left, right } = split(array)

    return merge(sort(left), sort(right))
}

function split(array: number[]) {
    const middleIndex = Math.round(array.length / 2)

    return {
        left: array.slice(0, middleIndex),
        right: array.slice(middleIndex)
    }
}

function merge(left: number[], right: number[]) {
    let result = []
    let i = 0
    let j = 0

    while(i < left.length || j < right.length) {
        if (j === right.length || left[i] <= right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }

    return result
}