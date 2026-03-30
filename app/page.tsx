import Hero from "@/components/Hero";
import WhyAing from "@/components/WhyAing";
import AgentTeam from "@/components/AgentTeam";
import UserGuide from "@/components/UserGuide";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import InnovationsPdca from "@/components/InnovationsPdca";
import Commands from "@/components/Commands";
import InstallCta from "@/components/InstallCta";
import NorchDownload from "@/components/NorchDownload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyAing />
      <AgentTeam />
      <UserGuide />
      <WorkflowPipeline />
      <InnovationsPdca />
      <Commands />
      <InstallCta />
      <NorchDownload />
      <Footer />
    </main>
  );
}
