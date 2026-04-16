import { motion } from "motion/react";
import { FileText, Upload, CheckCircle2, AlertCircle, Search, Trophy, Users, Zap, Mail, Github, Globe, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// --- Navbar Component ---
export function Navbar({ activeTab, setActiveTab, isDark, setIsDark }: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isDark: boolean,
  setIsDark: (dark: boolean) => void
}) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'score', label: 'Resume Score' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Marquee Section */}
      <div className="bg-primary text-primary-foreground py-1 text-[9px] uppercase tracking-[0.25em] font-bold marquee-container">
        <div className="marquee-content">
          <span>AI-Powered Resume Screening</span>
          <span>•</span>
          <span>Instant Candidate Ranking</span>
          <span>•</span>
          <span>Advanced NLP Parsing</span>
          <span>•</span>
          <span>Startup-Grade Efficiency</span>
          <span>•</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span>AI-Powered Resume Screening</span>
          <span>•</span>
          <span>Instant Candidate Ranking</span>
          <span>•</span>
          <span>Advanced NLP Parsing</span>
          <span>•</span>
          <span>Startup-Grade Efficiency</span>
          <span>•</span>
        </div>
      </div>

      <nav className="glass border-b border-black/5 dark:border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-primary p-1.5 rounded-sm">
            <Zap className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tighter hidden sm:block uppercase">IntelliScreen</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-1 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-primary",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-[1.25rem] left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="rounded-full"
        >
          {isDark ? "🌙" : "☀️"}
        </Button>
      </nav>
    </div>
  );
}

// --- Home Page ---
export function Home({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Badge variant="outline" className="mb-4 px-4 py-1 rounded-none text-primary border-primary uppercase tracking-widest text-[10px]">
          Advanced NLP Engine
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black tracking-[calc(-0.05em)] mb-6 uppercase leading-[0.9]">
          Intelligent Resume Screening
        </h1>
        <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed font-medium">
          Upload resumes and job descriptions to get AI-based candidate rankings. 
          Save hundreds of hours in manual screening with our high-performance matching engine.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="h-11 px-10 text-[10px] font-bold uppercase tracking-widest rounded-none shadow-none hover:bg-primary/90 transition-all" onClick={onStart}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-10 text-[10px] font-bold uppercase tracking-widest rounded-none glass hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            View Demo
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl"
      >
        {[
          { icon: <Search className="w-6 h-6" />, title: "Smart Parsing", desc: "Extracts key skills and experience automatically." },
          { icon: <Zap className="w-6 h-6" />, title: "Instant Ranking", desc: "Get real-time scores based on job relevance." },
          { icon: <Users className="w-6 h-6" />, title: "Batch Processing", desc: "Screen hundreds of resumes in seconds." }
        ].map((feature, i) => (
          <Card key={i} className="glass rounded-none border-black/5 dark:border-white/5 hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-none bg-primary text-primary-foreground flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">{feature.title}</CardTitle>
              <CardDescription className="text-xs font-medium">{feature.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}


// --- Resume Score Page ---
export function ResumeScore() {
  const [jobTitle, setJobTitle] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [location, setLocation] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ score: number, matches: string[], missing: string[] } | null>(null);

  const handleAnalyze = () => {
    if (!jobTitle || !skillsRequired || !resumeFile) return;
    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResult({
            score: 87,
            matches: ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX Design"],
            missing: ["Docker", "AWS Lambda"]
          });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Analyze & Rank</h2>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fill in job details and upload resume to get started.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Job Description Form */}
        <Card className="glass rounded-none border border-black/5 dark:border-white/5 p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Job Title</label>
              <input 
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-medium" 
                placeholder="e.g. Senior Frontend Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills Required</label>
              <textarea 
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-medium h-20" 
                placeholder="e.g. React, TypeScript, Tailwind, Node.js"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</label>
              <input 
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-medium" 
                placeholder="e.g. Remote / New York, NY"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card className="glass rounded-none border-dashed border-2 border-primary/20 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          />
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-none bg-primary text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Resume / CV</h3>
            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Drag and drop or click to upload</p>
            {resumeFile ? (
              <Badge variant="secondary" className="rounded-none bg-primary text-primary-foreground border-none">
                {resumeFile.name}
              </Badge>
            ) : (
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-tighter">PDF</Badge>
                <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-tighter">DOCX</Badge>
                <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-tighter">TXT</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mb-12">
        <Button 
          size="lg" 
          className="px-12 rounded-none h-12 text-[10px] font-bold uppercase tracking-widest shadow-none"
          disabled={!jobTitle || !skillsRequired || !resumeFile || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? "Analyzing..." : "Calculate Score"}
        </Button>
      </div>

      {isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="max-w-md mx-auto text-center"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest animate-pulse">AI is parsing documents...</p>
          <Progress value={progress} className="h-1 rounded-none" />
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="glass rounded-none md:col-span-1 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="uppercase tracking-widest text-sm">Match Score</CardTitle>
              <CardDescription className="text-xs">Overall suitability</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pb-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-muted/20"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                    className="text-primary transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-4xl font-black tracking-tighter">{result.score}%</span>
              </div>
              <Badge className="mt-4 rounded-none bg-primary text-primary-foreground uppercase tracking-widest text-[10px]">Highly Recommended 🥇</Badge>
            </CardContent>
          </Card>

          <Card className="glass rounded-none md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 uppercase tracking-widest text-sm">
                <CheckCircle2 className="text-primary w-5 h-5" />
                Key Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {result.matches.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="rounded-none px-3 py-1 uppercase tracking-tighter text-[10px]">{skill}</Badge>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-muted-foreground w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Missing Skills / Gaps</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missing.map((skill, i) => (
                  <Badge key={i} variant="outline" className="rounded-none px-3 py-1 border-primary/20 text-muted-foreground uppercase tracking-tighter text-[10px]">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// --- About Page ---
export function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-12"
      >
        <section>
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">How it works</h2>
          <p className="text-base text-muted-foreground leading-relaxed font-medium">
            Our system uses state-of-the-art Natural Language Processing (NLP) to bridge the gap between 
            talent and opportunity. We don't just look for keywords; we understand context, seniority, and domain expertise.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "NLP Parsing", desc: "Deep semantic analysis of unstructured resume text to extract entities and skills." },
            { title: "Smart Matching", desc: "Multi-dimensional scoring algorithm that weights experience, education, and specific tech stacks." },
            { title: "Ranking", desc: "Automated candidate prioritization based on custom job description requirements." }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="text-primary font-black text-3xl">0{i+1}</div>
              <h3 className="font-bold text-sm uppercase tracking-widest">{item.title}</h3>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <Card className="glass p-8 rounded-none border-primary/10">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Our Mission</h3>
          <p className="text-muted-foreground italic font-medium">
            "To eliminate bias and inefficiency in the hiring process by providing recruiters with 
            objective, data-driven insights into candidate suitability."
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

// --- Contact Page ---
export function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Get in Touch</h2>
          <p className="text-muted-foreground mb-8 font-medium text-sm">
            Have questions or want to integrate our API? Our team is ready to help you scale your hiring process.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-primary-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Email</p>
                <p className="text-muted-foreground text-sm font-medium">hello@intelliscreen.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-primary-foreground">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">GitHub</p>
                <p className="text-muted-foreground text-sm font-medium">github.com/hackathon-innovators</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-primary-foreground">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Team</p>
                <p className="text-muted-foreground text-sm font-medium">Hackathon Innovators</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="glass p-8 rounded-none">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest">Name</label>
              <input className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-4 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-sm" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest">Email</label>
              <input className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-4 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-sm" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest">Message</label>
              <textarea className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-4 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-sm h-32" placeholder="Tell us about your needs..." />
            </div>
            <Button className="w-full rounded-none h-11 font-bold uppercase tracking-widest text-[10px]">Send Message</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

// --- Footer ---
export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-black/5 dark:border-white/5 glass mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Zap className="text-primary w-5 h-5" />
          <span className="font-black text-lg uppercase tracking-tighter">IntelliScreen</span>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">API Docs</a>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="rounded-none hover:bg-primary hover:text-primary-foreground">
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-none hover:bg-primary hover:text-primary-foreground">
            <Github className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="text-center mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        © 2024 IntelliScreen AI. Built by Hackathon Innovators.
      </div>
    </footer>
  );
}
