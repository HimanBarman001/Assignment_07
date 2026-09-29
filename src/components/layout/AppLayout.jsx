import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import colors from "../../constants/colors";

/**
 * AppLayout — macOS-inspired application shell.
 * Contains Header (titlebar), Sidebar, and main content area with Outlet.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.background }}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ display: "flex" }}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main
          className="main-content"
          style={{
            flex: 1,
            padding: "28px 32px",
            minHeight: "calc(100vh - 52px)",
            marginLeft: "220px",
          }}
        >
          <div style={{ maxWidth: "960px" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
