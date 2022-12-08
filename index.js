// Your code here

function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeedata){
    return employeedata.map(function(employee){
            return createEmployeeRecord(employee);
        });
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function  createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function hoursWorkedOnDate(employee, date) {
    let inEvent = employee.timeInEvents.find((e) => e.date === date)
    let outEvent = employee.timeOutEvents.find((e) => e.date === date)
    return (outEvent.hour - inEvent.hour)/100

    
}

function wagesEarnedOnDate(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage);
}


function allWagesFor(employee){
    let payableDates = employee.timeInEvents.map((e) => e.date)
  
let payable = payableDates.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date),0)
return payable
}
function findEmployeeByFirstName(array, firstName) {
    return array.find((e) => e.firstName === firstName)
}

function calculatePayroll(array){
    return array.reduce((acc, e) => acc + allWagesFor(e),0)
}
