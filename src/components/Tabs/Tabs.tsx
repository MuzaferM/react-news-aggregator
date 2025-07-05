import React from "react";
import styles from "./Tabs.module.scss";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
        onClick={() => setActiveTab("all")}
      >
        All News
      </button>
      <button
        className={`${styles.tab} ${activeTab === "personalized" ? styles.active : ""}`}
        onClick={() => setActiveTab("personalized")}
      >
        Personalized Feed
      </button>
    </div>
  );
};

export default Tabs;
