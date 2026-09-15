// import './App.css'

import { useState } from "react";
import Header from "./components/Header";
import SiderBar from "./components/Sidebar";
import RenderIssueList from "./pages/IssuePage";
import RenderProjectList from "./pages/Project";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./components/NotFound";
import { IssueDetail } from "./components/IssueDetails";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <BrowserRouter>
      <Header onClick={toggleSidebar} />
      <main>
        <SiderBar isOpen={isSidebarOpen} handleClose={toggleSidebar} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects" element={<RenderProjectList />} />
          <Route path="/issues" element={<RenderIssueList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/issues/:issueId" element={<IssueDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
