


$(document).ready(

  function () {

    /*
     * Display Current Date
     */
    var today = new Date(),
      monthNameArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
      dayNameArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
      todayDay = today.getDay(),
      todayMonth = today.getMonth(),
      todayDate = today.getDate(),
      todayYear = today.getFullYear();

    var webTodayDate = (dayNameArray[todayDay] + ", " + monthNameArray[todayMonth] + " " + todayDate + ", " + todayYear);

    $('span#datejs').text(webTodayDate);
  }
);


