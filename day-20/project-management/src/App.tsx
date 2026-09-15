// import './App.css'

import { useState } from "react";
import Header from "./components/Header";
import SiderBar from "./components/Sidebar";
import ProjectCard from "./components/ProjectCard";
import IssueCard from "./components/IssueCard";
import RenderIssueList from "./pages/IssuePage";
import RenderProjectList from "./pages/Project";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Header onClick={toggleSidebar} />
      <main>
        <SiderBar isOpen={isSidebarOpen} />
        {/* <ProjectCard title="create login page" description="This is a login page with all the neccesay things   whargfdushuzkd lhidgfschk roihdfgcv"/>
        <IssueCard title="create login page" description="This is a login page with all the neccesay things   whargfdushuzkd lhidgfschk roihdfgcv"/> */}
        {/* <RenderIssueList /> */}
        <RenderProjectList />
      </main>
    </>
  );
}

export default App;
