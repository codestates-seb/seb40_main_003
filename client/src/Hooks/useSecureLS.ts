import SecureLS from "secure-ls"

const ls = new SecureLS({encodingType: 'aes', isCompression: true, encryptionSecret: process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY})

/** string 형태의 key를 인자로 해당키의 아이템을 복호화후 리턴하는 함수 */
export const getLS =(key:string)=>{
    const value = ls.get(key)
    return value
}
/** string 형태의 key와, item을 인자로 해당키의 아이템을 암호화후 저장하는 함수 */
export const setLS =(key:string,item:any)=>{
    ls.set(key,item)
    return
}