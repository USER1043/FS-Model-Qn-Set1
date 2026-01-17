import { useState } from "react";
import "./App.css";

function App() {
  // State for input values
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");

  // State for results
  const [arithmeticResult, setArithmeticResult] = useState(null);
  const [sumSquareResult, setSumSquareResult] = useState(null);
  const [evenOddResult, setEvenOddResult] = useState(null);

  // State for error messages
  const [error, setError] = useState("");

  // 1) Addition routine
  function add(a, b) {
    return a + b;
  }

  // 2) Subtraction routine
  function subtract(a, b) {
    return a - b;
  }

  // 3) Multiplication routine
  function multiply(a, b) {
    return a * b;
  }

  // 4) Division routine
  function divide(a, b) {
    return a / b;
  }

  // Helper functions to validate input
  const validateInputs = () => {
    if (numA === "" || numB === "") {
      setError("Please enter both numbers");
      return false;
    }
    const a = parseFloat(numA);
    const b = parseFloat(numB);
    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers");
      return false;
    }
    return { a, b };
  };

  const validateSingleInput = (numA) => {
    if (numA === "") {
      this.setState({ error: "Please enter a number" });
      return false;
    }

    const num = parseFloat(numA);
    if (isNaN(num)) {
      this.setState({ error: "Please enter a valid number" });
      return false;
    }

    return num;
  };

  // Clear all results and errors
  const clearAll = () => {
    setNumA("");
    setNumB("");
    setArithmeticResult(null);
    setSumSquareResult(null);
    setEvenOddResult(null);
    setError("");
  };

  // a)Expression evaluation routine:
  // Result = (a+b)/(a-b) * (a+b)

  const calculateArithmetic = () => {
    setError("");
    const validation = validateInputs();
    if (!validation) return;

    const { a, b } = validation;

    if (a - b === 0) {
      setError("Division by zero error: a - b cannot be zero");
      setArithmeticResult(null);
      return;
    }

    const sum = add(a, b); // (a + b)
    const diff = subtract(a, b); // (a - b)

    const fraction = divide(sum, diff); // (a+b)/(a-b)
    const result = multiply(fraction, sum); // ((a+b)/(a-b))*(a+b)

    setArithmeticResult(result);
    setSumSquareResult(null);
    setEvenOddResult(null);
  };

  // b) MoD_Sum_square: Sum of squares of digits
  const calculateSumOfSquares = () => {
    setError("");
    const validation = validateSingleInput();
    if (!validation) return;

    const a = parseFloat(numA);
    if (isNaN(a)) {
      setError("Please enter a valid number");
      return;
    }

    const numStr = Math.abs(Math.round(a)).toString();
    let sum = 0;

    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i]);
      sum += digit * digit;
    }

    setSumSquareResult(sum);
    setArithmeticResult(null);
    setEvenOddResult(null);
  };

  // c) Even_ODD: Check if number is even or odd
  const checkEvenOdd = () => {
    setError("");
    const validation = validateSingleInput();
    if (!validation) return;

    const a = parseFloat(numA);
    if (isNaN(a)) {
      setError("Please enter a valid number");
      return;
    }

    if (!Number.isInteger(a)) {
      setEvenOddResult("Please enter an integer for even/odd check");
      return;
    }

    const isEven = a % 2 === 0;
    setEvenOddResult(isEven ? "Even" : "Odd");
    setArithmeticResult(null);
    setSumSquareResult(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🧮 Basic Calculator</h1>
        <p>Perform various operations on numbers</p>
      </header>

      <main className="main-content">
        <section className="input-section">
          <h2>Enter Numbers</h2>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="numA">Number A:</label>
              <input
                type="number"
                id="numA"
                value={numA}
                onChange={(e) => setNumA(e.target.value)}
                placeholder="Enter first number"
              />
            </div>
            <div className="input-field">
              <label htmlFor="numB">Number B:</label>
              <input
                type="number"
                id="numB"
                value={numB}
                onChange={(e) => setNumB(e.target.value)}
                placeholder="Enter second number"
              />
            </div>
          </div>
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        </section>

        <section className="operations-section">
          <h2>Operations</h2>

          <div className="button-group">
            <button
              className="operation-btn arithmetic"
              onClick={calculateArithmetic}
            >
              Calculate Result
              <span className="formula">(a+b)/(a-b)*(a+b)</span>
            </button>

            <button
              className="operation-btn sum-square"
              onClick={calculateSumOfSquares}
            >
              MoD_Sum_square
              <span className="formula">Sum of squares of digits</span>
            </button>

            <button className="operation-btn even-odd" onClick={checkEvenOdd}>
              Even_ODD
              <span className="formula">Check if number is even or odd</span>
            </button>
          </div>
        </section>

        {error && (
          <section className="error-section">
            <div className="error-message">⚠️ {error}</div>
          </section>
        )}

        <section className="results-section">
          <h2>Results</h2>

          {arithmeticResult !== null && (
            <div className="result-card arithmetic-result">
              <h3>Arithmetic Operation</h3>
              <p className="formula-display">Result = (a+b)/(a-b)*(a+b)</p>
              <p className="result-value">= {arithmeticResult.toFixed(4)}</p>
            </div>
          )}

          {sumSquareResult !== null && (
            <div className="result-card sum-square-result">
              <h3>MoD_Sum_square</h3>
              <p className="formula-display">
                Sum of squares of digits of {numA}
              </p>
              <p className="result-value">= {sumSquareResult}</p>
            </div>
          )}

          {evenOddResult !== null && (
            <div className="result-card even-odd-result">
              <h3>Even_ODD Check</h3>
              <p className="formula-display">Number: {numA}</p>
              <p className="result-value">Result: {evenOddResult}</p>
            </div>
          )}

          {arithmeticResult === null &&
            sumSquareResult === null &&
            evenOddResult === null &&
            !error && (
              <p className="no-results">
                Click any operation button to see results here
              </p>
            )}
        </section>
      </main>
    </div>
  );
}

export default App;
