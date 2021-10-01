<br />
<p align="center">
  <h2 align="center">propertypes</h2>
  <p align="center">
    An extension to React prop-types package but with props info you can read from imported components.
</p>
<br />

## About The Project

To get a local copy up and running follow these simple steps.
<br />

### Required dependencies

  ```sh
  prop-types: ^15.7.2
  react: ^17.0.2
  ```
<br />

## Usage

Use this package instead of `prop-types`:

  ```js
  // Component.jsx
  import Proptypes, { string } from 'propertypes'

  Component.propTypes = {
    x: string
  }

  // Other

  Component.propTypes.x.info.type === 'string'

  ```
<br />

## Know Issues

* There is no way to check if a prop is required, I'm currently fixing this.

<br />

## License

Distributed under the MIT License. See `LICENSE` for more information.
