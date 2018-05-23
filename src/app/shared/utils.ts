export class SharedUtils {
    isStringNullOrEmpty(value): boolean {
        let returnFlag = (value && value === '') ? true : false;
        return returnFlag
    }
}
