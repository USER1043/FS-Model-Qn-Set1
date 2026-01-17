import { Component } from "react";

/**
 * CalculatorMethods Component
 *
 * This component demonstrates class component methods for all calculator operations.
 * The methods are written as class methods that can be called when the component
 * is in a state to be called, but they are not currently connected to the UI.
 */
class CalculatorMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numA: "",
      numB: "",
      arithmeticResult: null,
      sumSquareResult: null,
      evenOddResult: null,
      error: "",
    };
  }
  // 1) Addition routine
  add(a, b) {
    return a + b;
  }

  // 2) Subtraction routine
  subtract(a, b) {
    return a - b;
  }

  // 3) Multiplication routine
  multiply(a, b) {
    return a * b;
  }

  // 4) Division routine
  divide(a, b) {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return a / b;
  }

  // Helper functions to validate input
  validateInputs() {
    const { numA, numB } = this.state;

    if (numA === "" || numB === "") {
      this.setState({ error: "Please enter both numbers" });
      return false;
    }

    const a = parseFloat(numA);
    const b = parseFloat(numB);

    if (isNaN(a) || isNaN(b)) {
      this.setState({ error: "Please enter valid numbers" });
      return false;
    }

    return { a, b };
  }

  validateSingleInput(numStr) {
    if (numStr === "") {
      this.setState({ error: "Please enter a number" });
      return false;
    }

    const num = parseFloat(numStr);
    if (isNaN(num)) {
      this.setState({ error: "Please enter a valid number" });
      return false;
    }

    return num;
  }

  // Clear all results and errors
  clearAll() {
    this.setState({
      numA: "",
      numB: "",
      arithmeticResult: null,
      sumSquareResult: null,
      evenOddResult: null,
      error: "",
    });
  }

  // a) Expression evaluation routine:
  // Result = (a+b)/(a-b)*(a+b)
  calculateArithmetic() {
    this.setState({ error: "" });

    const validation = this.validateInputs();
    if (!validation) return;

    const { a, b } = validation;

    if (a - b === 0) {
      this.setState({
        error: "Division by zero error: a - b cannot be zero",
        arithmeticResult: null,
      });
      return;
    }

    const sum = this.add(a, b); // (a + b)
    const diff = this.subtract(a, b); // (a - b)

    const fraction = this.divide(sum, diff); // (a+b)/(a-b)
    const result = this.multiply(fraction, sum); // ((a+b)/(a-b))*(a+b)

    this.setState({
      arithmeticResult: result,
      sumSquareResult: null,
      evenOddResult: null,
    });
  }

  // b) MoD_Sum_square: Sum of squares of digits
  calculateSumOfSquares() {
    this.setState({ error: "" });

    const { numA } = this.state;
    const validation = this.validateSingleInput(numA);
    if (validation === false) return;

    const numStr = Math.abs(Math.round(validation)).toString();
    let sum = 0;

    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i]);
      const squaredDigit = digit * digit;
      sum = this.add(sum, squaredDigit);
    }

    this.setState({
      sumSquareResult: sum,
      arithmeticResult: null,
      evenOddResult: null,
    });
  }

  // c) Even_ODD: Check if number is even or odd
  checkEvenOdd() {
    this.setState({ error: "" });

    const { numA } = this.state;
    const validation = this.validateSingleInput(numA);
    if (validation === false) return;

    if (!Number.isInteger(validation)) {
      this.setState({
        evenOddResult: "Please enter an integer for even/odd check",
      });
      return;
    }

    const isEven = validation % 2 === 0;
    const result = isEven ? "Even" : "Odd";

    this.setState({
      evenOddResult: result,
      arithmeticResult: null,
      sumSquareResult: null,
    });
  }

  componentDidMount() {
    console.log("CalculatorMethods component mounted");
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.numA !== this.state.numA ||
      prevState.numB !== this.state.numB
    ) {
      console.log("Input values updated");
    }
  }

  componentWillUnmount() {
    console.log("CalculatorMethods component unmounting");
  }

  render() {
    return null;
  }
}

export default CalculatorMethods;
