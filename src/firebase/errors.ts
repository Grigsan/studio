'use client';

// Defines the shape of the context for a Firestore security rule violation.
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any; // The data being written/updated
};

/**
 * A custom error class for Firestore permission errors.
 * It captures rich context about the failed request, which is invaluable for debugging security rules.
 */
export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  constructor(context: SecurityRuleContext) {
    const message = `Firestore: Insufficient permissions. The following request was denied by Firestore Security Rules:\n${JSON.stringify(
      context,
      null,
      2
    )}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
  }
}
