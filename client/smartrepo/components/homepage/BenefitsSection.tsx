import { GraduationCap, Code2, Building2, Users2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BenefitsSection() {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'For Students & Beginners',
      points: [
        'Learn to identify quality repositories',
        'Avoid legal issues from unlicensed code',
        'Build projects with reliable dependencies',
        'Understand repository health indicators',
      ],
      image: 'https://images.unsplash.com/photo-1763136469661-5bed49c5a9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjBjb2RpbmclMjBkYXJrJTIwYmx1ZXxlbnwxfHx8fDE3NzIyMDA1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#58a6ff',
    },
    {
      icon: Code2,
      title: 'For Developers',
      points: [
        'Quick evaluation of third-party libraries',
        'Ensure license compatibility',
        'Find well-maintained projects',
        'Get improvement suggestions for your repos',
      ],
      image: 'https://images.unsplash.com/photo-1707061229170-fc232a07a55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjByZXBvc2l0b3J5JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjIwMDU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#3fb950',
    },
    {
      icon: Building2,
      title: 'For Organizations',
      points: [
        'Mitigate legal and security risks',
        'Standardize repository selection',
        'Audit open-source dependencies',
        'Ensure compliance with policies',
      ],
      image: 'https://images.unsplash.com/photo-1531535701800-03b2bec4fbfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB0ZWFtJTIwY29kaW5nfGVufDF8fHx8MTc3MjIwMDU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#f0883e',
    },
    {
      icon: Users2,
      title: 'For Open Source Community',
      points: [
        'Promote best practices',
        'Increase repository quality',
        'Encourage proper licensing',
        'Foster safer collaboration',
      ],
      image: 'https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwZGFya3xlbnwxfHx8fDE3NzIyMDA1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#a371f7',
    },
  ];

  return (
    <section className="py-24 bg-[#161b22]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Built for Everyone
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Our platform serves a diverse range of users in the open-source ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#58a6ff] transition-all"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Side */}
                <div className="relative h-64 md:h-auto md:col-span-2 overflow-hidden">
                  <ImageWithFallback
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color}40 0%, transparent 100%)`,
                    }}
                  >
                    <benefit.icon className="w-16 h-16" style={{ color: benefit.color }} />
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-3 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">{benefit.title}</h3>
                  <ul className="space-y-3">
                    {benefit.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                          style={{ backgroundColor: `${benefit.color}20` }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: benefit.color }}
                          />
                        </div>
                        <span className="text-[#8b949e]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
