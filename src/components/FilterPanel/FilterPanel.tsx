import React, { useState } from "react";
import { Category, Source } from "@/types";
import DatePicker from "../DatePicker/DatePicker";
import CustomSelect from "../Select/Select";
import styles from "./FilterPanel.module.scss";
import { capitalizeFirstLetter, formatSourceEnumLabel } from "@/utils/fixtures";

interface FilterProps {
  onFilterApply: (filters: {
    date?: string;
    category?: Category;
    source?: Source;
  }) => void;
}

const FilterPanel: React.FC<FilterProps> = ({ onFilterApply }) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<Category>(Category.Any); // Default to "Any"
  const [source, setSource] = useState<Source | undefined>(undefined);

  const handleApplyFilters = () => {
    onFilterApply({
      date,
      category: category === Category.Any ? undefined : category,
      source,
    });
  };

  // Category options from the enum
  const categoryOptions = Object.values(Category).map((cat) => ({
    label: capitalizeFirstLetter(cat),
    value: cat,
  }));

  // Source options from the enum
  const sourceOptions = Object.values(Source).map((src) => ({
    label: formatSourceEnumLabel(src),
    value: src,
  }));

  return (
    <div className={styles.filterPanel}>
      <p className={styles.filterPanel__subHeading}>Filters</p>

      {/* Date Filter */}
      <DatePicker
        label="Date"
        selectedDate={date ? new Date(date) : undefined}
        onDateChange={(selectedDate) =>
          setDate(
            selectedDate ? selectedDate.toISOString() : undefined
          )
        }
      />

      {/* Category Filter */}
      <CustomSelect
        label="Category"
        options={categoryOptions}
        value={categoryOptions.find((opt) => opt.value === category)}
        onChange={(selectedOption) =>
          setCategory(selectedOption?.value as Category)
        }
      />

      {/* Source Filter */}
      <CustomSelect
        label="Source"
        options={sourceOptions}
        value={sourceOptions.find((opt) => opt.value === source)}
        onChange={(selectedOption) =>
          setSource((selectedOption?.value as Source) || undefined)
        }
      />

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className={styles.filterPanel__button}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
