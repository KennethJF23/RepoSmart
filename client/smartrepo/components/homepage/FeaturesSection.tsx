"use client";
import { ShieldCheck, BarChart3, FileText, ScanSearch, Activity, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

export function FeaturesSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: ShieldCheck,
      title: 'License Verification',
      description: 'Automatically verify the presence of valid open-source licenses using the GitHub API to ensure legal safety.',
      image: 'https://images.unsplash.com/photo-1707061229170-fc232a07a55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjByZXBvc2l0b3J5JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjIwMDU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#58a6ff',
    },
    {
      icon: BarChart3,
      title: 'Quality Scoring',
      description: 'Get automated quality scores based on stars, forks, commits, documentation, and issue activity.',
      image: 'https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBibHVlfGVufDF8fHx8MTc3MjIwMDU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#388bfd',
    },
    {
      icon: FileText,
      title: 'Documentation Analysis',
      description: 'Evaluate the presence and quality of README files, contributing guidelines, and other documentation.',
      image: 'https://images.unsplash.com/photo-1763136469661-5bed49c5a9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjBjb2RpbmclMjBkYXJrJTIwYmx1ZXxlbnwxfHx8fDE3NzIyMDA1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: '#3fb950',
    },
    // {
    //   icon: ScanSearch,
    //   title: 'Security Scanning',
    //   description: 'Advanced malware detection and security scanning to identify suspicious code patterns and vulnerabilities.',
    //   image: 'https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwYmx1ZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMjAwNTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //   color: '#f85149',
    // },
    // {
    //   icon: Activity,
    //   title: 'Activity Tracking',
    //   description: 'Monitor recent commits, maintenance status, and community engagement to assess repository health.',
    //   image: 'https://images.unsplash.com/photo-1531535701800-03b2bec4fbfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB0ZWFtJTIwY29kaW5nfGVufDF8fHx8MTc3MjIwMDU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //   color: '#f0883e',
    // },
    // {
    //   icon: Lightbulb,
    //   title: 'Smart Recommendations',
    //   description: 'Receive actionable insights and recommendations to improve repository quality and compliance.',
    //   image: 'https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwZGFya3xlbnwxfHx8fDE3NzIyMDA1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //   color: '#d29922',
    // },
  ];

  return (
    <section className="py-24 bg-[#161b22] relative overflow-hidden sm:px-14">
      {/* Parallax background elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#1f6feb] rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Comprehensive Repository Analysis
          </h2>
          <p className="text-lg text-[#8b949e] max-w-3xl mx-auto">
            Powered by advanced algorithms and GitHub's API, RepoSmart provides everything you need to evaluate repositories with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#58a6ff] transition-all duration-300"
            >
              {/* Image with overlay */}
              <div className="relative h-44 overflow-hidden">
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}15 0%, transparent 100%)`,
                  }}
                />
                
                {/* Icon */}
                <div className="absolute top-4 left-4">
                  <div 
                    className="w-12 h-12 rounded-lg backdrop-blur-xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      borderColor: `${feature.color}40`,
                    }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-[#8b949e] leading-relaxed">{feature.description}</p>
              </div>

              {/* Animated border */}
              <div 
                className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ backgroundColor: feature.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
