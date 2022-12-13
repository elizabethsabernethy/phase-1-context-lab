function createEmployeeRecord(employeeRecord){
    const employeeObj = {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

function createEmployeeRecords(employeeRecords){
    const employees = [];
    for(let i=0; i<employeeRecords.length; i++){
        employees[i] = createEmployeeRecord(employeeRecords[i])
    }
    return employees;
}

function createTimeInEvent(dateStamp){
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateStamp){
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0,10)
    }
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date){
    let timeInObject;
    let timeOutObject;
    this.timeInEvents.forEach(element => {
        if(element.date === date){
            timeInObject = element.hour;
        }
    });
    this.timeOutEvents.forEach(element => {
        if(element.date === date){
            timeOutObject = element.hour;
        }
    })
    const totalHoursWorked = (timeOutObject - timeInObject)/100;
    return totalHoursWorked;
}

function wagesEarnedOnDate(date){
    const hourlyWage = this.payPerHour;
    const totalHoursWorked = hoursWorkedOnDate.call(this, date);
    return hourlyWage * totalHoursWorked;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => {
        let name = employee.firstName;
        if(name == firstName){
            return employee;
        }
        else{
            return undefined;
        }
    })
}

function calculatePayroll(employees){
    return employees.reduce((accumulator, currentValue) => accumulator + allWagesFor.call(currentValue), 0)
}

