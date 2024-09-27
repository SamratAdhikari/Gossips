export function extractTime(dateString) {
    // Convert the UTC date string to a Date object
    const date = new Date(dateString);

    // Convert the date to local timezone and extract day and time
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // Get short form of day (Sun, Mon, etc.)
    const hours = padZero(date.getHours()); // Local time hours
    const minutes = padZero(date.getMinutes()); // Local time minutes

    return `${dayOfWeek} ${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number.toString().padStart(2, "0");
}
