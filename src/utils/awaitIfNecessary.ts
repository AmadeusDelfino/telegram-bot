export default async (value: any) => {
    if(!!value && typeof value.then === 'function') value = await value

    return value
}