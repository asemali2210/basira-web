import Link from "next/link";
import styles from "./button.module.scss";

function Button({
  children,
  text,
  href,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  const content = children ?? text;
  const classes = [
    styles.button,
    variant !== "primary" ? styles[`button--${variant}`] : null,
    fullWidth ? styles["button--block"] : null,
    disabled ? styles["button--disabled"] : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        className={`${classes} ${styles["button--disabled"]}`}
        {...rest}
      >
        {content}
      </span>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

export default Button;
