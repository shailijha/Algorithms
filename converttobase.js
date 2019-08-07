const num = 137;

function converToBase(input,base) {
  let final_base_conversion = new Array();
  let remainder = input%base;
  let quotient = Math.floor(input/base);
  final_base_conversion.push(remainder);

  while(quotient>=base) {
    remainder = quotient%base;
    final_base_conversion.push(remainder);
    quotient = Math.floor(quotient/base);
  }
  final_base_conversion.push(quotient);
  return final_base_conversion;
}

console.log(converToBase(num,5).reverse().join(''));
console.log(converToBase(num,4).reverse().join(''));
