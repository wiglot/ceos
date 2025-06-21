// AVISO: Esta é uma cifra de substituição simples para ofuscação, NÃO para segurança real.
// Para criptografia de ponta a ponta, use uma biblioteca robusta como crypto-js e
// gerencie as chaves de forma segura (por exemplo, exigindo uma senha do usuário).
const SECRET_KEY = 'CÉOS_DIÁRIO_DE_PENSAMENTOS_CHAVE_SECRETA_SIMPLES';

// Função simples de criptografia XOR
const xorCipher = (data: string, key: string): string => {
  return data.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length));
  }).join('');
};

/**
 * Criptografa uma string para armazenamento local.
 * @param text A string JSON a ser criptografada.
 * @returns Uma string criptografada e codificada em Base64.
 */
export const encrypt = (text: string): string => {
  try {
    const encrypted = xorCipher(text, SECRET_KEY);
    // Usar encodeURIComponent antes de btoa para lidar com caracteres especiais/unicode
    const escaped = encodeURIComponent(encrypted);
    return btoa(escaped);
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Could not encrypt data.");
  }
};

/**
 * Descriptografa uma string do armazenamento local.
 * @param encryptedText A string criptografada.
 * @returns A string JSON original.
 */
export const decrypt = (encryptedText: string): string => {
  try {
    const fromBase64 = atob(encryptedText);
    const unescaped = decodeURIComponent(fromBase64);
    return xorCipher(unescaped, SECRET_KEY);
  } catch (error) {
    console.error("Decryption failed. Data might be in plaintext or corrupted.", error);
    throw new Error("Could not decrypt data.");
  }
}; 