function getCountDownDate(start_time, end_time) {
  let start = moment(start_time).startOf("day")
  let end = moment(end_time).startOf("day")
  let isdelate = false
  if (end.valueOf() == start.valueOf()) {
    return 0
  }
  if (end.valueOf() < start.valueOf()) {
    ;[start, end] = [end, start]
    isdelate = true
  }
  var first = start.clone().endOf("week").startOf("day") // end of first week
  var last = end.clone().startOf("week").startOf("day") // start of last week
  var days = (last.diff(first, "days") * 5) / 7 // this will always multiply of 7
  var wfirst = first.day() - start.day() // check first week
  if (start.day() == 0) {
    --wfirst // -1 if start with sunday
  }
  if (start.day() == 6) {
    ++wfirst // 1 if start with saturday
  }
  var wlast = end.day() - last.day() // check last week
  if (end.day() == 6) {
    --wlast // -1 if end with saturday
  }
  if (end.day() == 0) {
    --wlast // -1 if end with sunday
  }
  let count = parseInt(wfirst + days + wlast) // get the total
  count = isdelate ? -count : count
  // count--
  return count
}
