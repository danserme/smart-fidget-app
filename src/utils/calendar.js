import dayjs from "dayjs";

export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year(),
    data
) => {
    const recordDates = [];
    const sessionCounts = {};
    const details = {};
    data.forEach(el => {
        const d = el.date.split('.')[0];
        const m = el.date.split('.')[1];
        const y = el.date.split('.')[2];
        const date = new Date(parseInt("20"+y), m-1, d);
        const val = dayjs(date).toDate().toDateString();
        recordDates.push(val);
        sessionCounts[val] = el.sessionCount;
        details[val] = el;
    });
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    //generate prefix dates
    for (let i = 0; i < firstDateOfMonth.day()-1; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: firstDateOfMonth.day(i)
        });
    }

    //generate current month
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
            hasData: recordDates.includes(firstDateOfMonth.date(i).toDate().toDateString()) ? true : false,
            sessionCount: sessionCounts[firstDateOfMonth.date(i).toDate().toDateString()],
            detailed: recordDates.includes(firstDateOfMonth.date(i).toDate().toDateString()) ? details[firstDateOfMonth.date(i).toDate().toDateString()] : {}
        });
    }

    //generate suffix dates
    const remaining = 7 * 5 - arrayOfDate.length;

    for (let i = lastDateOfMonth.date()+1; i <= lastDateOfMonth.date()+remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i)
        });
    }


    return arrayOfDate;
};

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]