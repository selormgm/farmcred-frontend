import { useState, useEffect, useCallback } from "react";
import { farmerLoanService } from "@/lib/api/farmerloan";
import { LoanQualificationResponse, LoanRequestPayload, LoanRequestResponse, RepaymentConfirmationPayload, RepaymentConfirmationResponse } from "@/lib/types";

export function useFarmerLoan() {
  const [qualification, setQualification] = useState<LoanQualificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoanQualification = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmerLoanService.getLoanQualifications();
      setQualification(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoanQualification();
  }, [fetchLoanQualification]);

  return { qualification, loading, error, refetch: fetchLoanQualification };
}

//Hook for loan qualifications
export function useLoanQualifications() {
  const [qualifications, setQualifications] = useState<LoanQualificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQualifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await farmerLoanService.getLoanQualifications();
      setQualifications(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQualifications();
  }, [fetchQualifications]);

  return { qualifications, loading, error, refetch: fetchQualifications };
}

// Hook to request a loan
export function useRequestLoan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLoan = async (payload: LoanRequestPayload): Promise<LoanRequestResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await farmerLoanService.requestLoan(payload);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred");
      throw err; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  };

  return { requestLoan, loading, error };
}

// Hook to confirm loan repayment
export function useConfirmLoanRepayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmRepayment = async (payload: RepaymentConfirmationPayload): Promise<RepaymentConfirmationResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await farmerLoanService.confrimLoanRepayment(payload);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred");
      throw err; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  };

  return { confirmRepayment, loading, error };
}


