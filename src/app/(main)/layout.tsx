import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">{children}</main> {/* Removed pt-24 since it's now in Home page */}
      <Footer />
    </div>
  );
}