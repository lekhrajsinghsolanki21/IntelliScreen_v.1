import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar, Home, ResumeScore, About, Contact, Footer } from "./components/AppUI";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDark, setIsDark] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onStart={() => setActiveTab("score")} />;
      case "score":
        return <ResumeScore />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home onStart={() => setActiveTab("score")} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
        setIsDark={setIsDark} 
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
