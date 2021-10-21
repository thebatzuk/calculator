import './Calculator.css';
import React from 'react';

//onKeyPress key codes
const keycodes = [{"id":8,"name":"Backspace"},{"id":13,"name":"Enter"},{"id":48,"name":"0"},{"id":49,"name":"1"},{"id":50,"name":"2"},{"id":51,"name":"3"},{"id":52,"name":"4"},{"id":53,"name":"5"},{"id":54,"name":"6"},{"id":55,"name":"7"},{"id":56,"name":"8"},{"id":57,"name":"9"},{"id":96,"name":"0"},{"id":97,"name":"1"},{"id":98,"name":"2"},{"id":99,"name":"3"},{"id":100,"name":"4"},{"id":101,"name":"5"},{"id":102,"name":"6"},{"id":103,"name":"7"},{"id":104,"name":"8"},{"id":105,"name":"9"},{"id":106,"name":"x"},{"id":107,"name":"+"},{"id":109,"name":"-"},{"id":110,"name":"."},{"id":111,"name":"÷"}];

//REGEX
const isOperator = /[x+\-÷]/;
const endsWithOperator = /[x+\-÷]$/;
const endsWithOperatorZero = /[x+\-÷]0$/;

//visual
const showSocial = true;

class Buttons extends React.Component {
  render() {
    return (
      <div id="button-grid">
        <button
          className="clear-button"
          id="clear"
          value="AC"
          onClick={this.props.onClearClick}
        >
          AC
        </button>
        <button
          className="number-button"
          id="delete"
          value="delete"
          onClick={this.props.onDeleteClick}
        >
         ⌫
        </button>
        <button
          className="operation-button"
          id="divide"
          value="÷"
          onClick={this.props.onOperationClick}
        >
          ÷
        </button>
        <button
          className="number-button"
          id="seven"
          value="7"
          onClick={this.props.onNumberClick}
        >
          7
        </button>
        <button
          className="number-button"
          id="eight"
          value="8"
          onClick={this.props.onNumberClick}
        >
          8
        </button>
        <button
          className="number-button"
          id="nine"
          value="9"
          onClick={this.props.onNumberClick}
        >
          9
        </button>
        <button
          className="operation-button"
          id="multiply"
          value="x"
          onClick={this.props.onOperationClick}
        >
          x
        </button>
        <button
          className="number-button"
          id="four"
          value="4"
          onClick={this.props.onNumberClick}
        >
          4
        </button>
        <button
          className="number-button"
          id="five"
          value="5"
          onClick={this.props.onNumberClick}
        >
          5
        </button>
        <button
          className="number-button"
          id="six"
          value="6"
          onClick={this.props.onNumberClick}
        >
          6
        </button>
        <button
          className="operation-button"
          id="subtract"
          value="-"
          onClick={this.props.onOperationClick}
        >
          -
        </button>
        <button
          className="number-button"
          id="one"
          value="1"
          onClick={this.props.onNumberClick}
        >
          1
        </button>
        <button
          className="number-button"
          id="two"
          value="2"
          onClick={this.props.onNumberClick}
        >
          2
        </button>
        <button
          className="number-button"
          id="three"
          value="3"
          onClick={this.props.onNumberClick}
        >
          3
        </button>
        <button
          className="operation-button"
          id="add"
          value="+"
          onClick={this.props.onOperationClick}
        >
          +
        </button>
        <button
          className="number-button"
          id="zero"
          value="0"
          onClick={this.props.onNumberClick}
        >
          0
        </button>
        <button
          className="number-button"
          id="decimal"
          value="."
          onClick={this.props.onPointClick}
        >
          .
        </button>
        <button
          className="equals-button"
          id="equals"
          value="="
          onClick={this.props.onEqualsClick}
        >
          =
        </button>
      </div>
    );
  }
}

class Social extends React.Component {
  render() {
    if(!showSocial) return (<div></div>);
    return(
        <div id="social-footer">
          <p>learning project by thebatzuk. </p>
          <a href="https://twitter.com/thebatzuk" target="_blank" rel="noreferrer">twitter</a>
          <span> - </span>
          <a href="https://github.com/thebatzuk" target="_blank" rel="noreferrer">github</a>
        </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div id="display">
        {this.props.value}
      </div>
    );
  }
}

class Formula extends React.Component {
  render() {
    return (
      <div id="formula">
        {this.props.formula}
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      formula: '',
      evaluated: false, 
    };

    this.handleNumber = this.handleNumber.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handlePoint = this.handlePoint.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.printStateToConsole = this.printStateToConsole.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleNumber(e, key = '') {
    let number;
    if(key !== '') number = key;
    else number = e.target.value;

    const {evaluated, value, formula} = this.state;

    if(evaluated) {
      this.setState({
        value: number,        
        formula:
          number === '0'
          ? '' : number
      });
    } else {
      this.setState({
        value: 
          value === '0' || isOperator.test(value)
          ? number : value + number,
        
        formula:
        value === '0' && number === '0'
          ? formula === ''
            ? '' : formula
          : endsWithOperatorZero.test(formula)
            ? formula.slice(0, -1) + number
            : formula + number 
      });
    }

    this.setState({evaluated: false});
  }

  handleOperation(e, key = '') {
    let operation;
    if(key !== '') operation = key;
    else operation = e.target.value;

    const {evaluated, value, formula} = this.state;

    if(evaluated) {
      this.setState({
        value: operation, 
        formula: value + operation
      });
    } else if(endsWithOperator.test(formula)) {
      if(operation === '-') {
        this.setState({
          value: operation, 
          formula: formula + operation
        });
      } else {
        let trimmedFormula = formula;
        while (endsWithOperator.test(trimmedFormula)) {
          trimmedFormula = trimmedFormula.slice(0, -1);
        }
        this.setState({
          value: operation, 
          formula: trimmedFormula + operation
        });
      }
    } else {
      this.setState({
        value: operation, 
        formula: formula + operation
      });
    }

    this.setState({evaluated: false});
  }

  handleEquals() {
    let expression = this.state.formula;
    const {evaluated} = this.state;
    if(!evaluated && expression !== '') {
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
                      .replace(/x/g, '*')
                      .replace(/÷/g, '/');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;

      this.setState({
        value: answer.toString(),
        formula: expression
                    .replace(/\*/g, 'x')
                    .replace(/\//g, '÷') + '=' + answer,
        evaluated: true,
      })
    }
  }

  handlePoint() {
    const {evaluated, value, formula} = this.state;

    if(evaluated) {
      this.setState({
        value: '0.', 
        formula: '0.'
      });
    } else if(!value.includes('.')) {
      this.setState({
        value: 
          endsWithOperator.test(value)
          ? '0.' : value + '.', 
        formula: 
          formula === '' || endsWithOperator.test(formula)
          ? formula + '0.' : formula + '.'
      });
    }

    this.setState({evaluated: false});
  }

  handleDelete() {
    const {evaluated, value, formula} = this.state;

    if(evaluated) {
      this.setState({
        value: value.length === 1
                ? '0' : value.slice(0, -1), 
        formula: value.length === 1
                  ? '' : value.slice(0, -1)
      });
    } else {
      this.setState({
        value: value.length === 1
                ? '0' : value.slice(0, -1), 
        formula: formula.length === 1
                  ? '' 
                  : endsWithOperator.test(formula)
                      ? formula
                      : formula.slice(0, -1)
      });
    }

    this.setState({evaluated: false});
  }

  handleClear() {
    this.setState({
      value: '0',
      formula: '',
      evaluated: false,
    });
  }

  handleKeyPress(event) {
    const value = keycodes.find(({name, id}) => id === event.keyCode).name;
    
    switch(value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.handleNumber(null, value);
        break;
      
      case '÷':
      case 'x':
      case '-':
      case '+':
        this.handleOperation(null, value);
        break;
      
      case '.':
        this.handlePoint();
        break;

      case 'Enter':
        this.handleEquals();
        break;
      
      case 'Backspace':
        this.handleDelete();
        break;
      
      default:
        break;
    }
  }

  printStateToConsole() {
    const {evaluated, value, formula} = this.state;
    console.log({evaluated, value, formula});
  }

  render() {
    this.printStateToConsole();

    return (
      <div className="App">
        <div id="upper-section">
          <Formula 
            formula={this.state.formula}
          />
          <Display 
            value={this.state.value}
          />
        </div>
        <Buttons 
          onNumberClick={this.handleNumber}
          onClearClick={this.handleClear}
          onOperationClick={this.handleOperation}
          onEqualsClick={this.handleEquals}
          onPointClick={this.handlePoint}
          onDeleteClick={this.handleDelete}
        />
        <Social />
      </div>
    );
  }
}

export default Calculator;
