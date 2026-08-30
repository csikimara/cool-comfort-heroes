export type LegalHoldRecord = {
  legal_hold_until: string | null;
};

export const retentionEligibilityFilter = (now = new Date()): string =>
  `legal_hold_until.is.null,legal_hold_until.lt.${now.toISOString()}`;

export const isLegalHoldActive = (
  message: LegalHoldRecord,
  now = new Date(),
): boolean => !!message.legal_hold_until && new Date(message.legal_hold_until) > now;
