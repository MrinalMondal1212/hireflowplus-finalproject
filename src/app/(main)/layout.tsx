import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import DarkVeil from "@/components/DarkVeil";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-[800px] relative">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>
      </div>

      <Navbar />

      <main className="flex-1 pt-24">{children}</main>

      <Footer />
    </div>
  );
}