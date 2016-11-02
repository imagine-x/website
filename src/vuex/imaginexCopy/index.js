import _ from 'lodash'

import { itsPossible } from './itsPossible'
import { factsFigures } from './factsFigures'

let ads = _.concat(
  factsFigures,
  itsPossible,
)

export const imaginexCopy = ads
export const imaginexBase = ads[0]
