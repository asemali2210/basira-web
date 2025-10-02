"use client";

import { useEffect, useMemo, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button/Button";
import styles from "./sign-up.module.scss";

const FIELD_ORDER = [
  "email",
  "password",
  "confirmPassword",
  "fullName",
  "preferredLanguage",
  "terms",
];

function FocusFirstError({ errors, submitCount, formRef }) {
  useEffect(() => {
    if (!submitCount) return;

    const firstFieldWithError = FIELD_ORDER.find((field) => errors[field]);

    if (!firstFieldWithError) return;

    const field = formRef.current?.querySelector(
      `[name="${firstFieldWithError}"]`
    );

    field?.focus();
  }, [errors, submitCount, formRef]);

  return null;
}

export default function SignUpPage() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const formRef = useRef(null);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(tAuth("errors.emailInvalid"))
          .required(tAuth("errors.emailRequired")),
        password: Yup.string()
          .min(10, tAuth("errors.passwordMin"))
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            tAuth("errors.passwordPattern")
          )
          .required(tAuth("errors.passwordRequired")),
        confirmPassword: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            tAuth("errors.confirmPasswordMatch")
          )
          .required(tAuth("errors.confirmPasswordRequired")),
        fullName: Yup.string().required(tAuth("errors.fullNameRequired")),
        preferredLanguage: Yup.string().required(
          tAuth("errors.languageRequired")
        ),
        terms: Yup.boolean().oneOf([true], tAuth("errors.termsRequired")),
      }),
    [tAuth]
  );

  const termsLabel = tAuth.rich("termsLabelRich", {
    linkTerms: (chunks) => (
      <a
        href="#terms"
        onClick={(event) => event.preventDefault()}
        className={styles.termsLink}
      >
        {chunks}
      </a>
    ),
    linkPrivacy: (chunks) => (
      <a
        href="#privacy"
        onClick={(event) => event.preventDefault()}
        className={styles.termsLink}
      >
        {chunks}
      </a>
    ),
  });

  return (
    <div className={styles.wrapper}>
      <div className="container-fluid">
        <div className="row g-0 align-items-stretch">
          <div className="col-12 col-lg-6 d-flex align-items-center">
            <div className={styles.card}>
              <div className={styles.topBar}>
                <Button href="/auth/sign-up?role=teacher" variant="link">
                  {tAuth("registerAsTeacher")}
                </Button>
                <span className={styles.logo}>
                  <Image
                    src="/assest/logo.png"
                    priority
                    width={100}
                    height={100}
                    alt="basira"
                  />
                </span>
              </div>

              <h1 className={styles.heroTitle}>{tAuth("signUpTitle")}</h1>
              <p className={styles.heroSubtitle}>{tAuth("signUpSubtitle")}</p>

              <Button type="button" variant="ghost" fullWidth>
                <FcGoogle size={20} />
                {tAuth("signUpWithGoogle")}
              </Button>

              <div className={styles.divider}>
                <span>{tAuth("orSignUpWithEmail")}</span>
              </div>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  confirmPassword: "",
                  fullName: "",
                  preferredLanguage: locale,
                  terms: false,
                }}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={async (values, helpers) => {
                  helpers.setStatus(undefined);

                  try {
                    await new Promise((resolve) => setTimeout(resolve, 1500));

                    helpers.setStatus({ success: true });
                  } catch (error) {
                    helpers.setStatus({ errorKey: "generic_error" });
                  } finally {
                    helpers.setSubmitting(false);
                  }
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  status,
                  submitCount,
                }) => (
                  <form ref={formRef} noValidate onSubmit={handleSubmit}>
                    <FocusFirstError
                      errors={errors}
                      submitCount={submitCount}
                      formRef={formRef}
                    />

                    {status?.errorKey && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className={`alert alert-danger ${styles.formGroup}`}
                      >
                        {tAuth(status.errorKey)}
                      </div>
                    )}

                    {status?.success && (
                      <div
                        role="status"
                        aria-live="polite"
                        className={`alert alert-success ${styles.formGroup}`}
                      >
                        {tAuth("accountCreated")}
                      </div>
                    )}

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">
                        {tAuth("email")}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`${styles.input} ${
                          touched.email && errors.email ? styles.inputError : ""
                        }`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.email && errors.email)}
                        aria-describedby={
                          touched.email && errors.email
                            ? "sign-up-email-error"
                            : undefined
                        }
                        autoComplete="email"
                        disabled={isSubmitting}
                      />
                      {touched.email && errors.email ? (
                        <div
                          id="sign-up-email-error"
                          className={styles.errorText}
                        >
                          {errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="password">
                        {tAuth("password")}
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className={`${styles.input} ${
                          touched.password && errors.password
                            ? styles.inputError
                            : ""
                        }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(
                          touched.password && errors.password
                        )}
                        aria-describedby={
                          touched.password && errors.password
                            ? "sign-up-password-error"
                            : "sign-up-password-hint"
                        }
                        autoComplete="new-password"
                        disabled={isSubmitting}
                      />
                      <div
                        id="sign-up-password-hint"
                        className={styles.passwordHint}
                      >
                        {tAuth("passwordHint")}
                      </div>
                      {touched.password && errors.password ? (
                        <div
                          id="sign-up-password-error"
                          className={styles.errorText}
                        >
                          {errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="confirmPassword">
                        {tAuth("confirmPassword")}
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={`${styles.input} ${
                          touched.confirmPassword && errors.confirmPassword
                            ? styles.inputError
                            : ""
                        }`}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        aria-describedby={
                          touched.confirmPassword && errors.confirmPassword
                            ? "sign-up-confirm-password-error"
                            : undefined
                        }
                        autoComplete="new-password"
                        disabled={isSubmitting}
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <div
                          id="sign-up-confirm-password-error"
                          className={styles.errorText}
                        >
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="fullName">
                        {tAuth("fullName")}
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className={`${styles.input} ${
                          touched.fullName && errors.fullName
                            ? styles.inputError
                            : ""
                        }`}
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(
                          touched.fullName && errors.fullName
                        )}
                        aria-describedby={
                          touched.fullName && errors.fullName
                            ? "sign-up-fullName-error"
                            : undefined
                        }
                        autoComplete="name"
                        disabled={isSubmitting}
                      />
                      {touched.fullName && errors.fullName ? (
                        <div
                          id="sign-up-fullName-error"
                          className={styles.errorText}
                        >
                          {errors.fullName}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        className={styles.label}
                        htmlFor="preferredLanguage"
                      >
                        {tAuth("preferredLanguage")}
                      </label>
                      <select
                        id="preferredLanguage"
                        name="preferredLanguage"
                        className={`${styles.select} ${
                          touched.preferredLanguage && errors.preferredLanguage
                            ? styles.selectError
                            : ""
                        }`}
                        value={values.preferredLanguage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(
                          touched.preferredLanguage && errors.preferredLanguage
                        )}
                        aria-describedby={
                          touched.preferredLanguage && errors.preferredLanguage
                            ? "sign-up-language-error"
                            : undefined
                        }
                        disabled={isSubmitting}
                      >
                        <option value="en">{tAuth("language.english")}</option>
                        <option value="ar">{tAuth("language.arabic")}</option>
                      </select>
                      {touched.preferredLanguage && errors.preferredLanguage ? (
                        <div
                          id="sign-up-language-error"
                          className={styles.errorText}
                        >
                          {errors.preferredLanguage}
                        </div>
                      ) : null}
                    </div>

                    <div className={styles.terms}>
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={values.terms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.terms && errors.terms)}
                        aria-describedby={
                          touched.terms && errors.terms
                            ? "sign-up-terms-error"
                            : undefined
                        }
                        disabled={isSubmitting}
                      />
                      <label htmlFor="terms">{termsLabel}</label>
                    </div>
                    {touched.terms && errors.terms ? (
                      <div
                        id="sign-up-terms-error"
                        className={styles.errorText}
                      >
                        {errors.terms}
                      </div>
                    ) : null}

                    <div className={styles.actions}>
                      <Button type="submit" disabled={isSubmitting} fullWidth>
                        {isSubmitting
                          ? tCommon("loading")
                          : tAuth("createAccount")}
                      </Button>
                      <p className={styles.note}>
                        {tAuth("alreadyHaveAccount")}{" "}
                        <Link href="/auth/sign-in">
                          {tAuth("signInInstead")}
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>

          <div
            className={`col-12 col-lg-6 position-relative ${styles.sidePanel}`}
          >
            <span className={styles.sidePanelOverlay} aria-hidden="true" />
            <Image
              src="/assest/vectors-bg-sign.svg"
              alt="Decorative learning illustration"
              fill
              className={styles.sidePanelImage}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
