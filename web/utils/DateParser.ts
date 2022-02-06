export const hasEnded = (date: Date) => {
    return date <= new Date();
}

export const parseDate = (future_date: Date, past_date: Date) => {

    // get total seconds between the times
    var delta = (future_date.getTime() - past_date.getTime()) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    if (days > 0) {
        return `${days}d`;
    }
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    if (hours > 0) {
        return `${hours}h`;
    }
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    if (minutes > 0) {
        return `${minutes}m`;
    }
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;
    if (seconds > 0) {
        return `${seconds.toFixed(0)}s`;
    }

    return "error";
}
