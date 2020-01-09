class TableCreator {
  constructor() {
    this.table = document.querySelector('.table-bordered');
    this.onInit();
  }

  onInit() {
    console.log( 'TableCreator initialized' );
    this.setupListeners();
  }

  set tableParameters(array) {
    this._tableParameters = array;
    this.render(array);
  }

  get tableParameters() {
    return this._tableParameters;
  }

  setupListeners() {
    let button = document.querySelector('.btn-success');
    let inputs = document.getElementsByTagName('input');

    function toCreateTable(event) {
      let cols = document.querySelector('.js-config-output-cols');
      let rows = document.querySelector('.js-config-output-rows');
      let size = document.querySelector('.js-config-output-size');

      if (event.key === 'Enter' || event.type === 'click') {
        event.preventDefault();
        this.tableParameters =
          multiplicationTable(+cols.value, +rows.value, +size.value);
      }
    }

    function toMoveUpRow(event) {
      if (!event.ctrlKey && event.type === 'click') {
        let targetRowNumber = event.target.closest('tr').getAttribute('rowId');

        let newTableParameters = this.tableParameters;
        let tempTargetRow = newTableParameters[targetRowNumber];

        if(targetRowNumber === '1') {
          let tempPreviousRow = newTableParameters[newTableParameters.length - 1];

          newTableParameters[newTableParameters.length - 1] = tempTargetRow;
          newTableParameters[targetRowNumber] = tempPreviousRow;

        } else {
          let tempPreviousRow = newTableParameters[targetRowNumber - 1];

          newTableParameters[targetRowNumber - 1] = tempTargetRow;
          newTableParameters[targetRowNumber] = tempPreviousRow;
        }

        this.tableParameters = newTableParameters;
      }
    }

    function removeRow(event) {
      if (event.ctrlKey && event.type === 'click') {
        let targetRowNumber = event.target.closest('tr').getAttribute('rowId');

        let newTableParameters = this.tableParameters;

        newTableParameters.splice(targetRowNumber, 1);
        this.tableParameters = newTableParameters;
      }
    }

    // привязка собития удаления ряда на клик по таблице
    this.table.addEventListener('click', removeRow.bind(this));

    // привязка собития перемещения ряда на клавишу Ctrl и клик по таблице
    this.table.addEventListener('click', toMoveUpRow.bind(this));

    // привязка собития создания таблицы на кнопку submit
    button.addEventListener('click', toCreateTable.bind(this));

    // привязка собития создания таблицы по нажатию на клавишу Enter
    Array.from(inputs).forEach((item) => {
      item.addEventListener('keydown', toCreateTable.bind(this));
    });

    // подсветка ячеек
    this.table.addEventListener('mouseover', (event) => {
      highlightCell(computeTargetCells(event));
    });

    this.table.addEventListener('mouseout', (event) => {
      unhighlightCell(computeTargetCells(event));
    });

    function highlightCell(array) {
      if ( array.length ) {
        array[0].classList.add('active-cell');
        array[1].classList.add('active-cell');
        array[2].classList.add('active-cell');
      }
    }

    function unhighlightCell(array) {
      array[0].classList.remove('active-cell');
      array[1].classList.remove('active-cell');
      array[2].classList.remove('active-cell');
    }

    function computeTargetCells(event) {
      let resultArray = [];

      let targetCell = event.target.closest('td');

      if (!targetCell) {
        return [];
      }

      let rowNumber = targetCell.getAttribute('x-coordinates');
      let colNumber = targetCell.getAttribute('y-coordinates');

      let x = +rowNumber;
      let y = +colNumber;

      let xCell = document.querySelector('tr').getElementsByTagName('th')[x];
      let yCell = document.querySelector('tbody').getElementsByTagName('tr')[y - 1].querySelector('th');

      resultArray.push(targetCell, xCell, yCell);

      return resultArray;
    }
  }

  render(value) {
    console.log( value );

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let content = document.createDocumentFragment();

    this.table.innerHTML = '';

    content.appendChild(thead);
    thead.appendChild(tr);
    value[0].forEach((item) => {
      let th = document.createElement('th');
      th.innerHTML = item;
      tr.appendChild(th);
    });

    content.appendChild(tbody);
    for (let i = 1; i < value.length; i++) {
      let tr = document.createElement('tr');
      tr.setAttribute('rowId', i);
      tbody.appendChild(tr);

      let th = document.createElement('th');
      th.innerHTML = value[i][0];
      th.scope = 'row';
      tr.appendChild(th);

      value[i].forEach((item, index) => {
        if (index) {
          let td = document.createElement('td');
          td.setAttribute( 'x-coordinates' , `${index}`);
          td.setAttribute( 'y-coordinates' , `${i}`);
          td.innerHTML = item;
          tr.appendChild(td);
        }
      });
    }
    this.table.appendChild(content);

    console.log( 'TableCreator rendered' )
  }
}

window.onload = function(){
  new TableCreator();
};