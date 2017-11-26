const moment = require('moment');

exports.getDuration = function(start, end){
  var start = moment(start, 'hh:mm:ss A');
  var end = moment(end, 'hh:mm:ss A');
  const duration = end.diff(start, 'minutes');
  return duration;
}