function multiplicationTable(colsValue, rowsValue, sizeValue) {
  try {
    let arr = [];
    let rowHeader = [null];
    let row = [];
    let initialColsValue = colsValue;

    if (isNaN(colsValue) || colsValue < 1 || 
        isNaN(rowsValue) || rowsValue < 1 ||
        isNaN(sizeValue) || sizeValue < 1) {
      throw new Error();
    }
  
    for (let i = colsValue; i < sizeValue + colsValue; i++) {
      rowHeader.push(i);
    }
    arr.push(rowHeader);
  
    for (let i = 1; i <= sizeValue; i++) {
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
  } catch (e) {
    alert( 'Function requires three integer arguments that are greater or equalt than 1' );
  }
}