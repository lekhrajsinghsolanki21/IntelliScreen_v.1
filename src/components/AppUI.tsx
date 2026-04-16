import { motion } from "motion/react";
import { FileText, Upload, CheckCircle2, AlertCircle, Search, Trophy, Users, Zap, Mail, Github, Globe, Linkedin, Sparkles, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store";
import { 
  setActiveTab, 
  toggleDarkMode, 
  setJobDetails, 
  startAnalysis, 
  updateProgress, 
  completeAnalysis 
} from "@/src/store/appSlice";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import axios from "axios";

// --- Navbar Component ---
export function Navbar() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.app.activeTab);
  const isDark = useSelector((state: RootState) => state.app.isDark);

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
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => dispatch(setActiveTab('home'))}>
          <div className="bg-primary p-1.5 rounded-sm">
            <Zap className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tighter hidden sm:block uppercase">IntelliScreen</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
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
          onClick={() => dispatch(toggleDarkMode())}
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


// --- Confirmation Modal ---
function ConfirmationModal({ isOpen, onClose, onConfirm, message }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; message: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-sm w-full p-8 rounded-none border border-primary/20 text-center"
      >
        <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Redirecting</h3>
        <p className="text-xs font-medium text-muted-foreground mb-8 uppercase tracking-wider leading-relaxed">
          {message}
        </p>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 rounded-none uppercase tracking-widest text-[10px] font-bold"
            onClick={onClose}
          >
            No
          </Button>
          <Button 
            className="flex-1 rounded-none uppercase tracking-widest text-[10px] font-bold"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Resume Score Page ---
export function ResumeScore() {
  const dispatch = useDispatch();
  const { jobTitle, skillsRequired, location, isAnalyzing, progress, results } = useSelector((state: RootState) => state.app.analysis);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  const handleViewCourse = (url: string) => {
    setPendingUrl(url);
    setShowConfirm(true);
  };

  const confirmRedirect = () => {
    window.open(pendingUrl, '_blank');
    setShowConfirm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setResumeFiles(files);
    }
  };

  const handleAnalyze = async () => {
    if (!jobTitle || !skillsRequired || resumeFiles.length === 0) return;
    dispatch(startAnalysis());
    setSelectedCandidateId(null);

    // Initial progress simulation (smooth ramp up)
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 2;
      if (currentProgress < 90) {
        dispatch(updateProgress(currentProgress));
      }
    }, 100);

    try {
      const formData = new FormData();
      resumeFiles.forEach(file => {
        formData.append('resumes', file);
      });

      // API call to the new Express backend
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // Sync progress slightly behind 100% until complete
            dispatch(updateProgress(Math.min(95, percentCompleted)));
          }
        }
      });

      clearInterval(progressInterval);
      dispatch(updateProgress(100));
      
      const realResults = response.data.results;
      dispatch(completeAnalysis(realResults));
      if (realResults.length > 0) {
        setSelectedCandidateId(realResults[0].id);
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Analysis failed:", error);
      alert("Failed to connect to the backend server. Please ensures it's running on port 3000.");
      dispatch(updateProgress(0));
    }
  };

  const selectedCandidate = results.find(c => c.id === selectedCandidateId);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Analyze & Rank</h2>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fill in job details and upload multiple resumes to compare candidates.</p>
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
                onChange={(e) => dispatch(setJobDetails({ jobTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills Required</label>
              <textarea 
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-medium h-20" 
                placeholder="e.g. React, TypeScript, Tailwind, Node.js"
                value={skillsRequired}
                onChange={(e) => dispatch(setJobDetails({ skillsRequired: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</label>
              <input 
                className="w-full bg-background/50 border border-black/10 dark:border-white/10 rounded-none px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-all text-xs font-medium" 
                placeholder="e.g. Remote / New York, NY"
                value={location}
                onChange={(e) => dispatch(setJobDetails({ location: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Multiple Resume Upload */}
        <Card className="glass rounded-none border-dashed border-2 border-primary/20 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <input 
            type="file" 
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            onChange={handleFileChange}
          />
          <CardContent className="flex flex-col items-center justify-center py-8 w-full">
            <div className="w-16 h-16 rounded-none bg-primary text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Resumes / CVs</h3>
            <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Upload multiple files to compare</p>
            
            {resumeFiles.length > 0 ? (
              <div className="w-full max-w-xs space-y-2 max-h-40 overflow-y-auto px-2">
                {resumeFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-primary/10 px-3 py-1.5 border border-primary/20">
                    <span className="text-[10px] font-bold truncate max-w-[150px]">{file.name}</span>
                    <Badge variant="secondary" className="rounded-none text-[8px] uppercase">{(file.size / 1024).toFixed(0)} KB</Badge>
                  </div>
                ))}
              </div>
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
          disabled={!jobTitle || !skillsRequired || resumeFiles.length === 0 || isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? "Analyzing..." : `Analyze ${resumeFiles.length > 0 ? resumeFiles.length : ''} Resumes`}
        </Button>
      </div>

      {isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="max-w-md mx-auto text-center"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest animate-pulse">AI is parsing {resumeFiles.length} documents...</p>
          <Progress value={progress} className="h-1 rounded-none" />
        </motion.div>
      )}

      {results.length > 0 && (
        <div className="space-y-8">
          {/* Candidate Selector / Ranking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resumeFiles.map((candidate) => {
              const result = results.find(r => r.name === candidate.name.replace(/\.[^/.]+$/, "") || r.name === candidate.name);
              const isInvalid = result?.isInvalid;
              
              return (
                <Card 
                  key={candidate.name}
                  onClick={() => {
                    const res = results.find(r => r.name === candidate.name.replace(/\.[^/.]+$/, "") || r.name === candidate.name);
                    if (res) setSelectedCandidateId(res.id);
                  }}
                  className={cn(
                    "glass rounded-none cursor-pointer transition-all border-l-4",
                    selectedCandidateId === results.find(r => r.name === candidate.name.replace(/\.[^/.]+$/, "") || r.name === candidate.name)?.id 
                      ? "border-primary bg-primary/5" 
                      : "border-transparent hover:border-primary/50",
                    isInvalid && "opacity-70 grayscale"
                  )}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest truncate">{candidate.name}</p>
                      <p className="text-[9px] text-muted-foreground font-medium uppercase">
                        {isInvalid ? "Invalid Document" : `ATS Score: ${result?.atsScore}%`}
                      </p>
                    </div>
                    <div className={cn("font-black text-xl", isInvalid ? "text-destructive" : "text-primary")}>
                      {isInvalid ? "!" : result?.atsScore}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {selectedCandidate && (
            <motion.div
              key={selectedCandidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {selectedCandidate.isInvalid ? (
                <Card className="glass rounded-none border-destructive/50 bg-destructive/5 p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <h3 className="text-xl font-bold uppercase tracking-widest">Not a Resume</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      {selectedCandidate.errorMessage}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-4">
                      Please upload a valid PDF, DOCX, or TXT resume file.
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ATS Score & Pie Chart Card */}
                    <Card className="glass rounded-none lg:col-span-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="uppercase tracking-widest text-sm flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-primary" />
                          Analysis Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
                        <div className="flex flex-col items-center justify-center border-r border-black/5 dark:border-white/5 pr-0 md:pr-8">
                          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="80"
                                cy="80"
                                r="74"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-muted/20"
                              />
                              <circle
                                cx="80"
                                cy="80"
                                r="74"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={464.7}
                                strokeDashoffset={464.7 - (464.7 * selectedCandidate.atsScore) / 100}
                                className="text-primary transition-all duration-1000 ease-out"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-5xl font-black tracking-tighter leading-none">{selectedCandidate.atsScore}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ATS Score</span>
                            </div>
                          </div>
                          <Badge className="rounded-none bg-primary text-primary-foreground uppercase tracking-widest text-[10px] px-4">
                            {selectedCandidate.atsScore > 85 ? "Highly Recommended 🥇" : "Strong Match 🥈"}
                          </Badge>
                        </div>

                        <div className="h-[280px] w-full relative">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-4 text-primary">Skill Proficiency Breakdown</p>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={selectedCandidate.detailedMatcher.map(d => ({ name: d.category, value: d.matches.length }))}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                              >
                                {selectedCandidate.detailedMatcher.map((entry, index) => {
                                  const colors = [
                                    "hsl(var(--primary))", 
                                    "hsl(215, 90%, 50%)", 
                                    "hsl(280, 80%, 60%)"
                                  ];
                                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />;
                                })}
                              </Pie>
                              <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="glass p-3 border border-primary/20 shadow-xl">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{payload[0].name}</p>
                                        <p className="text-[10px] font-bold uppercase">{payload[0].value} Matches Found</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                iconType="square"
                                wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.05em', paddingTop: '20px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          {/* Center Label */}
                          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="block text-2xl font-black leading-none">
                              {selectedCandidate.detailedMatcher.reduce((acc, curr) => acc + curr.matches.length, 0)}
                            </span>
                            <span className="block text-[8px] font-bold uppercase tracking-tighter text-muted-foreground">Total Skills</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass rounded-none lg:col-span-1">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 uppercase tracking-widest text-sm">
                          <CheckCircle2 className="text-primary w-5 h-5" />
                          Detailed Job Matcher
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {selectedCandidate.detailedMatcher.map((detail, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">{detail.category}</h4>
                              <span className="text-[10px] font-black">{detail.score}%</span>
                            </div>
                            <Progress value={detail.score} className="h-0.5 rounded-none" />
                            <div className="flex flex-wrap gap-1.5">
                              {detail.matches.map((m, i) => (
                                <Badge key={i} variant="secondary" className="rounded-none text-[8px] uppercase px-2 py-0">+{m}</Badge>
                              ))}
                              {detail.missing.map((m, i) => (
                                <Badge key={i} variant="outline" className="rounded-none text-[8px] uppercase px-2 py-0 text-muted-foreground">-{m}</Badge>
                              ))}
                            </div>
                            {idx < selectedCandidate.detailedMatcher.length - 1 && <Separator className="opacity-50" />}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="glass rounded-none border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 uppercase tracking-widest text-sm">
                          <MessageSquare className="text-primary w-5 h-5" />
                          AI Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs font-medium leading-relaxed text-muted-foreground italic">
                          "{selectedCandidate.feedback}"
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass rounded-none border-primary/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 uppercase tracking-widest text-sm">
                          <Sparkles className="text-primary w-5 h-5" />
                          Enhance Resume
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedCandidate.enhancements.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-[10px] font-medium">
                              <div className="mt-1 w-1 h-1 bg-primary shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass rounded-none border-primary/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 uppercase tracking-widest text-sm">
                        <BookOpen className="text-primary w-5 h-5" />
                        Recommended Courses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {selectedCandidate.recommendedCourses.map((course, i) => (
                          <div key={i} className="p-4 border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex flex-col justify-between">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-tight leading-tight mb-1">{course.title}</p>
                              <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-medium text-muted-foreground uppercase">{course.platform}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-bold text-primary">{course.duration}</span>
                                  <span className="text-[8px] font-bold text-yellow-500">★ {course.rating}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-[9px] uppercase tracking-widest mt-3 justify-start"
                              onClick={() => handleViewCourse('https://internshala.com/')}
                            >
                              View Course →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </motion.div>
          )}
        </div>
      )}

      <ConfirmationModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmRedirect}
        message="We are directed to third party. Do you want to continue?"
      />
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
    </footer>
  );
}
