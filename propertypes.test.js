import PropTypes from './'

const Test = () => <></>

Test.propTypes = {
  a: PropTypes.string
}

test('Component has "a" prop with valid propTypeName info', () => {
  expect(Test.propTypes.a.info.type).toBe('string')
})
