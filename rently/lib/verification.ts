export const VERIFICATION_KEY = 'renly_verification'

export type VerificationStatus = 'none' | 'pending' | 'verified'

export type VerificationState = {
  status: VerificationStatus
  idUploaded: boolean
  selfieUploaded: boolean
  submittedAt?: string
}

export function getVerification(): VerificationState {
  if (typeof window === 'undefined') {
    return { status: 'none', idUploaded: false, selfieUploaded: false }
  }
  try {
    const raw = localStorage.getItem(VERIFICATION_KEY)
    if (!raw) return { status: 'none', idUploaded: false, selfieUploaded: false }
    return JSON.parse(raw) as VerificationState
  } catch {
    return { status: 'none', idUploaded: false, selfieUploaded: false }
  }
}

export function saveVerification(state: VerificationState) {
  localStorage.setItem(VERIFICATION_KEY, JSON.stringify(state))
}
