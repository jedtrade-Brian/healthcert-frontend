export function formatDate(date){
    date = new Date(+date);
    let dd = date.getDate();
    let month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    let mm = month[date.getMonth()];

    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    return `${dd} ${mm} ${yyyy}`;
}
export function formatTime(date){
   date = new Date(date);
   let hh=date.getHours();
   if(hh<10){
     hh="0"+hh;
   }
   let min = date.getMinutes();
   if(min<10){
     min="0"+min;
   }
   return `${hh}:${min}` 
}

export function unixTimestampToDate (UNIX_timestamp) {
  var a = new Date(UNIX_timestamp );
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  // console.log('Year : ',year);
  // console.log('month : ',month);
  // console.log('date : ',date);
  return  (date + ' ' + month + ' ' + year)
}

// Both gives same time
export function unixTimestampToTime (UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  return  (hour + ':' + min + ':' + sec)
}

export function getDateFromUnixTimestamp (UNIX_timestamp) {
  return new Date(UNIX_timestamp).toLocaleDateString()
}
// Both gives same time
export function getTimeFromUnixTimestamp (UNIX_timestamp) {
  return new Date(UNIX_timestamp).toLocaleTimeString("en-US")
}

export function getTimeFromUnixTimestampNew (UNIX_timestamp) {
  return new Date(UNIX_timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export default {
    formatDate,
    formatTime,
    getDateFromUnixTimestamp,
    getTimeFromUnixTimestamp,
    getTimeFromUnixTimestampNew
}