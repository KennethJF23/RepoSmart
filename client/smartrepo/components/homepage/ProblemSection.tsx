import { FileX2, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProblemSection() {
  const problems = [
    {
      icon: FileX2,
      title: 'Missing Licenses',
      description: 'Many repositories lack proper open-source licenses, creating legal uncertainty and risks for users.',
      image: 'https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwZGFya3xlbnwxfHx8fDE3NzIyMDA1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: AlertTriangle,
      title: 'No Quality Standards',
      description: 'There\'s no standard indicator to quickly judge repository reliability, making it difficult for beginners.',
      image: 'https://images.unsplash.com/photo-1751700237554-ab6b0b19ca83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RlJTIwc2NyZWVuJTIwYmx1ZXxlbnwxfHx8fDE3NzIyMDA1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Clock,
      title: 'Time-Consuming Evaluation',
      description: 'Manual checking of stars, commits, issues, and documentation is tedious and inefficient.',
      image: 'https://images.unsplash.com/photo-1531535701800-03b2bec4fbfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB0ZWFtJTIwY29kaW5nfGVufDF8fHx8MTc3MjIwMDU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: ShieldAlert,
      title: 'Security Concerns',
      description: 'Some repositories may contain unsafe or suspicious code, increasing security risks for users.',
      image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwYmx1ZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMjAwNTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="py-24 bg-[#0d1117] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            The Challenge with GitHub Repositories
          </h2>
          <p className="text-lg text-[#8b949e] max-w-3xl mx-auto">
            Despite millions of repositories available, developers face critical challenges when evaluating project safety and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group relative bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#58a6ff] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={problem.image}
                  alt={problem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/60 to-transparent" />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#da3633]/20 backdrop-blur-sm border border-[#da3633]/30 flex items-center justify-center">
                    <problem.icon className="w-8 h-8 text-[#f85149]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-white">{problem.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{problem.description}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
