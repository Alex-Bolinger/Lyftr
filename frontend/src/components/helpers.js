export function getDateString (date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return year.toString() + '/' + month.toString() + '/' + day.toString()
}

export function getDateTimeString (date) {
  const dateString = getDateString(date)

  let hours = date.getHours()
  let suffix = 'AM'
  if (hours === 0) {
    hours = 12
  } else if (hours > 12) {
    hours = hours - 12
    suffix = 'PM'
  }

  return dateString + ' ' + hours.toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ' ' + suffix
}
