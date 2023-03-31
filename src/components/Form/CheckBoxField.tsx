import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type CheckBoxFieldProps = FieldWrapperPassThroughProps & {
  defaultCheck?: boolean;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const CheckBoxField = (props: CheckBoxFieldProps) => {
  const {
    defaultCheck = false,
    label,
    className,
    registration,
    error,
    disabled = false,
    checked = false,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="checkbox"
        className={clsx('toggle', className)}
        defaultChecked={defaultCheck}
        disabled={disabled}
        checked={checked}
        {...registration}
      />
    </FieldWrapper>
  );
};
