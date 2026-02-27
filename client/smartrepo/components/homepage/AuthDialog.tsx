"use client";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Shield, Github } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
}

export function AuthDialog({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email: loginEmail, password: loginPassword });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', { name: registerName, email: registerEmail, password: registerPassword });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-110 bg-[#161b22] border border-[#30363d] text-white p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#58a6ff] to-[#1f6feb] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-white text-xl">Welcome to RepoSmart</DialogTitle>
          </div>
          <DialogDescription className="text-[#8b949e]">
            Sign in to start evaluating GitHub repositories
          </DialogDescription>
        </DialogHeader>
        
        {/* Tabs */}
        <Tabs defaultValue={defaultTab} className="w-full p-6 pt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[#0d1117] p-1 h-auto">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-[#21262d] data-[state=active]:text-white text-[#8b949e] rounded py-2"
            >
              Sign in
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-[#21262d] data-[state=active]:text-white text-[#8b949e] rounded py-2"
            >
              Sign up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-[#c9d1d9]">Email address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-[#c9d1d9]">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0">
                Sign in
              </Button>
              <div className="text-center">
                <a href="#forgot" className="text-sm text-[#58a6ff] hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#30363d]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#161b22] text-[#8b949e]">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-[#30363d] bg-[#21262d] text-white hover:bg-[#30363d] hover:border-[#58a6ff]">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-[#c9d1d9]">Full name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-[#c9d1d9]">Email address</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-[#c9d1d9]">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="bg-[#0d1117] border-[#30363d] text-white placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white border-0">
                Create account
              </Button>
              <p className="text-xs text-center text-[#8b949e]">
                By creating an account, you agree to our{' '}
                <a href="#terms" className="text-[#58a6ff] hover:underline">Terms</a>
                {' '}and{' '}
                <a href="#privacy" className="text-[#58a6ff] hover:underline">Privacy Policy</a>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
