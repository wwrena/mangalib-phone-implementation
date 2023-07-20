export function clearSpaces(str: string | undefined) {
    if (str == undefined) return;
    return str.replaceAll('\n', '').replaceAll(/\s+/g, ' ');
}
