export function getDate(date) {
    date = new Date(date)
    date = date.toLocaleString()
    return date.split(", ")
}


export function daysLeft(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    const difference = date2.getTime() - date1.getTime()
    return Math.round(difference / (1000 * 3600 * 24))
}

export function getFormDate(date) {
    date = new Date(date)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
}