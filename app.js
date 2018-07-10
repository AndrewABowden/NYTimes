// var startYear = ""


$("#my-form").on("submit", function (e) {
    e.preventDefault();
    var numReturns = 5;
    var searchTerm = $("#search-term").val.trim();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dd641b91b6a44e49a1ec84b1426072f2&q=" + searchTerm




    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {

        console.log(res)
        var results = res.response.docs;
        //put loop here
        console.log(results);
        for (var i = 0; i < numReturns && i < results.length; i++) {
            if (results[i].document_type === "article") {
                console.log(i)
                var recHeadline = results[i].headline.main
                var recURL = results[i].web_url
                var recSum = results[i].snippet
                var recSource = results[i].source
                var recDate = results[i].pub_date
                var holder = $("<div>")
                var title = $("<a>").text(recHeadline).attr("href", recURL)
                var sum = $("<p>").text(recSum)
                var date = $("<p>").text(convertUTCDateToLocalDate(recDate))
                var source = $("<p>").text(recSource);
                holder.append(title, sum, date, source);
                $("#results-display").append(holder);
            }
            else {
                numReturns++;
            }
        }
    })
})
function convertUTCDateToLocalDate(date) {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    var hours = newDate.getHours();
    var amPM = "AM";
    if(hours > 12) {
        hours = hours -12;
        amPM = "PM";
    }

    var dateString =
        days[newDate.getDay()]  +
        ", " + months[newDate.getMonth()] +
        " " + newDate.getDate() + " " + newDate.getFullYear() +
        " at " + hours + ":" +newDate.getMinutes() + amPM;
        
        
        
    return dateString;  
}