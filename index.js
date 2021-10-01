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

Object.keys(PropTypes).forEach((propTypeName) => {
  if (propTypeName !== 'PropTypes') {
    properTypes[propTypeName] = enhancePropType(
      PropTypes[propTypeName],
      { propTypeName },
    )
  }
})

// override "instanceOf"
properTypes.instanceOf = (jsClass) =>
  enhancePropType(PropTypes.instanceOf(jsClass), {
    className: jsClass && jsClass.name,
    propTypeName: 'instanceOf',
  })

// override "oneOf"
properTypes.oneOf = (allowedValues) =>
  enhancePropType(PropTypes.oneOf(allowedValues), {
    allowedValues,
    propTypeName: 'oneOf',
  })

// override "oneOfType"
properTypes.oneOfType = (allowedPropTypes) =>
  enhancePropType(PropTypes.oneOfType(allowedPropTypes), {
    allowedPropTypes,
    propTypeName: 'oneOfType',
  })

// override "arrayOf"
properTypes.arrayOf = (allowedChildrenPropType) =>
  enhancePropType(PropTypes.arrayOf(allowedChildrenPropType), {
    allowedChildrenPropType,
    propTypeName: 'arrayOf',
  })

// override "objectOf"
properTypes.objectOf = (allowedChildrenPropType) =>
  enhancePropType(PropTypes.objectOf(allowedChildrenPropType), {
    allowedChildrenPropType,
    propTypeName: 'objectOf',
  })

// override "shape"
properTypes.shape = (objectShape) =>
  enhancePropType(PropTypes.shape(objectShape), {
    objectShape,
    propTypeName: 'shape',
  })

properTypes.PropTypes = properTypes
export default properTypes
