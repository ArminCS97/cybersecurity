function isLetter(str) {
  return str.length === 1 && str.match(/[a-zA-Z]/i)
}

function isUpperCase(character) {
  if (character === character.toUpperCase()) {
    return true
  }
  if (character === character.toLowerCase()) {
    return false
  }
}

export function vigenere_validate(word, hasKey, key) {
  let letters = /^[A-Za-z]+$/;
  if (hasKey) {
    if (!key) {
      return { success: false, message: 'Input a key please.' };
    }
    if (!key.match(letters)) {
      return {
        success: false,
        message: 'No digits or white spaces allowed for this function.'
      };
    }
  }
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!word.match(letters)) {
    return { success: false, message: 'No digits or white spaces allowed for this function.' };
  }
  return { success: true };
}


export function vigenere_encrypt(message, key) {
  let result = '';

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i);
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
      } else {
        result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
      }
    } else {
      result += c;
    }
    j = ++j % key.length;
  }
  return result;
}


export function vigenere_decrypt(message, key) {
  let result = ''

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i)
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
      } else {
        result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
      }
    } else {
      result += c
    }
    j = ++j % key.length
  }
  return result
}

export const VIGENERE_DESC = 'Vigenere Cipher is a method of encrypting alphabetic text.'
export const LONG_DESC_VIGENERE = 'First described by Giovan Battista Bellaso in 1553, the cipher is easy to understand ' +
  'and implement, but it resisted all attempts to break it until 1863, three centuries later.' +
  ' This earned it the description le chiffre indéchiffrable (French for \'the indecipherable cipher\').' +
  ' Many people have tried to implement encryption schemes that are essentially Vigenère ciphers.[3] In 1863,' +
  ' Friedrich Kasiski was the first to publish a general method of deciphering Vigenère ciphers.'
