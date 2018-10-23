# terse-redux
Making Redux terse... because if I have to write one more switch statement I'm going to barf.

### Installation

```bash
$ yarn add terse-redux
``` 

### This is an opinionated module (or maybe just opinionated examples)
A transpiler will be necessary if you plan to copy+paste these examples somewhere--and plan to run them.  

### Size matters
Instead of `actions.js` and a `reducer.js` (and even a `saga.js`) for each logical grouping:

```javascript
// SomeData/index.js
import { createReducer, action } from 'terse-redux'
const actionSetSomeData = action('SET_SOME_DATA')
actionSetSomeData.delta = ({ payload }) => ({
  some: {
    data: payload.data
  }
})

// ... create lots of cool actions ...

// export action builders for use elsewhere
export const setSomeData = actionSetSomeData.builder('data')

// combine action objects into a reducer
export const SomeData = createReducer(actionSetSomeData /*, ... */)
```

**Note:** *you can use the "Δ" unicode character as shorthand for the getter "delta" to be exceptionally terse (and hipster).*  

**Also note:** *don't use the "Δ" getter if you are afraid of unicode characters--or if you don't use an IDE with good typeahead.  Or you work with others.*

#### Action creators
The creator methods (syn) on an action return, uhm, an action creator.   The signature parameter(s) is/are declared as names used for mapping ordered arguments in the payload.  Action creators are typically exported for use in components and such.

```javascript
// Examples for a for an action creator with payload of { arg1: value1, arg2: value2 }

// separate args
export const setSomeData = actionSetSomeData.creator('arg1', 'arg2')

// arrays are fun
export const setSomeData = actionSetSomeData.creator(['arg1', 'arg2'])

// stringy
export const setSomeData = actionSetSomeData.creator('arg1, arg2')

// template literal because reasons
export const setSomeData = actionSetSomeData.creator`arg1, arg2`

// template literal without spaces
export const setSomeData = actionSetSomeData.creator`arg1,arg2`
```


### A pattern for asynchronous actions
If you ever use actions that chain to success or error states, this syntax is terse<sup>3</sup>:

```javascript
// SomeData/index.js
import { createReducer, attempt } from 'terse-redux'

// three actions are created: 'GET_SOME_DATA', 'GET_SOME_DATA_SUCCESS', 'GET_SOME_DATA_ERROR'
const attemptGetSomeData = attempt('GET_SOME_DATA')

// set the delta on the magically available success action
attemptGetSomeData.success.delta = ({ payload }) => ({
  some: {
  	// "result" is available in the payload for "success" actions
    data: payload.result
  }
})

export const SomeData = createReducer(attemptGetSomeData)
```

#### Extended for `redux-saga`

```javascript
// SomeData/index.js
import { createReducer, attempt, Success } from 'terse-redux'
import { myApiCall } from './my-api-call'

const attemptGetSomeData = attempt('GET_SOME_DATA')
attemptGetSomeData.success.delta = ({ payload }) => ({
  some: {
    data: payload.result
  }
})

// action builder for attempt() is type-based
export const getSomeData = attemptGetSomeData.builder('key')

// ... somewhere, something will call getSomeData("my key")
// payload will be { key: "my key" }

export const SomeData = createReducer(attemptGetSomeData)

export function* saga() {
  yield all([
    takeEvery(attemptGetSomeData.NAME, function*({ payload }) {
      try {
        const data = yield call(myApiCall, payload)
        // will build action for 'GET_SOME_DATA_SUCCESS'
        // payload will be { result: data }
        yield put(getSomeData(new Success(data)))
      } catch (error) {
        // will build action for 'GET_SOME_DATA_ERROR'
        // payload will be { error }
        yield put(getSomeData(new Error(error)))
      }
    })
  ])
}
```
