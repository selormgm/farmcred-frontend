import { request } from "http";
import apiClient from "../axios";
import { LoanQualificationResponse, LoanRequestPayload, LoanRequestResponse, RepaymentConfirmationPayload, RepaymentConfirmationResponse } from "../types";


export const farmerLoanService = {
  // Get Loan Qualifications
  async getLoanQualifications(): Promise<LoanQualificationResponse> {   
    const response = await apiClient.get('/api/ussd-web/farmer/request-loan/');
    return response.data;
  },

  //Request Loan
  async requestLoan(payload: LoanRequestPayload): Promise<LoanRequestResponse> {
    const response = await apiClient.post('/api/ussd-web/farmer/request-loan/', payload);
    return response.data;
  },

  //Confirm Loan
  async confrimLoanRepayment(payload: RepaymentConfirmationPayload): Promise<RepaymentConfirmationResponse> {
    const response = await apiClient.post('/api/ussd-web/farmer/confirm-loan-repayment/', payload);
    return response.data;
  },
  
};