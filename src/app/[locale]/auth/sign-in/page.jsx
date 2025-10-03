"use client";

import { useEffect, useMemo, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button/Button";
import styles from "./sign-in.module.scss";

const FIELD_ORDER = ["email", "password"];

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

export default function SignInPage() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const formRef = useRef(null);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(tAuth("errors.emailInvalid"))
          .required(tAuth("errors.emailRequired")),
        password: Yup.string().required(tAuth("errors.passwordRequired")),
      }),
    [tAuth]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>{tAuth("heading")}</h1>
          <p className={styles.headerSubtitle}>{tAuth("signInDescription")}</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, helpers) => {
            helpers.setStatus(undefined);

            try {
              await new Promise((resolve) => setTimeout(resolve, 1200));

              const response = await fetch(
                "http://localhost:1337/api/auth/local",
                {
                  // Replace with your Strapi URL
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    identifier: values.email,
                    password: values.password,
                  }),
                }
              );

              if (!response.ok) {
                throw new Error("invalid_credentials");
              }
              const data = await response.json();
              console.log(data.jwt);
              helpers.setStatus({ success: true });

              return data.jwt;
            } catch (error) {
              const errorKey =
                error instanceof Error &&
                error.message === "invalid_credentials"
                  ? "invalid_credentials"
                  : "generic_error";
              helpers.setStatus({ errorKey });
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
                <Alert
                  role="alert"
                  aria-live="polite"
                  type="error"
                  showIcon
                  message={tAuth(status.errorKey)}
                  className={styles.alert}
                />
              )}

              {status?.success && (
                <Alert
                  role="status"
                  aria-live="polite"
                  type="success"
                  showIcon
                  message={tAuth("success")}
                  className={styles.alert}
                />
              )}

              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="email">
                    {tAuth("email")}
                  </label>
                </div>
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
                    touched.email && errors.email ? "email-error" : undefined
                  }
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {touched.email && errors.email ? (
                  <div id="email-error" className={styles.errorText}>
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="password">
                    {tAuth("password")}
                  </label>
                  <a
                    href="#"
                    className={styles.forgotLink}
                    onClick={(event) => event.preventDefault()}
                  >
                    {tAuth("forgotPassword")}
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`${styles.input} ${
                    touched.password && errors.password ? styles.inputError : ""
                  }`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.password && errors.password)}
                  aria-describedby={
                    touched.password && errors.password
                      ? "password-error"
                      : undefined
                  }
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                {touched.password && errors.password ? (
                  <div id="password-error" className={styles.errorText}>
                    {errors.password}
                  </div>
                ) : null}
              </div>

              <div className={styles.checkboxRow}>
                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {tAuth("rememberMe")}
                </label>
              </div>

              <div className={styles.actions}>
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? tCommon("loading") : tAuth("signIn")}
                </Button>
                <p className={styles.secondaryAction}>
                  {tAuth("alreadyHaveAccount")}{" "}
                  <Link href="/auth/sign-up">{tAuth("signUp")}</Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
