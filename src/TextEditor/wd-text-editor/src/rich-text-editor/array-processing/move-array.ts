const moveArray = <T>(
    sourceArray: T[], 
    sliceStart: number, 
    destinationArray: T[], 
    destinationIndex: number, 
    sliceEnd?: number
): void => {
    // If sliceEnd is not provided, use the length of the source array.
    sliceEnd = sliceEnd ?? sourceArray.length;

    // Extract the slice from the source array.
    const extractedSlice = sourceArray.splice(sliceStart, sliceEnd - sliceStart);

    // Insert the extracted slice into the destination array at the specified index.
    destinationArray.splice(destinationIndex, 0, ...extractedSlice);
}

export default moveArray;