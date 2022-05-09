import { FormState } from 'react-hook-form';

export const getFormStateError = (name: string, formState: FormState<any>) => {
  const { errors = {} } = formState;

  if (`${name}` in errors) {
    const helperText = errors[name]!.message;

    return { error: true, helperText };
  }

  return { error: false, helperText: '' };
};
