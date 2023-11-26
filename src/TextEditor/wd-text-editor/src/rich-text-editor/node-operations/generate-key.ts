const generateKey = (): string => {
    const randomValues = (length: number) => {
        let result = '';
        while (result.length < length) {
            result += (Math.random().toString(16).substring(2));
        }
        return result.substring(0, length);
    };
    const guid = `${randomValues(8)}-${randomValues(4)}-${randomValues(4)}-${randomValues(4)}-${randomValues(12)}`;
    return guid;
}

export default generateKey;