import ShinyText from '@/components/ShinyText';
import { RainbowButton } from '@/components/ui/rainbow-button';

import { Sparkles } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="w-full py-24 px-6 bg-[oklch(0.12_0.01_250)]">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-12 md:p-20 text-center">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-none">
            Ready to evolve your <br /> talent acquisition?
          </h2>
          <p className="text-[oklch(0.80_0_0)] text-lg md:text-xl max-w-2xl mx-auto">
            Join 2,000+ teams using HireFlow+ to automate their recruiting pipeline and hire 40% faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <RainbowButton className="px-10 py-5 text-xl rounded-2xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
              <ShinyText text="Start Hiring Now" color="#ffffff" shineColor="var(--primary)" className="font-bold" />
            </RainbowButton>
            
            <button className="px-10 py-5 rounded-2xl text-white font-semibold border border-white/10 hover:bg-white/5 transition-colors">
              Talk to Sales
            </button>
          </div>
          
          <p className="text-white/30 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </section>
  );
};
export default FinalCTA