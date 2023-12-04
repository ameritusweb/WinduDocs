const incrementEnd = (input: string): string => {
    
    const regex = /(\d+)$/;

    
    const match = input.match(regex);

    if (match) {
        
        let numberPart = parseInt(match[0], 10);
        if (numberPart >= Number.MAX_SAFE_INTEGER)
        {
            numberPart = 0;
        }
        const incrementedNumberPart = numberPart + 1;

        
        return input.replace(regex, incrementedNumberPart.toString());
    }

    
    return input;
}
export default incrementEnd;