import { ImageWithFallback } from './figma/ImageWithFallback';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export function ScreenshotSection() {
  return (
    <section className="py-24 bg-[#0d1117]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            See RepoSmart in Action
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Experience the power of automated repository analysis with our intuitive dashboard
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Screenshot */}
          <div className="relative rounded-xl overflow-hidden border border-[#30363d] shadow-2xl mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBibHVlfGVufDF8fHx8MTc3MjIwMDU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="RepoSmart Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent" />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:border-[#58a6ff] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#58a6ff]/10 border border-[#58a6ff]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#58a6ff]/20 transition-all">
                <Zap className="w-6 h-6 text-[#58a6ff]" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">Real-time</div>
              <p className="text-[#8b949e]">Instant repository analysis and scoring</p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:border-[#3fb950] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#3fb950]/10 border border-[#3fb950]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3fb950]/20 transition-all">
                <TrendingUp className="w-6 h-6 text-[#3fb950]" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">Detailed</div>
              <p className="text-[#8b949e]">Comprehensive reports with actionable insights</p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 text-center hover:border-[#f0883e] transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#f0883e]/10 border border-[#f0883e]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f0883e]/20 transition-all">
                <Shield className="w-6 h-6 text-[#f0883e]" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">Secure</div>
              <p className="text-[#8b949e]">Advanced security scanning and malware detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
