import {trimPrice, convertDigit} from '../utils';

describe('trimPrice', () => {
  it('should return return a dollar sign if price is zero or null', () => {
    expect(trimPrice(0)).toEqual(' $');
    expect(trimPrice(null)).toEqual(' $');
  });

  it('shoule return a number with a dollar sign if number is an integer', () => {
    expect(trimPrice(2)).toEqual('2 $');
  });
});

describe('convertDigit', () => {
  it('should return false if the second parameter is yyyy-MM-dd', () => {
    let str1 = [1,2], str2 = 'yyyy-MM-dd';
    expect(convertDigit(str1, str2)).toBe(true);
  });

  it('should return true if the typed date in the search is the same as date in data', () => {
    let str1= [{investment_date:"07/01/2016"}, {investment_date: "07/01/2016"}], str2 = "2016-07-01";
    expect(convertDigit(str1, str2)).toBe(true);
  });

  it('should return false is not the same as the searched date',() => {
    let str1 = [{investment_date:"07/01/2016"}], str2 = "2019-03-02";
    expect(convertDigit(str1,str2)).toBe(false);
  });
});
