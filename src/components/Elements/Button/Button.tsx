import clsx from 'clsx';
import * as React from 'react';

const variants = {
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
};

const sizes = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  btnOutline?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'info',
      size = 'md',
      isLoading = false,
      btnOutline = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'btn',
          variants[variant],
          sizes[size],
          className,
          isLoading && 'loading',
          btnOutline && 'btn-outline',
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);

Button.displayName = 'Button';
