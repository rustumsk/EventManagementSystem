
const checkIfClose = (event_date, end_time) =>{
    const event = new Date(event_date);
    const combinedDateTime = `${event.toISOString().split('T')[0]}T${end_time}`;
    const dateNow = new Date();
    const date = new Date(combinedDateTime);
    date.setDate(date.getDate() + 1);
    console.log(dateNow);
    console.log(date);
    return dateNow >= date? true : false
}

export {checkIfClose}