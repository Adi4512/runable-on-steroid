import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function analyzeCodeWithAI(code: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-0528:free',
      messages: [
        {
          role: 'system',
          content: `You are an expert React/JSX code analyzer. Analyze the provided code and return a JSON response with the following structure:
{
  "analysis": "A brief overview of what the code does and its structure",
  "suggestions": ["Array of improvement suggestions"],
  "complexity": "low|medium|high",
  "issues": ["Array of potential problems or warnings"]
}

Focus on:
- Code structure and organization
- React best practices
- Performance considerations
- Accessibility issues
- Code maintainability
- Potential bugs or anti-patterns

Keep responses concise and actionable.`
        },
        {
          role: 'user',
          content: `Please analyze this React/JSX code:\n\n${code}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        analysis: parsed.analysis || 'Analysis completed',
        suggestions: parsed.suggestions || [],
        complexity: parsed.complexity || 'medium',
        issues: parsed.issues || [],
      };
    } catch {
      // Fallback if AI doesn't return valid JSON
      return {
        analysis: content,
        suggestions: [],
        complexity: 'medium',
        issues: [],
      };
    }
  } catch (error) {
    console.error('AI Analysis error:', error);
    throw new Error('Failed to analyze code with AI');
  }
}
