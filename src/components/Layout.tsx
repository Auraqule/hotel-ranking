import type React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-grow container py-8 flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
