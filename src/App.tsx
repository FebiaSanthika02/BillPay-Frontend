import { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { FloatingDock, FloatingAiButton } from "./components/FloatingDock";
import { AIChatPanel } from "./components/AIChatPanel";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { DashboardShowcase } from "./components/sections/DashboardShowcase";
import { InvestmentExpenseSection } from "./components/sections/InvestmentExpenseSection";
import { AIBudgetSection } from "./components/sections/AIBudgetSection";
import { VirtualCardsPartnersSection } from "./components/sections/VirtualCardsPartnersSection";
import { TestimonialsPricingFaqSection } from "./components/sections/TestimonialsPricingFaqSection";
import { MobileOnboardingSection } from "./components/sections/MobileOnboardingSection";
import { CryptoSecurityInsightsSection } from "./components/sections/CryptoSecurityInsightsSection";
import { TransactionSection } from "./components/sections/TransactionSection";

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-[100dvh]">
        <Navbar onOpenAi={() => setAiOpen(true)} />
        <main className="page-enter pb-44 pt-0 sm:pb-40">
          <HeroSection />
          <TransactionSection />
          <DashboardShowcase />
          <InvestmentExpenseSection />
          <AIBudgetSection />
          <VirtualCardsPartnersSection />
          <TestimonialsPricingFaqSection />
          <MobileOnboardingSection />
          <CryptoSecurityInsightsSection />
        </main>
        <Footer />
        <FloatingDock />
        <FloatingAiButton onClick={() => setAiOpen(true)} />
        <AIChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </ThemeProvider>
  );
}
