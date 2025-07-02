import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PullRequestsList from "./projects/PullRequestsList";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id="site">
      <Header />
      <main className="flex flex-col gap-10">
        <PullRequestsList owner="walterfurrer" repo="portfolio" />
      </main>
      <Footer />
    </div>
  </StrictMode>,
);
