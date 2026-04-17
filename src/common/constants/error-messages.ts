export const ERROR_MESSAGES = {
  AUTH: {
    UNAUTHORIZED: 'Invalid credentials provided',
    ROLES_NOT_VALID: 'Roles must be Admin / Customer',
    ROLES_FORBIDDEN: 'Require one of these roles: ',
    MISSING_ROLE: 'User context is missing role information',
  },
  USER: {
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'User with this email already exists',
    VIEW_FORBIDDEN: "Cannot view others account",
  },
  ACCOUNT: {
    NOT_FOUND: 'Account Number not found : ',
    DELETE_FORBIDDEN: "Account can only be deleted by related user or admin",
  },
  TRANSACTION: {
    INSUFFICIENT_BALANCE: 'Your balance is not sufficient for this transaction',
    TRANSACTION_FORBIDDEN: 'Cannot do transaction with others account',
    HISTORY_FORBIDDEN: 'Only related user and admin can see this account transaction history',
  }
};
