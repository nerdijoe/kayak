const moment = require('moment');

exports.getDuration = function(start, end){
  var start = moment(start, 'hh:mm A');
  var end = moment(end, 'hh:mm A');
  const duration = end.diff(start, 'minutes');
  return duration;
};

exports.getDepartureDate = function(departureDate, departureTime, arrivalTime){
  var depart = moment(departureTime);
  var arrival = moment(arrivalTime);
  if (depart.isBefore(arrival)){
    return departureDate;
  } else{
    return depart.add('days', 1);
  }
};

exports.isSameDay = function(dateA, dateB){
  return moment(dateA, "yyyy-MM-DD").isSame(moment(dateB, "yyyy-MM-DD"), "day");
};

