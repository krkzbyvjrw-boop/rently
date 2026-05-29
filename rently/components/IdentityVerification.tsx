'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/app/LocaleProvider'
import {
  getVerification,
  saveVerification,
  type VerificationState,
} from '@/lib/verification'

export function IdentityVerification() {
  const { t } = useLocale()
  const [verification, setVerification] = useState<VerificationState>({
    status: 'none',
    idUploaded: false,
    selfieUploaded: false,
  })

  useEffect(() => {
    setVerification(getVerification())
  }, [])

  const update = (next: VerificationState) => {
    setVerification(next)
    saveVerification(next)
  }

  const uploadId = () => update({ ...verification, idUploaded: true })
  const uploadSelfie = () => update({ ...verification, selfieUploaded: true })

  const submit = () => {
    if (!verification.idUploaded || !verification.selfieUploaded) {
      alert(t('account.verificationRequired'))
      return
    }
    update({
      ...verification,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    })
    alert(t('account.verificationSubmitted'))
  }

  const statusLabel =
    verification.status === 'verified'
      ? t('account.verificationVerified')
      : verification.status === 'pending'
        ? t('account.verificationPending')
        : t('account.verificationNone')

  const statusColor =
    verification.status === 'verified'
      ? '#22c55e'
      : verification.status === 'pending'
        ? '#eab308'
        : 'var(--fg-muted)'

  return (
    <div className="app-card rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl" aria-hidden>🪪</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-fg">{t('account.verificationTitle')}</p>
          <p className="text-xs text-muted mt-0.5">{t('account.verificationHint')}</p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
          style={{
            color: statusColor,
            border: `1px solid ${statusColor}`,
            background: verification.status === 'verified' ? 'rgba(34,197,94,0.1)' : 'transparent',
          }}
        >
          {statusLabel}
        </span>
      </div>

      {verification.status === 'verified' && (
        <p className="text-xs text-muted mb-0">{t('account.verificationVerifiedDetail')}</p>
      )}

      {verification.status === 'pending' && (
        <p className="text-xs text-muted mb-0">{t('account.verificationPendingDetail')}</p>
      )}

      {verification.status === 'none' && (
        <>
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            <button
              type="button"
              onClick={uploadId}
              disabled={verification.idUploaded}
              className="text-sm px-4 py-2 rounded-lg disabled:opacity-60"
              style={{
                border: '1px solid var(--border)',
                color: verification.idUploaded ? 'var(--fg)' : 'var(--fg-muted)',
                background: verification.idUploaded ? 'var(--bg-secondary)' : 'transparent',
              }}
            >
              {verification.idUploaded ? t('account.idUploaded') : t('account.uploadId')}
            </button>
            <button
              type="button"
              onClick={uploadSelfie}
              disabled={verification.selfieUploaded}
              className="text-sm px-4 py-2 rounded-lg disabled:opacity-60"
              style={{
                border: '1px solid var(--border)',
                color: verification.selfieUploaded ? 'var(--fg)' : 'var(--fg-muted)',
                background: verification.selfieUploaded ? 'var(--bg-secondary)' : 'transparent',
              }}
            >
              {verification.selfieUploaded ? t('account.selfieUploaded') : t('account.uploadSelfie')}
            </button>
          </div>
          <button
            type="button"
            onClick={submit}
            className="w-full py-2.5 text-sm font-medium rounded-lg"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            {t('account.submitVerification')}
          </button>
        </>
      )}
    </div>
  )
}
