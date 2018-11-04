var locations = []
var dataTypes = [{
    id:"MLPAH", label:"MedianListing"
},
{
    id:"MRPAH", label:"MedianRental"
},
{
    id:"PHDVAH", label:"PercentDecreasing"
},
{
    id:"PHIVAH", label:"PercentIncreasing"
}]

function look_up_city() {
    var city = $('input[name="city"]').val()
    var state = $('input[name="state"]').val()
    var matches = locations.filter(function(location){
        return location.city == city && location.state == state
    })
    var location = matches[0]
    for (let dataType of dataTypes) {
        var url = geturl(location.code, dataType.id)
        console.log(url)
        $.getJSON(url, function(data){
            console.log(data)
            var units = ""
            if (dataType.label.startsWith("Percent")) {
                units = "%"
            } else {
                units = "$"
            }
            $("#"+ dataType.label).html(gettable(data, units))
        })
    }

}
function round(num){
    return Math.round(num)
}
function gettable(data, units){
    var rows = data.dataset_data.data.filter(function(item, index){
        return index % 10 == 0
    })
    return `
    <table>
    <tr><th>Date</th><th>Value</th></tr>
    ${rows.map(function(item){
        return getrow(item, units)
    }).join("\n")}</table>`
}
function getrow(item, units){
    value = round(item[1])
    if (units == "%") {
        value = value + "%"
    } else {
        value = "$" + value
    }
    return `
    <tr><td>${item[0]}</td><td>${value}</td></tr>`
}
function start_up() {
    $.get("https://raw.githubusercontent.com/eberejustin/homie/master/areas_city.txt", function(data) {
            var lines = data.split("\n")
            for (var line of lines){
                var parts = line.split("|")
                var cityAndState = parts[0].split(", ")
                var code = parts[1]
                var city = cityAndState[0]
                var state = cityAndState[1]
                locations.push({
                    code,city,state
                })
            }
        })

}
function geturl(cityCode, dataType) {
    base = "https://www.quandl.com/api/v3/datasets/ZILLOW/C"
    url = base + cityCode + "_" + dataType + "/data.json?api_key=HpkpW4W-Hy-k1fsWxs-3"
    return url

}
$(document).ready(function(){
    start_up()
})
