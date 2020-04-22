
export const trimPrice = num => {
  if (num === 0 || num === null) {
    num = '';
  }
  return num + ' $';
}

export const convertDigit = (str1, str2) => {
  if (str2 !== 'yyyy-MM-dd') {
    for (let i = 0; i < str1.length; i++) {
      let str = str1[i].investment_date.split('/');
      str = [str[2], str[0], str[1]].join('-');
      if (str === str2) return true;     
    }
    console.log(str1, str2)
    return false
  } else {
    return true;
  }
}
