# Project Instructions

## Email + Auth Integration

- Better Auth email callbacks (`sendResetPassword`, `sendVerificationEmail`) use `sendEmail` from `lib/email.ts`
- Email callbacks use fire-and-forget (`void sendEmail(...)`) to prevent timing attacks
- `emailVerification.sendOnSignUp` is enabled — new users receive a verification email automatically
- Password reset and verification templates are in `emails/password-reset.tsx` and `emails/verification.tsx`
- To customize auth emails, edit the templates in `emails/` — do not modify the callbacks in `lib/auth.ts` unless changing the send logic
