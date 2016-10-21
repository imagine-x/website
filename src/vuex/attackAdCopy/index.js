// async
import _ from 'lodash'

import { itsPossible } from './itsPossible'
import { stupid } from './stupid'
import { factsFigures } from './factsFigures'
import { captionThis } from './captionThis'
import { xForY } from './xForY'
let ads = _.concat(
  captionThis,
  itsPossible,
  stupid,
  factsFigures,
  xForY
)
console.log(ads)

export const attackAdCopy = ads
export const attackAdBase = ads[0]
