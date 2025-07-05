import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import styles from "./Select.module.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: SelectOption;
  onChange: (selectedOption: SingleValue<SelectOption>) => void;
}

const customStyles: StylesConfig<SelectOption> = {
  control: (provided) => ({
    ...provided,
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    border: "1px solid none", 
    padding: "0.25rem",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    border: "1px solid black", 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "black" : "#f5f5f5",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "gray", 
  }),
};

const CustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles["custom-select"]}>
      {label && (
        <label className={styles["custom-select__label"]}>{label}</label>
      )}
      <Select
        options={options}
        value={value}
        onChange={(selectedOption) => onChange(selectedOption as SingleValue<SelectOption>)}
        placeholder="Select"
        classNamePrefix="react-select"
        styles={customStyles} // Apply custom styles here
      />
    </div>
  );
};

export default CustomSelect;
