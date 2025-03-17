export type Loan = {
  id: string;
  poolId: string;
  loanId: string;
  pool: string;
  borrowerLastName: string;
  borrowerFirstName: string;
  propertyStreetAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  originationDate: string;
  originalPrincipal: number;
  unpaidPrincipal: number;
  interestRate: number;
  principalInterestPayment: number;
  propertyValue: number;
};

export type Pool = { id: string; name: string };

export type LoanData = {
  pool: string;
  totalLoans: number;
  averageInterestRate: number;
  totalUnpaidPrincipal: number;
  totalPrincipalInterestPayment: number;
  totalPropertyValue: number;
  totalOriginalPrincipal: number;
};
