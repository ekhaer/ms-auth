function setExpire() {
    var date = new Date();
    // add a day
    date.setDate(date.getDate() + 1);
    console.log("date", date)
    return date;
}
module.exports = { setExpire }