import { ReactNode, SyntheticEvent, useCallback, useState } from 'react'

import {
  InvalidCredentialsError,
  SecondAuthenticationFactorRequiredError,
} from '../lib/api'
import { clsx } from '../lib/clsx'
import { Override } from '../lib/util'
import { Button } from './button'
import { Fieldset } from './fieldset'
import { FormCard, FormCardProps } from './form-card'
import { AtSymbolIcon } from './icons/at-symbol-icon'
import { LockIcon } from './icons/lock-icon'
import { InfoCard } from './info-card'
import { InputCheckbox } from './input-checkbox'
import { InputOtp, OTP_CODE_EXAMPLE } from './input-otp'
import { InputText } from './input-text'

export type SignInFormOutput = {
  username: string
  password: string
  remember?: boolean
}

export type SignInFormProps = Override<
  FormCardProps,
  {
    onSubmit: (credentials: SignInFormOutput) => void | PromiseLike<void>
    submitLabel?: ReactNode
    submitAria?: string

    onCancel?: () => void
    cancelLabel?: ReactNode
    cancelAria?: string

    onForgotPassword?: (username?: string) => void
    forgotPasswordLabel?: ReactNode
    forgotPasswordAria?: string

    accountSection?: ReactNode
    sessionSection?: ReactNode
    secondFactorSection?: ReactNode

    usernameDefault?: string
    usernameReadonly?: boolean
    usernameLabel?: string
    usernamePlaceholder?: string
    usernameAria?: string
    usernamePattern?: string
    usernameFormat?: string

    passwordLabel?: string
    passwordPlaceholder?: string
    passwordWarning?: ReactNode
    passwordAria?: string
    passwordPattern?: string
    passwordFormat?: string

    secondFactorLabel?: string
    secondFactorPlaceholder?: string
    secondFactorAria?: string
    secondFactorPattern?: string
    secondFactorExample?: string
    secondFactorFormatMessage?: string
    secondFactorHint?: string

    rememberVisible?: boolean
    rememberDefault?: boolean
    rememberLabel?: string
    rememberAria?: string
  }
>

export function SignInForm({
  onSubmit,
  submitAria = 'Next',
  submitLabel = submitAria,

  onCancel = undefined,
  cancelAria = 'Cancel',
  cancelLabel = cancelAria,

  onForgotPassword = undefined,
  forgotPasswordAria = 'Forgot?',
  forgotPasswordLabel = forgotPasswordAria,

  accountSection = 'Account',
  sessionSection = 'Session',
  secondFactorSection = '2FA Confirmation',

  usernameDefault = '',
  usernameReadonly = false,
  usernameLabel = 'Username or email address',
  usernameAria = usernameLabel,
  usernamePlaceholder = usernameLabel,
  usernamePattern = undefined,
  usernameFormat = 'valid email address or username',

  passwordLabel = 'Password',
  passwordAria = passwordLabel,
  passwordPlaceholder = passwordLabel,
  passwordPattern = undefined,
  passwordFormat = 'non empty string',
  passwordWarning = (
    <>
      <p className="font-bold text-brand leading-8">Warning</p>
      <p>
        Please verify the domain name of the website before entering your
        password. Never enter your password on a domain you do not trust.
      </p>
    </>
  ),

  secondFactorLabel = 'Confirmation code',
  secondFactorAria = secondFactorLabel,
  secondFactorPlaceholder = secondFactorLabel,
  secondFactorExample = OTP_CODE_EXAMPLE,
  secondFactorFormatMessage = 'Make sure to match the format: $1',
  secondFactorHint = 'Check your $1 email for a login code and enter it here.',

  rememberVisible = true,
  rememberDefault = false,
  rememberLabel = 'Remember this account on this device',
  rememberAria = rememberLabel,

  ...props
}: SignInFormProps) {
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState<string | null>(null)
  const [secondFactor, setSecondFactor] = useState<null | {
    type: 'emailOtp'
    hint: string
  }>(null)

  const [otpMissingError, setOtpMissingError] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const resetState = useCallback(() => {
    setOtp(null)
    setSecondFactor(null)
    setErrorMessage(null)
  }, [])

  const passwordReadonly = secondFactor != null

  const doSubmit = useCallback(
    async (
      event: SyntheticEvent<
        HTMLFormElement & {
          username: HTMLInputElement
          password: HTMLInputElement
          remember?: HTMLInputElement
        },
        SubmitEvent
      >,
    ) => {
      event.preventDefault()

      const credentials: SignInFormOutput = {
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
        remember: event.currentTarget.remember?.checked,
      }

      if (secondFactor) {
        if (!otp) {
          setOtpMissingError(true)
          return
        }
        credentials[secondFactor.type] = otp
      }

      setLoading(true)
      setErrorMessage(null)
      try {
        await onSubmit(credentials)
      } catch (err) {
        if (err instanceof SecondAuthenticationFactorRequiredError) {
          setSecondFactor({
            type: err.type,
            hint: err.hint,
          })
        } else {
          setErrorMessage(parseErrorMessage(err))
        }
      } finally {
        setLoading(false)
      }
    },
    [secondFactor, otp, onSubmit],
  )

  return (
    <FormCard
      onSubmit={doSubmit}
      error={errorMessage}
      cancel={
        onCancel && (
          <Button aria-label={cancelAria} onClick={onCancel}>
            {cancelLabel}
          </Button>
        )
      }
      actions={
        <Button
          color="brand"
          type="submit"
          aria-label={submitAria}
          loading={loading}
        >
          {submitLabel}
        </Button>
      }
      {...props}
    >
      <Fieldset title={accountSection} disabled={loading}>
        <InputText
          icon={<AtSymbolIcon className="w-5" />}
          name="username"
          type="text"
          onChange={resetState}
          placeholder={usernamePlaceholder}
          aria-label={usernameAria}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          spellCheck="false"
          dir="auto"
          enterKeyHint="next"
          required
          defaultValue={usernameDefault}
          readOnly={usernameReadonly}
          disabled={usernameReadonly}
          pattern={usernamePattern}
          title={usernameFormat}
        />

        <InputText
          icon={<LockIcon className="w-5" />}
          name="password"
          type="password"
          onChange={resetState}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(setFocused, 100, false)}
          append={
            onForgotPassword && (
              <Button
                type="button"
                onClick={(event) => {
                  const { form } = event.target as Node & {
                    form: HTMLFormElement
                  }

                  onForgotPassword(form?.username.value)
                }}
                aria-label={forgotPasswordAria}
                className="text-sm"
              >
                {forgotPasswordLabel}
              </Button>
            )
          }
          placeholder={passwordPlaceholder}
          aria-label={passwordAria}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="current-password"
          dir="auto"
          enterKeyHint={secondFactor ? 'next' : 'done'}
          spellCheck="false"
          required
          readOnly={passwordReadonly}
          disabled={passwordReadonly}
          pattern={passwordPattern}
          title={passwordFormat}
        />

        {passwordWarning && (
          <div
            className={clsx(
              'transition-all delay-300 duration-300 overflow-hidden',
              focused ? 'max-h-80' : 'max-h-0 -z-10 !mt-0',
            )}
          >
            <InfoCard role="status">{passwordWarning}</InfoCard>
          </div>
        )}
      </Fieldset>

      {rememberVisible && (
        <Fieldset key="remember" title={sessionSection} disabled={loading}>
          <InputCheckbox
            name="remember"
            defaultChecked={rememberDefault}
            aria-label={rememberAria}
            enterKeyHint={secondFactor ? 'next' : 'done'}
          >
            {rememberLabel}
          </InputCheckbox>
        </Fieldset>
      )}

      {secondFactor && (
        <Fieldset key="2fa" title={secondFactorSection} disabled={loading}>
          <div>
            <InputOtp
              aria-label={secondFactorAria}
              placeholder={secondFactorPlaceholder}
              enterKeyHint="done"
              required
              autoFocus={true}
              defaultValue={otp ?? ''}
              onOtp={(otp) => {
                setOtp(otp)
                if (otp) setOtpMissingError(false)
              }}
            />

            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {otpMissingError
                ? secondFactorFormatMessage.replaceAll(
                    '$1',
                    secondFactorExample,
                  )
                : secondFactorHint.replaceAll('$1', secondFactor.hint)}
            </p>
          </div>
        </Fieldset>
      )}
    </FormCard>
  )
}

function parseErrorMessage(err: unknown): string {
  if (err instanceof InvalidCredentialsError) {
    return 'Invalid username or password'
  }

  return 'An unknown error occurred'
}
