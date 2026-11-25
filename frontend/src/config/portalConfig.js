/**
 * Frontend Portal Configuration
 * Holds display labels, validation limits, and static template asset paths.
 */
export const PORTAL_CONFIG = {
  labTitle: 'Urban Interaction Lab',
  facultySubtitle:
    'Faculty of Design, Informatics & Urban Environments — Project Participant Grant Application',
  grantCycle: 'Spring 2025',
  deadlineType: 'Rolling Review',
  maxDescriptionWords: 150,
  maxPdfSizeBytes: 10 * 1024 * 1024,

  // Static declaration template placed in public/Non-Funding-Declaration.pdf
  declarationTemplateUrl: '/Non-Funding-Declaration.pdf',
  declarationTemplateFileName: 'Non-Funding-Declaration.pdf',

  // Spring Boot endpoint that stores the application (proxied by Vite in dev mode)
  submitUrl: '/api/submit',
};
