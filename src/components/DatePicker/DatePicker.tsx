import React, { useState, useEffect, useRef } from "react";
import { DayPicker, ClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  label?: string;
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null); // To track clicks outside

  const customClassNames: ClassNames = {
    caption: styles["date-picker__caption"],
    day_selected: styles["date-picker__day-selected"],
    day: styles["date-picker__day"],
    nav: styles["date-picker__nav"],
    nav_button: styles["date-picker__nav-button"],
    day_outside: styles["date-picker__day-outside"],
    head: styles["date-picker__day-of-week"], // Class for Sun, Mon, etc.
  };

  // Close the calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["date-picker"]} ref={datePickerRef}>
      {label && <label className={styles["date-picker__label"]}>{label}</label>}
      <input
        type="text"
        value={
          selectedDate
            ? selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : ""
        }
        placeholder="DD/MM/YYYY"
        readOnly
        onFocus={() => setIsOpen(true)}
        className={styles["date-picker__input"]}
      />
      {isOpen && (
        <div className={styles["date-picker__popup"]}>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              const adjustedDate = date ? new Date(date) : undefined;
              onDateChange(adjustedDate);
              setIsOpen(false);
            }}
            classNames={customClassNames}
            styles={{
              root: { width: "200px", height: "250px" },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
