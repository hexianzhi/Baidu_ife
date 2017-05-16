/**
 * Created by gedune on 2017/5/16.
 */
const STORAGE_KEY = 'toodos-vuejs'
export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}
