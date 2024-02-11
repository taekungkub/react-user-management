import { PropsWithChildren, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  labelText?: string;
  fieldRegister: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  children?: ReactNode;
}

export function InputField(props: FormFieldProps) {
  const { labelText, fieldRegister, error, ...restProps } = props;

  return (
    <div className="flex flex-col">
      <label className="block mb-1">{labelText}</label>
      <input
        className="input input-bordered w-full"
        type="text"
        {...restProps}
        {...fieldRegister}
        placeholder={props.placeholder}
      />
      {error && <div className="text-red-500 mt-1.5">{error}</div>}
    </div>
  );
}

interface OptionsProps extends PropsWithChildren {
  value: string;
}

export function SelectField(props: FormFieldProps) {
  const { labelText, fieldRegister, error, ...restProps } = props;

  return (
    <div className="flex flex-col">
      <label className="block mb-1">{labelText}</label>
      <select {...fieldRegister} className="select select-bordered w-full ">
        {props.children}
      </select>
      {error && <div className="text-red-500 mt-1.5">{error}</div>}
    </div>
  );
}

function Option({ value, children }: OptionsProps) {
  return <option value={value}>{children}</option>;
}

SelectField.Option = Option;

export function InputDateField(props: FormFieldProps) {
  const { labelText, fieldRegister, error, ...restProps } = props;

  return (
    <div className="flex flex-col">
      <label className="block mb-1">{labelText}</label>
      <input
        className="input input-bordered w-full"
        type="date"
        {...restProps}
        {...fieldRegister}
      />
      {error && <div className="text-red-500 mt-1.5">{error}</div>}
    </div>
  );
}

export function InputFileField(props: FormFieldProps) {
  const { labelText, fieldRegister, error, ...restProps } = props;

  return (
    <div className="flex flex-col">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs file-input-sm"
        accept="image/png, image/gif, image/jpeg"
        {...restProps}
      />
      {error && <div className="text-red-500 mt-1.5">{error}</div>}
    </div>
  );
}
