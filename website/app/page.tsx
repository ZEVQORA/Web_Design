import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Hero } from "@/components/marketing/Hero";
import { ConnectEvidence } from "@/components/marketing/ConnectEvidence";
import { SpendGraph } from "@/components/marketing/SpendGraph";
import { WasteDiagnosis } from "@/components/marketing/WasteDiagnosis";
import { Experiment } from "@/components/marketing/Experiment";
import { ReplayEval } from "@/components/marketing/ReplayEval";
import { VerificationProof } from "@/components/marketing/VerificationProof";
import { VerifiedChange } from "@/components/marketing/VerifiedChange";
import { ProductReveal } from "@/components/marketing/ProductReveal";
import { AskZev } from "@/components/marketing/AskZev";
import { WhoItIsFor } from "@/components/marketing/WhoItIsFor";
import { DesignPartner } from "@/components/marketing/DesignPartner";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Section } from "@/components/marketing/Section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The homepage is one continuous argument, in order: here is your AI work,
 * here is where the money goes, here is the waste, here is a candidate, here is
 * the replay, here is the verdict - including the one we rejected - and here is
 * what a person reviews at the end.
 *
 * The page is a server component. Only the evidence tape, Zev's pointer
 * response and the product reveal are client islands.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ConnectEvidence />
        <SpendGraph />
        <WasteDiagnosis />
        <Experiment />
        <ReplayEval />
        <VerificationProof />
        <VerifiedChange />
        <ProductReveal />
        <AskZev />
        <WhoItIsFor />
        <DesignPartner />
        <Section id="pricing">
          <PricingSection />
        </Section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
