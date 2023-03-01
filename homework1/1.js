// Преобразование строки к нижнему регистру, но первая буква большая. “Abscd”
export const lowerCase = (str) => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

// Преобразование строки с целью правильно расстановки пробелов.
// Пример строки
const errorString = 'Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны. быть устранены.'

export const lineConversion = (str) => {
  const strToArr = str.split(' ');
  const delSpace = strToArr.filter((el) => el !== '');
  const correct = delSpace.reduce((acc, element, index) => {
    const space = index !== delSpace.length - 1 ? ' ' : '';
    if (element === ',') {
      acc += `${element}${space}`;
      return acc;
    }
    if (element.indexOf(',') !== -1) {
      const indexEl = element.indexOf(',');
      const lastSpase = (indexEl === element.length - 1) ? '' : ' ';
      acc += `${element.slice(0, indexEl + 1)}${space}${element.slice(indexEl + 1, element.length)}${lastSpase}`;
      return acc;
    }
    if (element === '.') {
      acc += `${element}${space}`;
      return acc;
    }
    if (element.indexOf('.') !== -1) {
      const indexEl = element.indexOf('.');
      const lastSpase = (indexEl === element.length - 1) ? '' : ' ';
      acc += `${element.slice(0, indexEl)}.${space}${element.slice(indexEl + 1, element.length)}${lastSpase}`;
      return acc;
    }
    acc += (delSpace[index + 1] === '.' || delSpace[index + 1] === ',') ? `${element}` : `${element}${space}`;
    return acc;
  }, '');
  return correct;
}

// Посдчитывающие кол-во слов в строке.
export const rowCount = (str) => str.split(' ').length;

// Подсчитывающий, уникальные слова.
export const unicRowCount = (str) => {
  const arr = str.split(' ');
  const normalizeArr = arr.map((el) => {
    const normalizeEl = el.replace(/[^a-zа-я0-9]/ig, '');
    return normalizeEl.toLowerCase();
  });
  const result = normalizeArr.reduce((acc, element) => {
    if (acc.hasOwnProperty(element)) {
      acc[element] += 1;
      return acc;
    }
    acc[element] = 1;
    return acc;
  }, {});
  return result;
};
