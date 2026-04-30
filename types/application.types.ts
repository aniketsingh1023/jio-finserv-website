export interface ApplicationFormData {
  personalInfo: {
    name: string;
    mobile: string;
    email: string;
    gender: string;
    dob: string;
    address: string;
    city: string;
    profilePic: string;
    pincode: string;
  };

  loanDetails: {
    loanType: string;
    loanAmount: number;
    companyName: string;
    monthlyIncome: number;
    existingEmi: number;
    bankStatement: File | null;
    bankStatementPath?: string;
    statementPassword?: string;
    primaryBank: string;
    cibilScore: number;
  };

  kycDetails: {
    aadharNo: string;
    aadharFront: File | null;
    aadharFrontPath?: string;
    aadharBack: File | null;
    aadharBackPath?: string;
    panNo: string;
    panFile: File | null;
    panFilePath?: string;
    nomineeName: string;
    nomineeRelation: string;
  };

  payment: {
    ecsMethod: string;
    cardType: "debit" | "credit";
    cardNo: string;
    expiry: string;
    cvv: string;
  };
}
