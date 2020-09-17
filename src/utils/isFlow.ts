export default (msg?: string) => {
    if(!msg) return false
    
    return msg.slice(0, 1) !== '/'
}