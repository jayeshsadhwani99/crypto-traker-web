import { ChangeEventHandler } from "react";
import "./styles.css";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: any;
  handleChange: ChangeEventHandler;
}

function Input({
  type = "text",
  placeholder,
  value,
  handleChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Input;
