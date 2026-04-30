"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ApplicationFormData } from "@/types/application.types";

interface FormContextType {
  formData: ApplicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApplicationFormData>>;

  applicationId: string | null;
  setApplicationId: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormContext = createContext<FormContextType | null>(null);

export const ApplicationFormProvider = ({
  children,
  initialApplicationId,
}: {
  children: React.ReactNode;
  initialApplicationId?: string | null;
}) => {
  const [applicationId, setApplicationId] = useState<string | null>(
    initialApplicationId ?? null,
  );

  const [formData, setFormData] = useState<ApplicationFormData>({
    personalInfo: {
      name: "",
      mobile: "",
      email: "",
      gender: "",
      dob: "",
      address: "",
      city: "",
      profilePic: "",
      pincode: "",
    },

    loanDetails: {
      loanType: "",
      loanAmount: 0,
      companyName: "",
      monthlyIncome: 0,
      existingEmi: 0,
      bankStatement: null,
      primaryBank: "",
      cibilScore: 0,
      statementPassword: "",
    },

    kycDetails: {
      aadharNo: "",
      aadharFront: null,
      aadharBack: null,
      panNo: "",
      panFile: null,
      nomineeName: "",
      nomineeRelation: "",
    },

    payment: {
      ecsMethod: "",
      cardType: "debit",
      cardNo: "",
      expiry: "",
      cvv: "",
    },
  });

  useEffect(() => {
    if (!initialApplicationId) return;

    async function loadApplication() {
      try {
        const res = await fetch(
          `/api/get-application?appId=${initialApplicationId}`,
        );

        const result = await res.json();

        if (!res.ok) return;

        const app = result.application;

        setFormData({
          personalInfo: app.personalInfo,
          loanDetails: app.loanDetails,
          kycDetails: app.kycDetails,
          payment: app.payment,
        });
      } catch (err) {
        console.error("Failed to load application", err);
      }
    }

    loadApplication();
  }, [initialApplicationId]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        applicationId,
        setApplicationId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useApplicationForm = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useApplicationForm must be used inside provider");
  }

  return context;
};
