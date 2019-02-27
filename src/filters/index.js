export function detailTime(value) {
    if(value == 0 || value === null || value == '' || typeof value != 'number')  return '暂无信息';
    var date = new Date( value*1000 )
    var y = date.getFullYear()
    var mon = date.getMonth + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return y + '-' + mon + '-' + d + ' ' + h+ ':' + m+ ':' +s

}
