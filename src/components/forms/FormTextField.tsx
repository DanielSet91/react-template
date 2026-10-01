import { TextField, type TextFieldProps } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'defaultValue'
> & {
  name: Path<T>;
  control: Control<T>;
};

export default function FormTextField<T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => (
        <TextField
          {...props}
          {...field}
          inputRef={ref}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? props.helperText}
        />
      )}
    />
  );
}
