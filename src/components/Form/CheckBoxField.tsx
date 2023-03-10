import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type CheckBoxFieldProps = FieldWrapperPassThroughProps & {
  defaultCheck?: boolean;
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const CheckBoxField = (props: CheckBoxFieldProps) => {
  const { defaultCheck = false, label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="checkbox"
        className={clsx('toggle', className)}
        defaultChecked={defaultCheck}
        {...registration}
      />
    </FieldWrapper>
  );
};
