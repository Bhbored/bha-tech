import { Route, Routes } from "react-router-dom";
import { TermsPage } from "@/app/features/legal/pages/TermsPage";
import { PrivacyPage } from "@/app/features/legal/pages/PrivacyPage";
import { HomePage } from "@/app/features/marketing/pages/HomePage";
import { MarketingShell } from "@/app/shell/MarketingShell";
import { NotFoundPage } from "@/app/shared/components/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MarketingShell />}>
        <Route index element={<HomePage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
