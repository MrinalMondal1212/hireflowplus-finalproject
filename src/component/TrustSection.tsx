import { AuroraText } from "@/components/ui/aurora-text";

const TrustSection = () => {
  return (
    <section className="w-full py-20 bg-[oklch(0.12_0.01_250)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
          <span className="text-white text-xs font-bold uppercase tracking-widest">Enterprise Grade</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">

          Trusted by the next generation of <br /> <AuroraText>Fortune 500 companies.</AuroraText>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* You can reuse your TechLogos or AllcompanySlides components here */}
        </div>
      </div>
    </section>
  );
};
export default TrustSection