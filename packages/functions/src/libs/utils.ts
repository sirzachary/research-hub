export const base64Encode = (data: string) => {
    return Buffer.from(data).toString('base64');
}