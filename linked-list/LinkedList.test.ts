import { LinkedList } from "./LinkedList.ts";

describe('A newly constructed list', () => {
    describe('without provided values', () => {
        test('has size 0', () => {
            expect(new LinkedList().size).toBe(0)
        })
        test('has no head', () => {
            expect(new LinkedList().head).toBe(null)
        })
        test('has no tail', () => {
            expect(new LinkedList().tail).toBe(null)
        })
    })
    describe('with provided values', () => {
        test('has size equal to the number of provided values', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.size).toBe(3)
        })
        test('contains these values in the correct order', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.at(0)!.value).toBe('head')
            expect(list.at(1)!.value).toBe('middle')
            expect(list.at(2)!.value).toBe('tail')
        })
    })
})

describe('Contains', () => {
    describe('returns true', () => {
        test('if the passed value is at the head of the list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.contains('head')).toBe(true)
        })
        test('if the passed value is in the middle of the list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.contains('middle')).toBe(true)
        })
        test('if the passed value is at the tail of list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.contains('tail')).toBe(true)
        })
    })
    describe('returns false', () => {
        test('if the passed value is not in the list', () => {
            const list = new LinkedList('head', 'tail')
            expect(list.contains('middle')).toBe(false)
        })
        test('for an empty list', () => {
            const list = new LinkedList()
            expect(list.contains('middle')).toBe(false)
        })
    })
})

describe('Find', () => {
    test('returns null if the passed value is not in the list', () => {
        const list = new LinkedList('head', 'tail')
        expect(list.find('middle')).toBe(null)
    })
    test('returns 0 if the head contains the value', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.find('head')).toBe(0)
    })
    test('returns the correct index if a middle node contains the value', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.find('middle')).toBe(1)
    })
    test('returns the last index if the tail contains the value', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.find('tail')).toBe(2)
    })
})

describe('Accessing a node at', () => {
    test('a negative index causes an error', () => {
        expect(() => new LinkedList().at(-1)).toThrow()
    })
    test('index 0 returns the head', () => {
        const list = new LinkedList('head', 'tail')
        expect(list.at(0)!.value).toBe('head')
    })
    test('a middle index returns the node at that position', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.at(1)!.value).toBe('middle')
    })
    test('the last index returns the tail', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.at(2)!.value).toBe('tail')
    })
    test('an index larger than the size of the list returns null', () => {
        const list = new LinkedList('head', 'tail')
        expect(list.at(3)).toBe(null)
    })
})

describe('Inserting at', () => {
    describe('index 0', () => {
        test('sets given value to head', () => {
            const list = new LinkedList('head', 'tail')
            list.insertAt('new head', 0)
            expect(list.head).toBe('new head')
        })
        test('moves previous head to the successor of the prepended node', () => {
            const list = new LinkedList('head', 'tail')
            list.insertAt('new head', 0)
            expect(list.at(1)!.value).toBe('head')
        })
        test('increments size', () => {
            const list = new LinkedList('head', 'tail')
            const previousSize = list.size
            list.insertAt('new head', 0)
            expect(list.size).toBe(previousSize + 1)
        })
    })
    describe('last index', () => {
        test('sets given value to tail', () => {
            const list = new LinkedList('head', 'tail')
            list.insertAt('new tail', 1)
            expect(list.tail).toBe('new tail')
        })
        test('increments size', () => {
            const list = new LinkedList('head', 'tail')
            const previousSize = list.size
            list.insertAt('new tail', 1)
            expect(list.size).toBe(previousSize + 1)
        })
    })
    describe('a middle index', () => {
        test('sets value to given index', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.insertAt('insertion', 1)
            expect(list.at(1)!.value).toBe('insertion')
        })
        test('appends previous node at that position to the inserted node', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.insertAt('insertion', 1)
            expect(list.at(2)!.value).toBe('middle')
        })
        test('increments size', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            const previousSize = list.size
            list.insertAt('insertion', 1)
            expect(list.size).toBe(previousSize + 1)
        })
    })
})

describe('Appending a value', () => {
    describe('to a non-empty list', () => {
        test('adds that value to the tail', () => {
            const value = 'new tail'
            const list = new LinkedList()
            list.append('head')
            list.append('tail')
            list.append(value)
            expect(list.tail).toBe(value)
        })
        test('increments the size', () => {
            const list = new LinkedList()
            list.append('head')
            list.append('tail')
            const previousSize = list.size
            list.append('new tail')
            expect(list.size).toBe(previousSize + 1)
        })
    })
    describe('to an empty list', () => {
        test('adds that value to the head', () => {
            const value = 'a new node'
            const list = new LinkedList()
            list.append(value)
            expect(list.head).toBe(value)
        })
        test('adds that value to the tail', () => {
            const value = 'a new node'
            const list = new LinkedList()
            list.append(value)
            expect(list.tail).toBe(value)
        })
        test('results in size 1', () => {
            const list = new LinkedList()
            list.append('a new node')
            expect(list.size).toBe(1)
        })
    })
})

describe('Prepending a value', () => {
    describe('to a non-empty list', () => {
        test('sets that value to the head', () => {
            const value = 'new head'
            const list = new LinkedList('head', 'tail')
            list.prepend(value)
            expect(list.head).toBe(value)
        })
        test('sets the old head as the next node of the new head', () => {
            const oldHead = 'old head'
            const list = new LinkedList(oldHead, 'tail')
            list.prepend('new head')
            expect(list.at(1)!.value).toBe(oldHead)
        })
        test('increments the size', () => {
            const list = new LinkedList('head', 'tail')
            const previousSize = list.size
            list.prepend('new head')
            expect(list.size).toBe(previousSize + 1)
        })
    })
    describe('to an empty list', () => {
        test('sets that value to the head', () => {
            const value = 'a new node'
            const list = new LinkedList()
            list.prepend(value)
            expect(list.head).toBe(value)
        })
        test('sets that value to the tail', () => {
            const value = 'a new node'
            const list = new LinkedList()
            list.prepend(value)
            expect(list.tail).toBe(value)
        })
        test('results in size 1', () => {
            const list = new LinkedList()
            list.prepend('a new node')
            expect(list.size).toBe(1)
        })
    })
})

describe('Concat', () => {
    describe('two empty lists', ()=> {
        test('returns the empty list', ()=> {
            const list = new LinkedList()
            list.concat(new LinkedList())
            expect(list).toEqual(new LinkedList())
            expect(list.size).toBe(0)
        })
    })
    describe('an empty list to a non-empty list', () => {
        test('does not change the non-empty list', () => {
            const list = new LinkedList('head', 'tail')
            list.concat(new LinkedList())
            expect(list).toEqual(new LinkedList('head', 'tail'))
            expect(list.size).toBe(2)
        })
    })
    describe('a non-empty list to an empty list', () => {
        test('appends the values of the non-empty list to the empty list', () => {
            const list = new LinkedList()
            list.concat(new LinkedList('head', 'tail'))
            expect(list).toEqual(new LinkedList('head', 'tail'))
            expect(list.size).toBe(2)
        })
        test('does not change the non-empty list', () => {
            const list1 = new LinkedList()
            const list2 = new LinkedList('head', 'tail')
            list1.concat(list2)
            expect(list2).toEqual(new LinkedList('head', 'tail'))
            expect(list2.size).toBe(2)
        })
    })
    describe('two non-empty lists', ()=> {
        test('appends the values of the second list to the first', () => {
            const list1 = new LinkedList('head1', 'tail1')
            const list2 = new LinkedList('head2', 'tail2')
            list1.concat(list2)
            expect(list1).toEqual(new LinkedList('head1', 'tail1', 'head2', 'tail2'))
            expect(list1.size).toBe(4)
        })
        test('does not change the second list', () => {
            const list1 = new LinkedList('head1', 'tail1')
            const list2 = new LinkedList('head2', 'tail2')
            list1.concat(list2)
            expect(list2).toEqual(new LinkedList('head2', 'tail2'))
            expect(list2.size).toBe(2)
        })
    })
})

describe('Removing', () => {
    describe('causes error', () => {
        test('for a negative index', () => {
            expect(() => new LinkedList().removeAt(-1)).toThrow()
        })
        test('for a too large index', () => {
            const list = new LinkedList('node')
            expect(() => list.removeAt(1)).toThrow()
        })
        test('when trying to remove from an empty list', () => {
            expect(() => new LinkedList().removeAt(0)).toThrow()
        })
    })
    describe('at index 0', () => {
        test('removes value from list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(0)
            expect(list.contains('head')).toBe(false)
        })
        test('decrements size', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            const previousSize = list.size
            list.removeAt(0)
            expect(list.size).toBe(previousSize - 1)
        })
        test('sets successor of previous head as new head', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(0)
            expect(list.head).toBe('middle')
        })
    })
    describe('at a middle index', () => {
        test('removes value from list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(1)
            expect(list.contains('middle')).toBe(false)
        })
        test('decrements size', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            const previousSize = list.size
            list.removeAt(1)
            expect(list.size).toBe(previousSize - 1)
        })
        test('puts successor of removed node at given index', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(1)
            expect(list.at(1)!.value).toBe('tail')
        })
    })
    describe('at last index', () => {
        test('removes value from list', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(2)
            expect(list.contains('tail')).toBe(false)
        })
        test('decrements size', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(list.size - 1)
            expect(list.tail).toBe('middle')
        })
        test('sets predecessor of previous tail as new tail', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.removeAt(2)
            expect(list.tail).toBe('middle')
        })
    })
})

describe('Shift', () => {
    describe('from a non-empty list', () => {
        test('returns the head', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.shift()).toBe('head')
        })
        test('removes the head', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.shift()
            expect(list.head).toBe('middle')
        })
    })
    describe('from an empty list', () => {
        test('causes an error', () => {
            expect(() => new LinkedList().shift()).toThrow()
        })
    })
})

describe('Pop', () => {
    describe('from a non-empty list', () => {
        test('returns the tail', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            expect(list.pop().value).toBe('tail')
        })
        test('removes the tail', () => {
            const list = new LinkedList('head', 'middle', 'tail')
            list.pop()
            expect(list.tail).toBe('middle')
        })
    })
    describe('from an empty list', () => {
        test('causes an error', () => {
            expect(() => new LinkedList().pop()).toThrow()
        })
    })
})

describe('ToString', () => {
    test('contains all node values', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.toString()).toContain('head')
        expect(list.toString()).toContain('middle')
        expect(list.toString()).toContain('tail')
    })
    test('ends with null', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.toString().slice(-4)).toBe('null')
    })
})

describe('ToArray', () => {
    test('contains all node values and nothing else', () => {
        const list = new LinkedList('head', 'middle', 'tail')
        expect(list.toArray()).toEqual(['head', 'middle', 'tail'])
    })
})