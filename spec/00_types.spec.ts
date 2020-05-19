describe('types in typescript', () => {
    describe('declaring variables and constants', () => {

        it('implicitly any', () => {
            // No typescript in this example
            let x;

            x = 'tacos';
            expect(typeof x).toBe('string');
            x = 3.19;
            expect(typeof x).toBe('number');
            // tslint:disable-next-line: only-arrow-functions
            x = function () { }
            expect(typeof x).toBe('function');
            x = ['dog', 'cat', 'mouse', 99, 'tacos'];
            expect(typeof x).toBe('object');
        });
        it('implicitly typing', () => {
            let x: string | number = 'tacos';

            x = 3.19
            x = 'sample';
            expect(typeof x).toBe('string');

            let age;
            age = 51;
            age = 'old';
            expect(typeof age).toBe('string');

            let y: number | number[];

            y = 99;
            y = [123, 6];

            expect(typeof y).toBe('object');
        });

        it('has const', () => {
            const x = 3.14 // you must initilaize it

            const favoriteColors = ['purple', 'lavendar', 'mauve'];
            favoriteColors[2] = 'indigo';

            const movie = { title: 'Fury Road', star: 'Tom Hardy' };

            movie.star = 'Charlize Theron';

            expect(movie.star).toEqual('Charlize Theron');
        });

        describe('literals in TypeScript', () => {
            it('has string literals', () => {
                const n1 = 'Bob';
                // tslint:disable-next-line: quotemark
                const n2 = "Bob";
                expect(n1).toEqual(n2);
                // tslint:disable-next-line: quotemark
                const someHtml = "<h1 class=\"pretty\">Hello</h1>";

                const name = 'Joe';
                const age = 51;
                const job = 'DEV';
                const output = 'The name is Joe and Joe is 51 and works as a DEV';
                const description1 = 'The name is ' + name + ' and ' + name + ' is ' + age + ' and works as a ' + job;
                // expect(description1).toBe('The name is Joe and Joe is 51 and works as a DEV');
                expect(description1).toEqual(output);
                const description2 = `The name is ${name} and ${name} is ${age} and works as a ${job}`;
                expect(description2).toBe('The name is Joe and Joe is 51 and works as a DEV');
            });

            it('has various ways to express numeric literals', () => {
                let age: number;
                age = 53;

                const n2 = 1.2;
                const n3 = 0xff; /// base 16 (hex)
                const n4 = 0b010101; // base 2 (binary)
                const n5 = 0o23; // base 8 (octal)

                const reallyBigNumber = 1_000_382; // can use underscore for thousands separator

                expect(reallyBigNumber).toBe(1000382);
                expect(reallyBigNumber).toEqual(1000382); // toEqual deals with deep equal for object, arrays.
            });
        });

        describe('arrays and array literals', () => {
            it('has two ways to declare an arrray', () => {
                let stuff: (number | string)[];
                stuff = ['dog', 'cat', 'mouse', 99];
                expect(stuff[0]).toBe('dog');
                expect(stuff[999]).toBeUndefined();

                let otherStuff: Array<number | string>;
                otherStuff = [1, 'bird', 99];
            });
            it('has array destructuring and a rest operator', () => {
                const friends = ['sean', 'amy', 'david', 'henry'];

                const friend1 = friends[0];
                const friend3 = friends[2];


                expect(friend1).toBe('sean');
                expect(friend3).toBe('david');

                const [first, ...allTheOthers] = friends;

                // the "rest" operator
                expect(first).toBe('sean');
                expect(allTheOthers).toEqual(['amy', 'david', 'henry']);

                // the 'spread out' operator
                const newFriends = ['billy', ...friends, 'violet'];
                expect(newFriends).toEqual(['billy', 'sean', 'amy', 'david', 'henry', 'violet']);

                function addThemAll(...numbers: number[]) {
                    return numbers.reduce((s, n) => s + n);
                }

                function addThemAllV2(n1: number, n2: number, ...numbers: number[]) {
                    return numbers.reduce((s, n) => s + n, n1 + n2);
                }
                expect(addThemAll(1)).toBe(1);
                expect(addThemAll(2, 2)).toBe(4);
                expect(addThemAll(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });

            it('tuples', () => {
                // typed arrays
                const stuff: [string, number, string] = ['Cat', 13, 'Dog'];
                const first = stuff[0];
                const second = stuff[1];
                type QuoteMarkRule = [boolean, 'single' | 'double'];
                const myQuoteRule: QuoteMarkRule = [true, 'single'];
                if (myQuoteRule[0]) {
                    console.log(`You are enforcing quote marks and using ${myQuoteRule[1]} quotes`);
                }
            });

            describe('a practical example of what you might use a tuple for (but probably would not)', () => {
                it('an oop approach', () => {
                    // string FormatName(string first, string last)
                    interface FormattedName { formattedName: string; numberOfLettersInName: number; }
                    function formatName(first: string, last: string): FormattedName {
                        const formattedName = `${last}, ${first}`
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    function formatNameCasually(first: string, last: string): FormattedName {
                        const formattedName = `${first} ${last}`;
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    const result = formatName('Han', 'Solo');
                    expect(result.formattedName).toBe('Solo, Han');
                    expect(result.numberOfLettersInName).toBe(9);
                    // const result2 = formatNameCasually('Luke', 'Skywalker');
                    // expect(result2.formattedName).toBe('Luke Skywalker');
                    const { formattedName: n } = formatNameCasually('Luke', 'Skywalker');
                    expect(n).toBe('Luke Skywalker');
                });
                it('if that wasn\'t confusing enough, here is tuples', () => {
                    function formatName(first: string, last: string): [string, number] {
                        const formattedName = `${last}, ${first}`;
                        return [formattedName, formattedName.length]
                    }
                    const results = formatName('Han', 'Solo');
                    expect(results[0]).toBe('Solo, Han');
                    expect(results[1]).toBe(9);
                    // but wait! We have destructuring
                    const [fullName] = formatName('Rey', 'Skywalker');
                    expect(fullName).toBe('Skywalker, Rey');
                });
            });
        });
    });

    describe('object literals and interface', () => {
        it('destructuring an object', () => {
            const movie = { title: 'A New Hope', director: 'Lucas', yearReleased: 1977 };
            // Old Skool
            const t1 = movie.title;
            const y1 = movie.yearReleased;
            expect(t1).toBe('A New Hope');
            expect(y1).toBe(1977);
            // new Skool
            const { title: t2, yearReleased: y2 } = movie;
            expect(t2).toBe('A New Hope');
            expect(y2).toBe(1977);
        });

        it('you can make extensible objects', () => {
            interface Book {
                title: string;
                author: { firstName: string, lastName: string };
                numberOfPages: number;
                publisher?: string;
            }
            const highWeirdness: Book = {
                title: 'High Weirdness',
                author: {
                    firstName: 'Erik',
                    lastName: 'Davis'
                },
                numberOfPages: 545
            };
            expect(highWeirdness.author.lastName).toBe('Davis');
            const theBrokeHorses: Book = {
                title: 'The Broke Horses',
                author: { firstName: 'Jannette', lastName: 'Walls' },
                numberOfPages: 265,
                publisher: 'Penguin'
            }
            function doSomethingWithABook(book: Book): string {
                let result = `Book ${book.title} by ${book.author.lastName} has ${book.numberOfPages}`;
                if (book.publisher) {
                    result += ` and was published by ${book.publisher}`;
                }
                return result;
            }
        });
        it('truth table', () => {
            expect('').toBeFalsy();
            expect('tacos').toBeTruthy();
            expect(0).toBeFalsy();
            expect(1).toBeTruthy();
            expect(-1).toBeTruthy();
            expect(undefined).toBeFalsy();
            expect(-1).toBeTruthy();
            expect(-1).toBeTruthy();

        });

        it('duck typing (aka structural typing)', () => {
            interface MessageHaver { message: string }
            function logMessage(item: { message: string }) {
                console.log(`At ${new Date().toLocaleDateString()} you got the message ${item.message}`);
            }
            logMessage({ message: 'Call your mom' });

            const phoneCall = {
                from: 'Jenny',
                number: '867-5309',
                message: 'For a good time...'
            };

            logMessage(phoneCall);

            interface AtLeastHasAMessage {
                message: string;
                [key: string]: any; // can have any other properties.
            }
            const phoneCall2: AtLeastHasAMessage = {
                message: 'Call your mom',
                from: 'Your Mom',
                time: 'Noon',
                number: '999-999-9999'
            }
            // expect(phoneCall['number']).toBe('999-999-9999');
            // 'Dictionary'
            // Dictionary<string, int> bowlingScores;
            // bowlingScores['craig'] = 127;
            // bowlingScores['joe'] = 288;
            interface BowlingScores {
                [key: string]: number;
            }
            interface Dictionary<T> {
                [key: string]: T
            }
            const scores: Dictionary<number> = {
                craig: 127,
                joe: 288,
                'mary ann': 300
            }
            expect(scores.craig).toBe(127);
            expect(scores['mary ann']).toBe(300);
            scores['jimmy jo bob'] = 145;
            const nickNames: Dictionary<string> = {
                bill: 'Billarama!',
                kevin: 'kev'
            }
            expect(nickNames.kevin).toBe('kev');
        });

    });
});