# Warm up exercises

We will first start with several very basic exercises not related to any UI framework. These exercises are meant to
introduce you to the testing framework and give time for your first coffee to have it's effects kick in.

## Getting started
This repository is configured to use [Jest](https://jestjs.io/docs/en/getting-started) as the test runner.
To get started:

```bash
npm install
```

Now you can configure your favorite IDE to run Jest:
- **IntelliJ/Webstorm:** You are almost done, a plugin for Jest is built-in. All that is left to do is to configure a
Jest run configuration that uses `./jest.config.js` and the `--watch` option.
- **VS Code:** There is a [plugin](https://github.com/jest-community/vscode-jest) that could help.
- **Anything else:** No worries! Jest has an amazing CLI, just run `npm run test` to get started.

**Tip:** This [Jest cheat sheet](https://devhints.io/jest) might be useful.

## Exercise 1
Located under `./src/app/basic-exercises/exercise-1` you will find the first 'challenge'. It contains a boring Counter class.

### 1.1
Open the `counter.spec.ts` file and write your very first test case that checks that an instance of the Counter class
can be created. Don't know how to start? Alright alright, here is the solution:
                
```javascript
test('Instances of the Counter class can be constructed', () => {
   new Counter();
});
```

While not very exciting and useful, the Jest test runner should have noticed this change in the test file and should
now be running green. Great! But we are not testing a lot at the moment.

Next step, modify the test so it verifies that *a newly created Counter instance should always start with a count of 0*.
The documentation on [Jest matchers](https://jestjs.io/docs/en/using-matchers) should help you further.

**Tip:** I `expect` this exercise `toBe` a piece of cake!

### 1.2
Let us now write an individual test for each of the following statements:
- Increasing the counter three times should result in the counter having a count of 3.
- Decreasing it once and then increasing it three times should result in the counter having a count of 2.
- Increasing the counter twice and resetting it should result in the counter having a count of 0.

**Tip:** You can reduce some boilerplate using test [setup and teardown](https://jestjs.io/docs/en/setup-teardown).

### 1.3
Hold on! There are some last minute changes in the requirements. Apparently counters are not allowed to drop below zero.
Modify the Counter class to make it compliant with these new requirements.

If all went well, there should now be a single test that fails. Replace the test belonging to the (now invalid) second
statement of exercise 1.2 with a new one that makes sense.

## Exercise 2
Located under `./src/app/basic-exercises/exercise-2` is the next exercise. Another boring counter, but this time with an external
dependency and asynchronous behaviour.

### 2.1
Similar to exercise **1.1**, write a test that verifies that a new Counter instance is initialised with a count
of zero. Make sure you read the Jest docs about [asynchronous code](https://jestjs.io/docs/en/asynchronous#async-await),
especially the last section about `async/await`. The usage of async/await can result in clearer and concise test code.

Here is an example of an async test:

```javascript
test('Amazing async test', async () => {
    await Godot();
});
```

### 2.2
Repeat exercise 1.2 for the new counter. This implementation has a dependency on an external API.
A unit test with any external dependency is a bad unit test. The API in this exercise is even so slow that it makes
the test runner time out. We need an escape hatch, time to start mocking!

Try to create a mock that is compliant with the interface of the Api class. Jest's
[jest.fn](https://jestjs.io/docs/en/mock-function-api) could perhaps be of use.

## Exercise 3 
Time to turn it up a notch. Let's dive into something more Angular specific.

### 3.1 Pipes
Starting with the most easy exercise for the Angular Framework unit tests, pipes!
You can find the exercise in `./src/app/shared/pipes`.
The pipe should have 3 different cases, write a test for at least each one of them.

### 3.2 Services
Next some very important tests in an Angular Application, services.
You will have to use mocking for these tests.
You can find the exercises in `./src/app/shared/services`.
Let us try to write some tests that verify the behaviour of the `book.service.ts` and `language.service.ts`.

### 3.3 Components
Now the most complicated ones of an Angular app, components. Let us try to test the following:
- The `handIn` logic in the `my-books.component.ts`
- The `borrow` logic in the `all-books.component.ts`

## Exercise 4
[Snapshot testing](https://jestjs.io/docs/en/snapshot-testing) can be a very useful addition to your testing toolkit,
but don't go overboard with it. The concept is simple, let your application code generate a javascript object,
string or even (HTML) node-tree and assert in your test that it should equal to a predefined template.

Jest has built-in support for snapshot testing, all that is required is: `expect(fragment).toMatchSnapshot()`. On
the first run of the test, Jest will automatically save the template next to the test file in a `__snapshots__`
directory. Subsequent test runs will compare with the stored snapshot template and fail the test in case of a mismatch.

### 4.1
For the Books component two snapshot tests are written, see `./src/app/shared/books/books.component.spec.ts`. Play around
with the component by modifying it and observe how Jest will react. (Assuming you still have the tests running.)

### 4.2
Create new snapshot tests for the MyBooks or AllBooks component.
Since this is the first time we are actually really testing DOM-interactions make sure to take a look
at the [Angular testing documentation](https://angular.io/guide/testing#component-dom-testing).

## Exercise 5
Let's create a book recommendation system, an exercise for two people. One person creates the tests and the other one
the implementation for exercise 5.1, switch roles in exercise 5.2. Before starting, first agree on a contract that
should be implemented and can be used to write tests against.

### 5.1
Calculate similarity score given two books. You can decide yourselves how you would calculate the similarity.
Here are some ideas:
- Levenshtein distance on book title, author, description, ...
- Number of similar words occurring in the book title's
- Date of publishing
- ...

The final contract you agree on should be something like the following function signature:
```javascript
// Book type := {
//     id: number,
//     title: string,
//     author: string,
//     ...
// }
function calculateSimilarityScore(bookA, bookB) {
    // return a number from 0 to 1
}
```
But make sure to also define smaller sub-contracts, for example calculating the similarity for two plain strings.

### 5.2
Now switch roles. We will now be extending from 5.1, this time we would like to be able to get the N most similar books
given a specific book and a collection of books to choose from. Don't forget to first specify a contract! 
