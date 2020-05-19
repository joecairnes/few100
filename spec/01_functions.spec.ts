describe('functions', () => {
    describe('how to declare them', () => {
        it('type types', () => {
            expect(subtract(2, 2)).toBe(0);
            // Anonymous Functions
            const add = (a: number, b: number) => a + b; // C# Lambda, in JS/TS "Arrow Functions"
            const multiply = function (a: number, b: number): number { // old skool anonymous function
                return a * b;
            }
            // Named Functions
            function subtract(a: number, b: number): number {
                return a - b;
            }
            expect(add(2, 2)).toBe(4);
            expect(multiply(2, 3)).toBe(6);

            type MathOp = (a: number, b: number) => number;

            let math: MathOp = add;
            expect(math(10, 2)).toBe(12);
            math = subtract;
            expect(math(10, 2)).toBe(8);
        });
        it('a bit more about arrow functions', () => {
            // an arrow function that takes no arguments:
            const doIt = () => console.log('Doing it.');
            doIt();
            // an arrow function that has to do more than one thing.
            const logIt = (thing: { message: string }) => {
                console.log('Fixing to run yer function');
                console.log(`Here's the message ${thing.message}`);
                return true; // when you have a block, you have to use the 'return' keyword to return something.
            }
            // an arrow function that just returns the result of an expression
            const changeIt = (what: string) => what.toUpperCase().trim();
            expect(changeIt(' hello    ')).toBe('HELLO');

            type Action = (a: string) => void;

            const doAnotherThing: Action = (x) => console.log(x);
            const x = doAnotherThing('tacos');
        });

        describe('higher-ordered functions (HOF) ', () => {
            // higher order functions take functions as params or return a function
            it('a function that takes a function', () => {
                type MathOp = (a: number, b: number) => number;
                const addition: MathOp = (a, b) => a + b;
                const subtraction: MathOp = (a, b) => a - b;
                const multiplication: MathOp = (a, b) => a * b;
                function doubleAndApply(n1: number, n2: number, op: MathOp) {
                    n1 *= 2;
                    n2 *= 2;
                    return op(n1, n2);
                }
                expect(doubleAndApply(2, 2, addition)).toBe(8);
                expect(doubleAndApply(3, 3, multiplication)).toBe(36);
                expect(doubleAndApply(2, 2, (a, b) => a / b)).toBe(1);
                const logIt = (message: string, decorator: (x: string) => string): void => {
                    console.log(decorator(message));
                }
                logIt('hello', (y) => `***${y}***`);
                logIt('boring', y => y); // identity
            });

            describe('a function that returns a function - in three parts', () => {
                it('just using an old skool function like a non-crazy person', () => {
                    function makeElement(tag: string, content: string): string {
                        return `<${tag}>${content}</${tag}>`;
                    }
                    expect(makeElement('h1', 'Tacos')).toBe('<h1>Tacos</h1>');
                    expect(makeElement('h1', 'Beer')).toBe('<h1>Beer</h1>');
                    expect(makeElement('p', 'body')).toBe('<p>body</p>');
                });
                it('an oop person would make a class!', () => {
                    class TagMaker {
                        constructor(private tag: string) { }
                        make(content: string) {
                            return `<${this.tag}>${content}</${this.tag}>`
                        }
                    }
                    const h1Maker = new TagMaker('h1');
                    const pMaker = new TagMaker('p');
                    expect(h1Maker.make('Tacos')).toBe('<h1>Tacos</h1>');
                    expect(h1Maker.make('Beer')).toBe('<h1>Beer</h1>');
                    expect(pMaker.make('body')).toBe('<p>body</p>');
                });
                it('how a functional programmer would do it.', () => {
                    function tagMaker(tag: string): (content: string) => string {
                        return (content) => `<${tag}>${content}</${tag}>`
                    }
                    const h1Maker = tagMaker('h1');
                    const pMaker = tagMaker('p');
                    expect(h1Maker('Tacos')).toBe('<h1>Tacos</h1>');
                    expect(h1Maker('Beer')).toBe('<h1>Beer</h1>');
                    expect(pMaker('body')).toBe('<p>body</p>');
                });
            });

            describe('array methods', () => {
                const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                it('to visit each element of an array', () => {
                    numbers.forEach((val, indx, coll) => console.log({ val, indx, coll }));
                });
                describe('array methods that return a new array', () => {

                    it('can return only methods that pass a predicate', () => {
                        const isEven = (n: number): boolean => n % 2 === 0;
                        const evens = numbers.filter(isEven);
                        expect(evens).toEqual([2, 4, 6, 8]);
                    });

                    it('convert each item in the array to something new', () => {
                        const doubled = numbers.map(n => n * 2);
                        expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
                        // the source array remains unchanged
                        expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    });
                });
                describe('array methods that return a single (scalar) value', () => {
                    it('testing the memebers of an array', () => {
                        const allEven = numbers.every(n => n % 2 === 0); // linq All
                        expect(allEven).toBe(false);

                        const anyEven = numbers.some(n => n % 2 === 0); // linq Any
                        expect(anyEven).toBe(true);
                    });

                    it('has reducer (and reduce right)', () => { // reduce right works through the array right to left
                        // there's not actually a reduce right here
                        const sum = numbers.reduce((s, n) => s + n);
                        expect(sum).toBe(45);
                        const sumBig = numbers.reduce((s, n) => s + n, 100);
                        expect(sumBig).toBe(145);
                    });
                });
            });
        });
    });
});