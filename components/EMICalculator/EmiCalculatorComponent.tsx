"use client";

import { useState, useMemo } from "react";
import styles from "./EmiCalculatorComponent.module.css";

type LoanType =
  | "Personal Loan"
  | "Home Loan"
  | "Education Loan"
  | "Business Loan"
  | "Loan Against Property";

const loanConfig: Record<
  LoanType,
  {
    minAmount: number;
    maxAmount: number;
    minRate: number;
    maxRate: number;
    minTenure: number;
    maxTenure: number;
    defaultRate: number;
  }
> = {
  "Personal Loan": {
    minAmount: 50000,
    maxAmount: 2500000,
    minRate: 10,
    maxRate: 24,
    minTenure: 6,
    maxTenure: 60,
    defaultRate: 14,
  },
  "Home Loan": {
    minAmount: 500000,
    maxAmount: 50000000,
    minRate: 6,
    maxRate: 12,
    minTenure: 60,
    maxTenure: 360,
    defaultRate: 8.5,
  },
  "Education Loan": {
    minAmount: 100000,
    maxAmount: 5000000,
    minRate: 7,
    maxRate: 15,
    minTenure: 12,
    maxTenure: 180,
    defaultRate: 9,
  },
  "Business Loan": {
    minAmount: 100000,
    maxAmount: 10000000,
    minRate: 11,
    maxRate: 22,
    minTenure: 6,
    maxTenure: 120,
    defaultRate: 16,
  },
  "Loan Against Property": {
    minAmount: 500000,
    maxAmount: 20000000,
    minRate: 8,
    maxRate: 14,
    minTenure: 12,
    maxTenure: 240,
    defaultRate: 10,
  },
};

export default function EmiCalculatorComponent() {
  const [loanType, setLoanType] = useState<LoanType>("Personal Loan");

  const config = loanConfig[loanType];

  const [amount, setAmount] = useState(config.minAmount);
  const [rate, setRate] = useState(config.defaultRate);
  const [tenure, setTenure] = useState(config.minTenure);

  // Reset values when loan type changes
  const handleLoanChange = (type: LoanType) => {
    setLoanType(type);
    const newConfig = loanConfig[type];
    setAmount(newConfig.minAmount);
    setRate(newConfig.defaultRate);
    setTenure(newConfig.minTenure);
  };

  // EMI Calculation
  const { emi, totalAmount, totalInterest } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure;

    const emiCalc =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayable = emiCalc * months;
    const interest = totalPayable - amount;

    return {
      emi: Math.round(emiCalc),
      totalAmount: Math.round(totalPayable),
      totalInterest: Math.round(interest),
    };
  }, [amount, rate, tenure]);

  const principalPercent = (amount / totalAmount) * 100;
  const interestPercent = (totalInterest / totalAmount) * 100;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.card}>
          <h2>Enter Loan Details</h2>

          {/* Loan Type Dropdown */}
          <div className={styles.field}>
            <label>Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => handleLoanChange(e.target.value as LoanType)}
              className={styles.select}
            >
              {Object.keys(loanConfig).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Loan Amount */}
          <div className={styles.field}>
            <label>Loan Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
              type="range"
              min={config.minAmount}
              max={config.maxAmount}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Interest Rate */}
          <div className={styles.field}>
            <label>Interest Rate (p.a.)</label>
            <input
              type="number"
              value={rate}
              step="0.1"
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <input
              type="range"
              min={config.minRate}
              max={config.maxRate}
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>

          {/* Tenure */}
          <div className={styles.field}>
            <label>Loan Tenure (Months)</label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
            <input
              type="range"
              min={config.minTenure}
              max={config.maxTenure}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.card}>
          <h2>{loanType} EMI Breakdown</h2>

          <div className={styles.emiBox}>
            <span>Monthly EMI</span>
            <h1>₹{emi.toLocaleString()}</h1>
          </div>

          <div className={styles.row}>
            <span>Principal Amount</span>
            <strong>₹{amount.toLocaleString()}</strong>
          </div>

          <div className={styles.row}>
            <span>Total Interest</span>
            <strong className={styles.goldText}>
              ₹{totalInterest.toLocaleString()}
            </strong>
          </div>

          <div className={styles.totalBox}>
            <span>Total Amount Payable</span>
            <strong>₹{totalAmount.toLocaleString()}</strong>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.principal}
              style={{ width: `${principalPercent}%` }}
            />
            <div
              className={styles.interest}
              style={{ width: `${interestPercent}%` }}
            />
          </div>

          <div className={styles.legend}>
            <span>
              <i className={styles.principalDot}></i>
              Principal
            </span>
            <span>
              <i className={styles.interestDot}></i>
              Interest
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
