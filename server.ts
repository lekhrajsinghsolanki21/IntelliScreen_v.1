import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Setup Multer for memory storage
const upload = multer({ 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/test', (req, res) => {
  res.json({ status: 'success', message: 'Backend is active and healthy!' });
});

app.post('/api/upload', upload.array('resumes'), (req: any, res) => {
  const files = req.files as any[];
  
  if (!files || files.length === 0) {
    return res.status(400).json({ status: 'error', message: 'No files uploaded' });
  }

  // Generate detailed results for each file
  // In a real app, you'd call Gemini or an NLP engine here
  const results = files.map((file, index) => {
    const name = file.originalname.split('.')[0];
    const score = Math.floor(Math.random() * (95 - 65 + 1) + 65);
    
    return {
      id: `cand-${index}-${Date.now()}`,
      name: name,
      atsScore: score,
      detailedMatcher: [
        {
          category: "Technical Skills",
          matches: ["React.js", "TypeScript", "Tailwind CSS"],
          missing: ["Docker", "Kubernetes"],
          score: 85
        },
        {
          category: "Soft Skills",
          matches: ["Communication", "Teamwork", "Problem Solving"],
          missing: ["Public Speaking"],
          score: 90
        },
        {
          category: "Experience",
          matches: ["3+ Years Frontend", "Agile Methodology"],
          missing: ["Lead Experience"],
          score: 75
        }
      ],
      feedback: "Strong technical background revealed in the document parsing. Good alignment with modern frontend stacks.",
      enhancements: [
        "Quantify your impact in previous roles",
        "Add more cloud-native tools to your skillset"
      ],
      recommendedCourses: [
        {
          title: "Advanced TypeScript Patterns",
          platform: "Frontend Masters",
          duration: "10 Hours",
          rating: "4.9/5"
        }
      ]
    };
  });

  res.json({ status: 'success', results });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
