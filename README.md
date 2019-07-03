# Warm up exercises

We will first start with several very basic exercises not related to any UI framework. These exercises are meant to
introduce you to the testing framework and give time for your first coffee to have it's effects kick in.

## Getting started
This repository is configured to use [Karma](https://karma-runner.github.io/latest/index.html/) as the test runner and [Jasmine](https://jasmine.github.io/index.html) as test framework. 
To get started:

```bash
npm install
```

Now you can configure your favorite IDE to run Karma/Jasmine:
- **IntelliJ/Webstorm:** You are almost done, a plugin for Karma is built-in. The Karma configuration is already placed in `./src/karma.conf.js`.
- **Anything else:** No worries! Angular has an amazing CLI, just run `npm run test` to get started. For running tests separately with the CLI just put a `f` before the `it` or `describe`.
To disable tests you'll have to put an `x` before the `it` or `describe`.

## Exercise 1
Located under `./src/app/basic-exercises/exercise-1` you will find the first 'challenge'. It contains a boring Counter class.

### 1.1
Open the `counter.spec.ts` file and write your very first test case that checks that an instance of the Counter class
can be created. Don't know how to start? [Angular Testing](https://angular.io/api/core/testing) should help before starting.

**Tip:** I `expect(‘this exercise’).toBeTruthy()’

While not very exciting, the test should now be running green. Great! But we are not testing a lot at the moment.

Next step, modify the test so it verifies that *a newly created Counter instance should always start with a count of 0*.

### 1.2
Let us now write an individual test for each of the following statements:
- Increasing the counter three times should result in the counter having a count of 3.
- Decreasing it once and then increasing it three times should result in the counter having a count of 2.
- Increasing the counter twice and resetting it should result in the counter having a count of 0.

**Tip:** You can reduce some boilerplate using `BeforeEach`.

### 1.3
Hold on! There are some last minute changes in the requirements. Apparently counters are not allowed to drop below zero.
Modify the Counter class to make it compliant with these new requirements.

If all went well, there should now be a single test that fails. Replace the test belonging to the (now invalid) second
statement of exercise 1.2 with a new one that makes sense.

## Exercise 2
Located under `./src/app/basic-exercises/exercise-2` is the next exercise. Another boring counter, but this time with an external
dependency and asynchronous behaviour. We will make use of some angular core functionality in these exercises. Make sure to read [Angular Testing]((https://angular.io/guide/testing)) when getting stuck.

### 2.1
Similar to exercise **1.1**, write a test that verifies that a new Counter instance is initialised with a count
of zero. Make sure you read the Jasmine docs about [fakeAsync](https://angular.io/api/core/testing/fakeAsync#description), [flush](https://angular.io/api/core/testing/flush), [spy's](http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/), 
[flushMicroTasks](https://angular.io/api/core/testing/flushMicrotasks), [tick](https://angular.io/api/core/testing/tick) and [discardPeriodicTasks](https://angular.io/api/core/testing/discardPeriodicTasks).
In a lot of cases using the above mentioned functions will help you testing asynchronous code.

Let us now write an individual test for each of the following statements:
- Increasing the counter three times should result in the counter having a count of 3.
- Decreasing it once and then increasing it three times should result in the counter having a count of 2.
- Increasing the counter twice and resetting it should result in the counter having a count of 0.
- SpyOn/Mock the message service and check if it returns the mocked message + if the message service got called.
- Do not spy, mock or stub the message service and check if `HELLO WORLD` is set as message by the message service during increasing of the counter.

## Exercise 3 
### Karma/Jasmine testing in an Angular Framework
Every components has 2 spec files. The first one is meant to use the Angular and TestBed configuration. 
The second one is for testing the component excluding the Angular and TestBed configuration.
Again make sure to read [Angular Testing]((https://angular.io/guide/testing)) when getting stuck. 
The difficulty of the tests will grow gradually and testing certain parts will cover other parts as well. Testing edge cases will be important!

Put all stubs that you create in the `./stubs` folder.

**Good Luck!!**

### 3.1 Pipes
Starting with the most easy exercise for the Angular Framework unit tests, pipes!
You can find the exercise in `./src/app/shared/pipes`.

### 3.2 Services
Next some very important tests in an Angular Application, services. You will have to use spying, mocking and stubbing for these tests.

**Tip:** The http-client is already stubbed, you can find it in `./stubs/http-client.service.stub.ts`.
You can find the exercises in `./src/app/shared/services`.

### 3.3 Components
Test every component in this application except for the **Admin Component**. Again you will need, spying, mocking and stubbing while dealing with async code as well.
I suggest to test every component with and without the default generated TestBed configuration to see the difference and to learn both ways of testing. 
In `./src/app/shared/example.component.spec.ts` you can find a default generated setup (including getting services for spying and mocking).

When the test complains about not knowing elements in the dom, you will have to add schemas: [CUSTOM_ELEMENTS_SCHEMAS] in the TestBed config.
This ensures that the not known elements will be stubbed (complete isolation tests).


## Exercise 4
### Admin Component
In this component you will have to test the form and the sub forms (reactive forms are used in this case). 
This includes testing the changes, what happens when the form changes and in which cases the form should be valid or not. 

**Tip:** Make sure to import ReactiveFormsModule.

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

## Extra's
## In exercise 2.2
For those freewheeling, try to solve the SpyOn/Mock of the message service exercise with marble testing [Marble Testing](https://angular.io/guide/testing) in the marble testing section.
