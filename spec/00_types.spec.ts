describe('types in typescript', () => {
    describe('declaring variables and constants', () => {

        it('implicitly any', () => {
            // No typescript in this example
            let x;

            x = 'tacos';
            expect(typeof x).toBe('string');
            x = 3.19;
            expect(typeof x).toBe('number');
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
                const description1 = 'The name is ' + name + ' and ' + name + ' is ' + age + ' and works as a ' + job;
                expect(description1).toBe('The name is Joe and Joe is 51 and works as a DEV');
                const description2 = `The name is ${name} and ${name} is ${age} and works as a ${job}`;
                expect(description2).toBe('The name is Joe and Joe is 51 and works as a DEV');
            });
        });
    });