export function getSearchParams(url = '') {
  let regStr = url.match(/\?([\s\S]*)/)
  let klstrArr = regStr.split('&')
  let params = {}
  klstrArr.forEach(kvstr => {
    let [key,value] = kvstr.split('=')
    params[key] = value
  });
  return params
}