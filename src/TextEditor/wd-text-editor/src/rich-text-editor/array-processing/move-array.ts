const moveArray = <T>(
    sourceArray: T[], 
    sliceStart: number, 
    destinationArray: T[], 
    destinationIndex: number, 
    sliceEnd?: number
): void => {
    
    sliceEnd = sliceEnd ?? sourceArray.length;

    
    const extractedSlice = sourceArray.splice(sliceStart, sliceEnd - sliceStart);

    
    destinationArray.splice(destinationIndex, 0, ...extractedSlice);
}

export default moveArray;