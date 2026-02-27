import { Shield, Github } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Image from 'next/image';

interface HeaderProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function Header({ onLogin, onRegister }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md sm:px-10">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* <div className="absolute inset-0 bg-[#58a6ff] blur-md opacity-50"></div> */}
              <div className="relative w-10 h-10  rounded-lg flex items-center justify-center">
                <Image src={'/images/heroLogo.png'} alt={'RepoSmart Logo'} width={40} height={20} />
              </div>
            </div>
            <div>
              <span className="font-bold text-xl text-white">RepoSmart</span>
              <span className="ml-2 text-xs text-[#8b949e] border border-[#30363d] px-2 py-0.5 rounded-full">Beta</span>
              
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors text-sm font-medium">
              How it Works
            </a>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={onLogin} 
              className="text-[#c9d1d9] hover:text-white hover:bg-[#21262d] border-0"
            >
              Sign in
            </Button>
            <Button 
              onClick={onRegister} 
              className="bg-[#238636] hover:bg-[#2ea043] text-white border-0 shadow-lg shadow-[#238636]/20"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
