casperjs-mocharunner
====================

CasperJS-powered tests using Mocha & Chai

Sample Usage
------------
```
>casperjs bin\index.js test

 test thing
   smaller test thing
     - does a test
     OK does a test
   before/afterEach example
     - does a simple test
     OK does a simple test
     - should fail
     OK should fail
     X "after each" hook: Error: expected 200 to equal 500 (undefined:243)

1 tests failed (3 tests run).

```
