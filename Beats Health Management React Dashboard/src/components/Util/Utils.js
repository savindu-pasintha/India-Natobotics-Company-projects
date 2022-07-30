const Date_format = (REGION_NAME) => {
    return ((process.env.REACT_APP_REGION == REGION_NAME) ? "dd/mm/yyyy" : "mm/dd/yyyy");
}
const Date_time_format = (year, month, day, hour, minutes) => {
    const monthList = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var amPM = (hour <= 12) ? "am" : "pm";
    var monthName = "";
    if (month != "") {
        monthName = monthList[month];
    } else {
        monthName = month;
    }
    var hours = hour % 12;
    hours = hours ? hours : 12; //hour 0 should be hours = 12
    hours = (hours.toString().length != 2) ? ("0" + hours) : hours;
     minutes = (minutes.toString().length != 2) ? ("0" + minutes) : minutes;
    var formated_date_time = monthName + " " + day + " " + year + " " + hours + ":" + minutes + amPM;
    return formated_date_time;
}
module.exports = {
    Date_format,
    Date_time_format
};