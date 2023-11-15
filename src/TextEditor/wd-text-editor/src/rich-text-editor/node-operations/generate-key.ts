const generateKey = (): string => {
    const randomValues = () => ((Math.random() * 0x100000000) + 0x100000000).toString(16).substring(1);
    const guid = `${randomValues().substring(0, 8)}-${randomValues().substring(0, 4)}-${randomValues().substring(0, 4)}-${randomValues().substring(0, 4)}-${randomValues().substring(0, 12)}`;
    return guid;
}

export default generateKey;