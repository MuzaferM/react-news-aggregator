import React, { useState } from "react";
import AllNews from "./components/AllNews";
import Tabs from "./components/Tabs/Tabs";
import PersonalizedFeed from "./components/PersonalizedFeed";
import { TabList } from "./types";
import "./styles/index.scss";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container">
      <header>
        <h1>News Aggregator</h1>
      </header>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === TabList.All && <AllNews />}
      {activeTab === TabList.Personalized && <PersonalizedFeed />}
    </div>
  );
};

export default App;
