"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.css";
import AuthBackground from "@/components/Authentications/AuthBackground";

import Step1SignUp from "./Step1SignUp";
import Step2LoanDetails from "./Step2LoanDetails";
import Step3KYCDetails from "./Step3KYCDetails";
import Step4Review from "./Step4Review";
import Step5Payment from "./Step5Payment";

import { ApplicationFormProvider } from "./ApplicationFormProvider";

interface Props {
  appId?: string | null;
}
export default function ApplicationForm({ appId }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  // const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(
    appId ?? null,
  );
  const progressPercentage = (currentStep / 5) * 100;

  const nextStep = () => setCurrentStep((s) => s + 1);
  const prevStep = () => setCurrentStep((s) => s - 1);
  return (
    <ApplicationFormProvider initialApplicationId={appId}>
      <AuthBackground>
        <div className={styles.container}>
          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className={styles.progressText}>
            Step {currentStep} of 5 ({progressPercentage}% Complete)
          </div>

          {currentStep === 1 && <Step1SignUp nextStep={nextStep} />}

          {currentStep === 2 && (
            <Step2LoanDetails nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 3 && (
            <Step3KYCDetails nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 4 && (
            <Step4Review nextStep={nextStep} prevStep={prevStep} />
          )}

          {currentStep === 5 && <Step5Payment prevStep={prevStep} />}
        </div>
      </AuthBackground>
    </ApplicationFormProvider>
  );
}
