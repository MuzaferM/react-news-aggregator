import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Category, Source } from "@/types";
import "./CustomizeFeedPopup.scss";
import { capitalizeFirstLetter, formatSourceEnumLabel } from "@/utils/fixtures";

interface CustomizeFeedPopupProps {
  preferences: {
    sources: Source[];
    categories: Category[];
  };
  onSave: (newPreferences: {
    sources: Source[];
    categories: Category[];
  }) => void;
  onClose: () => void;
}

const CustomizeFeedPopup: React.FC<CustomizeFeedPopupProps> = ({
  preferences,
  onSave,
  onClose,
}) => {
  const [selectedSources, setSelectedSources] = useState<Source[]>(
    preferences.sources || []
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    preferences.categories || []
  );

  const toggleSelection = <T,>(
    value: T,
    list: T[],
    setList: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSave = () => {
    onSave({
      sources: selectedSources as Source[],
      categories: selectedCategories as Category[],
    });
  };

  return (
    <Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="dialog-content">
        <Dialog.Title className="dialog-title">Customize News Feed</Dialog.Title>

        <div className="dialog-section">
          <h3>Sources</h3>

          <div className="options-container">
            {Object.values(Source).map((source) => (
              <label key={source} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(source)}
                  onChange={() =>
                    toggleSelection(source, selectedSources, setSelectedSources)
                  }
                />
                {formatSourceEnumLabel(source)}
              </label>
            ))}
          </div>
        </div>

        <div className="dialog-section">
          <h3>Categories</h3>
          <div className="options-container">
            {Object.values(Category).map((category) => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() =>
                    toggleSelection(
                      category,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                {capitalizeFirstLetter(category)}
              </label>
            ))}
          </div>
        </div>

        <div className="dialog-actions">
          <button className="dialog-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="dialog-save-button" onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomizeFeedPopup;
