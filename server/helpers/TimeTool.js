const moment = require('moment');

exports.getDuration = function(start, end){
  var start = moment(start, 'hh:mm:ss A');
  var end = moment(end, 'hh:mm:ss A');
  const duration = end.diff(start, 'minutes');
  return duration;
};

exports.getDepartureDate = function(departureDate, departureTime, arrivalTime){
  var depart = moment(departureTime, 'hh:mm:ss A');
  var arrival = moment(arrivalTime, 'hh:mm:ss A');
  if (depart.isBefore(arrival)){
    return departureDate;
  } else{
    return departureDate.add('days', 1);
  }
};