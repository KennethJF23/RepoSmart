import { Github, Code2, Users, Building2, Cpu } from 'lucide-react';

export function TrustedBySection() {
  return (
    <section className="py-12 bg-[#161b22] border-y border-[#30363d]">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-[#8b949e] mb-8 uppercase tracking-wider">
          Trusted by developers from
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <Github className="w-6 h-6 text-[#8b949e]" />
            <span className="text-xl font-semibold text-[#c9d1d9]">GitHub</span>
          </div>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <Code2 className="w-6 h-6 text-[#8b949e]" />
            <span className="text-xl font-semibold text-[#c9d1d9]">OpenSource</span>
          </div>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <Users className="w-6 h-6 text-[#8b949e]" />
            <span className="text-xl font-semibold text-[#c9d1d9]">DevCommunity</span>
          </div>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <Building2 className="w-6 h-6 text-[#8b949e]" />
            <span className="text-xl font-semibold text-[#c9d1d9]">Enterprise</span>
          </div>
          <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <Cpu className="w-6 h-6 text-[#8b949e]" />
            <span className="text-xl font-semibold text-[#c9d1d9]">TechHub</span>
          </div>
        </div>
      </div>
    </section>
  );
}
