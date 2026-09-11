// import './App.css'

import { useState } from "react";
import Header from "./components/Header";
import SiderBar from "./components/Sidebar";
import RenderIssueList from "./pages/IssuePage";
import RenderProjectList from "./pages/Project";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./components/NotFound";
import { IssueDetail } from "./components/IssueDetails";
import ProctectRoute from "./components/ProtectedRoute";

const AuthenticatedLayout = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <>
      <Header onClick={onToggle} />
      <main>
        <SiderBar isOpen={isOpen} handleClose={onToggle} />
        <Outlet />
      </main>
    </>
  );
};
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <BrowserRouter>
      <SiderBar isOpen={isSidebarOpen} handleClose={toggleSidebar} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProctectRoute />}>
          <Route
            element={
              <AuthenticatedLayout
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
              />
            }
          >
            <Route path="/projects" element={<RenderProjectList />} />
            <Route path="/issues" element={<RenderIssueList />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/issues/:issueId" element={<IssueDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
