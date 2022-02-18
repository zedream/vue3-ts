import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量

// 解密方法
export function Decrypt (words: string | number): string {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(words)
  const src = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(src, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
export function Encrypt (words: string | number): string {
  const src = CryptoJS.enc.Utf8.parse(words)
  const encrypted = CryptoJS.AES.encrypt(src, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}

export function MaskMobile (mobile: string) {
  const reg = /(\d{3})\d{4}(\d{4})/
  return mobile.replace(reg, '$1****$2')
}
