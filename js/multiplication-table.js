function multiplicationTable(colsValue, rowsValue, sizeValue) {
  let arr = [];
  let rowHeader = [null];
  let row = [];
  let initialColsValue = colsValue;

  for (let i = colsValue; i < sizeValue + colsValue; i++) {
    rowHeader.push(i);
  }
  arr.push(rowHeader);

  for (let i = 1; i <= sizeValue; i++) {
    // TODO: rowHeader.push(colsValue);
    row.push(rowsValue);
    for (let j = 1; j <= sizeValue; j++) {
      row.push(rowsValue * colsValue);
      colsValue++;

    }
    rowsValue++;
    colsValue = initialColsValue;
    arr.push(row);
    row = [];
  }

  return arr;
}