import CryptoJs from "crypto-js"

const key = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY
const intiVector = process.env.NEXT_PUBLIC_ENCRYPTION_INTIVECTOR

const secretKey = CryptoJs.enc.Utf8.parse(String(key))
const iv = CryptoJs.enc.Utf8.parse(String(intiVector))

export const encryptHandler = (data: object) => {
	const preEncrypted = CryptoJs.AES.encrypt(JSON.stringify(data), secretKey, {
		iv: iv,
		mode: CryptoJs.mode.CBC,
		keySize: 128 / 8,
	})

	const encrypted = preEncrypted.toString(CryptoJs.format.Hex)
	return encrypted
}

export const decryptHandler = (data: string) => {
	const hexString = CryptoJs.enc.Hex.parse(data)
	const cipherParams = CryptoJs.lib.CipherParams.create({
		ciphertext: hexString,
	})
	const preDecrypted = CryptoJs.AES.decrypt(cipherParams, secretKey, {
		iv: iv,
		mode: CryptoJs.mode.CBC,
		keySize: 128 / 8,
	})

	const encodeDecrypted = preDecrypted.toString(CryptoJs.enc.Utf8)
	const decrypted = JSON.parse(encodeDecrypted)

	return decrypted
}
