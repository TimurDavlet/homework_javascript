// Создать класс данных “Товар”
export class Product {

  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

  getValueParam(value) {
    return this[value];
  }

}

// Вынес сортировку в отдельную функцию
const sortStringValue = (text, sor, value, arr) => {
  let newArr = []
  if (value !== '') {
    const valLength = value.length;
    if (sor === 'contains') {
      newArr = [...newArr, ...arr.filter((el) => el.getValueParam(text).includes(value))];
    }
    else if (sor === 'starts') {
      newArr = [...newArr, ...arr.filter((el) => el.getValueParam(text).slice(0, valLength) === value)];
    }
    else {
      const filterArr = arr.filter((el) => {
        const param = el.getValueParam(text);
        return param.slice(param.length - valLength, param.length) === value;
      });
      newArr = [...newArr, ...filterArr];
    }
  }
  return newArr;
}

// Вынес сортировку в отдельную функцию
const sortNumberValue = (text, value, arr) => {
  if (value !== '') {
    const simbol = value.replace(/[^<=>]/ig, '');
    const val = Number(value.replace(/[^0-9]/ig, ''));
    if (simbol === '=') {
      return arr.filter((el) => el.getValueParam(text) === val);
    }
    else if (simbol === '>') {
      return arr.filter((el) => el.getValueParam(text) > val);
    }
    else if (simbol === '<') {
      return arr.filter((el) => el.getValueParam(text) < val);
    }
    else if (simbol === '<=') {
      return arr.filter((el) => el.getValueParam(text) <= val);
    }
    else if (simbol === '>='){
      return arr.filter((el) => el.getValueParam(text) >= val);
    }
  }
}

// Написать метод, который получает строку вида
// “name-contains-fd&price-=2-&quantity->5&description-ends-abc”
// “name-starts-fd&quantity=5”
// На выходе возвращает массив, только с подходящими объектами
export const sortArr = (str, arr) => {
  let copArr = [...arr];
  const arrSortValue = str.split('&');
  if (arrSortValue.length === 0) {
    return arr;
  }
  arrSortValue.forEach(element => {
    const sortValue = element.split('-');
    if (sortValue.length > 2) {
      const [text, sor, value] = sortValue;
      copArr = sortStringValue(text, sor, value, copArr);
    }
    else {
      const [text, value] = sortValue;
      copArr = sortNumberValue(text, value, copArr);
    }
  });
  return copArr;
}

// Наполнить массив объектами такого класса.
const array = [new Product('Phone', 30000, 7, 'Samsung'), new Product('Komb', 50000, 2, 'Samsung'), new Product('Phone', 100000, 1000, 'Apple')];

// Проверка
// const str = 'name-ends-ne&price->=30000&quantity->=7&description-ends-ng';
// console.log(sortArr(str, array))
