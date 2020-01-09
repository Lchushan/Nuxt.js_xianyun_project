
export const dataFormat = (data, spe) => {
  data = new Date(data)
  spe = spe || '/'
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  var day = data.getDate()
  var hh = data.getHours()
  if (hh < 10) {
    hh = '0' + hh
  }
  var mm = data.getMinutes()
  if (mm < 10) {
    mm = '0' + mm
  }
  return year + spe + month + spe + day + '  ' + hh + ':' + mm
}