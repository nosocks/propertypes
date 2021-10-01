import factoryWithTypeCheckers from 'prop-types/factoryWithTypeCheckers'
import { isValidElement } from 'react'

// we do this so bundles don't replace the import
const PropTypes = factoryWithTypeCheckers(isValidElement, true)
const properTypes = {}

const enhancePropType = (propType, values) => {
  const p = propType
  p.info = { ...(propType.info ? propType.info : {}), ...values }

  // TODO: handle required props
  // if (propType.isRequired) {
  //   p.isRequired.info = Object.assign(
  //     propType.isRequired && propType.isRequired.info
  //       ? propType.isRequired.info
  //       : {},
  //     values,
  //   )

  //   p.isRequired.info.isRequired = true
  //   p.info.isRequired = false
  // }

  return p
}

Object.keys(PropTypes).forEach((type) => {
  if (type !== 'PropTypes') {
    properTypes[type] = enhancePropType(
      PropTypes[type],
      { type },
    )
  }
})

// override "instanceOf"
properTypes.instanceOf = (jsClass) =>
  enhancePropType(PropTypes.instanceOf(jsClass), {
    className: jsClass && jsClass.name,
    type: 'instanceOf',
  })

// override "oneOf"
properTypes.oneOf = (allowedValues) =>
  enhancePropType(PropTypes.oneOf(allowedValues), {
    allowedValues,
    type: 'oneOf',
  })

// override "oneOfType"
properTypes.oneOfType = (allowedPropTypes) =>
  enhancePropType(PropTypes.oneOfType(allowedPropTypes), {
    allowedPropTypes,
    type: 'oneOfType',
  })

// override "arrayOf"
properTypes.arrayOf = (allowedChildrenPropType) =>
  enhancePropType(PropTypes.arrayOf(allowedChildrenPropType), {
    allowedChildrenPropType,
    type: 'arrayOf',
  })

// override "objectOf"
properTypes.objectOf = (allowedChildrenPropType) =>
  enhancePropType(PropTypes.objectOf(allowedChildrenPropType), {
    allowedChildrenPropType,
    type: 'objectOf',
  })

// override "shape"
properTypes.shape = (objectShape) =>
  enhancePropType(PropTypes.shape(objectShape), {
    objectShape,
    type: 'shape',
  })

properTypes.PropTypes = properTypes
export default properTypes
