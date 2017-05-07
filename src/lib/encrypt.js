// 加解密
import CryptoJS from 'crypto-js'

const {encryptKey} = require('config/encrypt.config')

export const encrypt = (str) => {
	return CryptoJS.DES.encrypt(
		CryptoJS.enc.Utf8.parse(str),
		CryptoJS.enc.Utf8.parse(encryptKey),
		{
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		}
	).ciphertext.toString(CryptoJS.enc.Hex).toString()
}

export const decrypt = (encryptedStr) => {
	return CryptoJS.DES.decrypt(
		{
			ciphertext: CryptoJS.enc.Hex.parse(encryptedStr),
		},
		CryptoJS.enc.Utf8.parse(encryptKey),
		{
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		}
	).toString(CryptoJS.enc.Utf8).toString()
}
