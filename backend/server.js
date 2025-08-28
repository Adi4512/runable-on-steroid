require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Function to parse markdown response and extract sections
function parseMarkdownResponse(content) {
  const sections = {
    analysis: '',
    suggestions: [],
    issues: []
  };

  // Split content by sections
  const lines = content.split('\n');
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('Code Analysis') || line.includes('🔹 Code Analysis')) {
      currentSection = 'analysis';
      continue;
    } else if (line.includes('Suggestions') || line.includes('🔹 Suggestions')) {
      currentSection = 'suggestions';
      continue;
    } else if (line.includes('Errors') || line.includes('Issues') || line.includes('🔹 Errors') || line.includes('🔹 Issues')) {
      currentSection = 'issues';
      continue;
    }
    
    if (currentSection === 'analysis' && line && !line.startsWith('##') && !line.startsWith('-')) {
      sections.analysis += line + ' ';
    } else if (currentSection === 'suggestions' && line.startsWith('-')) {
      const suggestion = line.replace(/^-\s*/, '').trim();
      if (suggestion) sections.suggestions.push(suggestion);
    } else if (currentSection === 'issues' && line.startsWith('-')) {
      const issue = line.replace(/^-\s*/, '').trim();
      if (issue) sections.issues.push(issue);
    }
  }
  
  sections.analysis = sections.analysis.trim();
  return sections;
}
app.get('/',(req,res)=>{
  res.json({message:"Hello World from render"})
})

app.post('/analyze-code', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-oss-20b:free',
      messages: [
        {
          role: "system",
          content: `You are a React/JSX code reviewer. 
      Return your response as a clear, user-friendly report with these exact sections:
      
      ## 🔹 Code Analysis
      - 1–2 bullet points summarizing what the code does.
      
      ## 🔹 Suggestions
      - 3–5 short, actionable improvement tips.
      
      ## 🔹 Errors / Issues
      - List any errors or issues.
      - If none, write: "No critical issues found ✅"
      
      Keep it concise, avoid self-references, and do not output JSON.`

        },
        {
          role: "user",
          content: `Analyze this React code:\n\n${code}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse markdown response and extract sections
    const sections = parseMarkdownResponse(content);
    
    res.json({
      analysis: sections.analysis || 'Analysis completed',
      suggestions: sections.suggestions || [],
      complexity: 'medium', // Add missing complexity field
      issues: sections.issues || [],
    });
  } catch (error) {
    console.error('AI Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze code' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
