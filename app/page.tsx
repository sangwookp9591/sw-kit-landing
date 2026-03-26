import Hero from "@/components/Hero";
import WhyAing from "@/components/WhyAing";
import AgentTeam from "@/components/AgentTeam";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import InnovationsPdca from "@/components/InnovationsPdca";
import Commands from "@/components/Commands";
import InstallCta from "@/components/InstallCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyAing />
      <AgentTeam />
      <WorkflowPipeline />
      <InnovationsPdca />
      <Commands />
      <InstallCta />
      <Footer />
    </main>
  );
}
