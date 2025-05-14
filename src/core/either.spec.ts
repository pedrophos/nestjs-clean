import { Either, left, right } from './either'

function doSomething(shouldSucess: boolean): Either<string, number> {
  if (shouldSucess) {
    return right(10)
  }

  return left('error')
}

test('Sucess result', () => {
  const sucessResult = doSomething(true)

  expect(sucessResult.isRight()).toBe(true)
  expect(sucessResult.value).toBe(10)
})

test('Error result', () => {
  const errorResult = doSomething(false)

  expect(errorResult.isLeft()).toBe(true)
  expect(errorResult.value).toBe('error')
})
