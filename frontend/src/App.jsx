import React, { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import PortalHeader from './components/PortalHeader';
import StudentSupervisorSection from './components/StudentSupervisorSection';
import StudyDetailsSection from './components/StudyDetailsSection';
import BudgetCalculationSection from './components/BudgetCalculationSection';
import BudgetJustificationSection from './components/BudgetJustificationSection';
import NonFundingDeclarationSection from './components/NonFundingDeclarationSection';
import RequestPendingView from './components/RequestPendingView';
import { PORTAL_CONFIG } from './config/portalConfig';

const INITIAL_FORM_STATE = {
  studentFullName: '',
  studentEmail: '',
  supervisorName: '',
  supervisorEmail: '',
  studyDescription: '',
  participantCount: 12,
  moneyPerParticipant: 15,
  extraCosts: 0,
  fundsExplanation: '',
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [signedPdfFile, setSignedPdfFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studyWordCount = useMemo(() => {
    const trimmed = formData.studyDescription.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [formData.studyDescription]);

  const totalRequestedFunds = useMemo(() => {
    const count = Number(formData.participantCount) || 0;
    const rate = Number(formData.moneyPerParticipant) || 0;
    const extra = Number(formData.extraCosts) || 0;
    return count * rate + extra;
  }, [
    formData.participantCount,
    formData.moneyPerParticipant,
    formData.extraCosts,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleFileSelect = (file) => {
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      setErrorMessage('Please upload a valid signed PDF document (.pdf).');
      return;
    }
    if (file.size > PORTAL_CONFIG.maxPdfSizeBytes) {
      setErrorMessage('Signed PDF exceeds the 10MB maximum file size.');
      return;
    }
    setSignedPdfFile(file);
    if (errorMessage) setErrorMessage(null);
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setSignedPdfFile(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (studyWordCount > PORTAL_CONFIG.maxDescriptionWords) {
      setErrorMessage(
        `Short Study Description cannot exceed ${PORTAL_CONFIG.maxDescriptionWords} words.`
      );
      return;
    }

    if (!signedPdfFile) {
      setErrorMessage(
        'Please upload the signed Non-Funding Declaration (PDF) in Step B before submitting.'
      );
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));
    body.append('declarationPdf', signedPdfFile);

    try {
      const response = await fetch(PORTAL_CONFIG.submitUrl, { method: 'POST', body });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(result.error || `Submission failed (HTTP ${response.status}).`);
        return;
      }

      setSubmittedApplication({
        ...formData,
        totalRequestedFunds: Number(result.totalRequestedFunds ?? totalRequestedFunds),
        declarationFileName: signedPdfFile.name,
        savedTo: result.savedTo,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMessage('Could not reach the server. Is the backend running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F3F5F6] text-slate-900">
      <PortalHeader />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-0 pb-12 flex-grow">
        {submittedApplication ? (
          <RequestPendingView
            submission={submittedApplication}
            onBackToForm={() => {
              handleResetForm();
              setSubmittedApplication(null);
            }}
          />
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg shadow-xs p-6 sm:p-8">
            {errorMessage && (
              <div className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded border border-red-300 bg-red-50 text-xs font-medium text-red-800">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <StudentSupervisorSection
                formData={formData}
                onChange={handleInputChange}
              />

              <StudyDetailsSection
                formData={formData}
                onChange={handleInputChange}
                wordCount={studyWordCount}
              />

              <BudgetCalculationSection
                formData={formData}
                onChange={handleInputChange}
                totalRequestedFunds={totalRequestedFunds}
              />

              <BudgetJustificationSection
                formData={formData}
                onChange={handleInputChange}
              />

              <NonFundingDeclarationSection
                uploadedFile={signedPdfFile}
                onFileSelect={handleFileSelect}
                onClearFile={() => setSignedPdfFile(null)}
              />

              <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-500">
                  All submissions are archived under Urban Interaction Lab IRB Protocol.
                </p>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-xs font-semibold transition-colors"
                  >
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#0D6E5B] hover:bg-[#095445] disabled:opacity-60 disabled:cursor-wait text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    {isSubmitting ? 'SUBMITTING…' : 'SUBMIT REQUEST'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-[11px] text-slate-400">
        Urban Interaction Lab • Computer Science &amp; HCI Group • Version 4.0.0 (2025)
      </footer>
    </div>
  );
}
