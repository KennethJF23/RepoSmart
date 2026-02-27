import { ShieldCheck, GitFork, Users2, CheckCircle2 } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: GitFork,
      value: '10,000+',
      label: 'Repositories Analyzed',
      color: '#58a6ff',
    },
    {
      icon: Users2,
      value: '5,000+',
      label: 'Active Users',
      color: '#3fb950',
    },
    {
      icon: ShieldCheck,
      value: '98%',
      label: 'Security Accuracy',
      color: '#f0883e',
    },
    {
      icon: CheckCircle2,
      value: '15,000+',
      label: 'Licenses Verified',
      color: '#a371f7',
    },
  ];

  return (
    <section className="py-12 bg-[#0d1117] border-y border-[#30363d]">
      <div className="container mx-auto sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-[#161b22] border border-[#30363d] mb-4 group-hover:border-[#58a6ff] transition-all">
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#8b949e]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
