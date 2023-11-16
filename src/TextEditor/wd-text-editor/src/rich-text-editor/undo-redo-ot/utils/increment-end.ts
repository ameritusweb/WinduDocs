const incrementEnd = (input: string): string => {
    // Regular expression to match the trailing digits
    const regex = /(\d+)$/;

    // Find the match
    const match = input.match(regex);

    if (match) {
        // Extract the number part and increment it
        let numberPart = parseInt(match[0], 10);
        if (numberPart >= Number.MAX_SAFE_INTEGER)
        {
            numberPart = 0;
        }
        const incrementedNumberPart = numberPart + 1;

        // Replace the number part in the original string with the incremented number
        return input.replace(regex, incrementedNumberPart.toString());
    }

    // If no trailing digits are found, just return the original string
    return input;
}
export default incrementEnd;