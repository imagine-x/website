import {mlas} from '../mlas'
import {rawbills} from '../bills'

const yaysAndNaysSorted = rawbills.map(bill => {
  bill.yays = _.sortBy(bill.yays, mla => {
    return mla[1]
  })

  bill.nays = _.sortBy(bill.nays, mla => {
    if(mla) return mla[1];
  })
  return bill
})

export const rawbillsSorted = _.sortBy(yaysAndNaysSorted, bill =>{
  return new Date(bill.date)
})

let passed = rawbillsSorted.filter(bill => {
  return bill.yays.length > bill.nays.length
})

let passedOverwhelmingly = passed.filter(bill => {
  return bill.nays.length < bill.yays.length - 30
})

let passedPartisan = passed.filter(bill => {
  return bill.nays.length > bill.yays.length - 30
})

let failed = rawbillsSorted.filter(bill => {
  return bill.nays.length > bill.yays.length
})

let failedPartisan = failed.filter(bill => {
  return bill.nays.length < bill.yays.length + 30
})

let failedBadly = failed.filter(bill => {
  return bill.nays.length > bill.yays.length + 30
})

export const ynSorted = _.concat(passedOverwhelmingly, passedPartisan, failedPartisan, failedBadly);

console.log(_.difference(rawbillsSorted, ynSorted));