export type LoanType =
  | "Personal Loan"
  | "Home Loan"
  | "Business Loan"
  | "Education Loan"
  | "Loan Against Property"
  | "Loan Against Credit Card";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  description: string;
  rating: number; // 1 to 5
  userImg: string;
  loanType: LoanType;
  dateOfReview: string; // ISO format (yyyy-mm-dd)
}
