import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertCircle, Twitter } from 'lucide-react';

interface AIAnalysisProps {
  code: string;
}

interface AnalysisResult {
  analysis: string;
  suggestions: string[];
  complexity: 'low' | 'medium' | 'high';
  issues: string[];
}

const AIAnalysis = ({ code }: AIAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('No code provided for analysis');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const backendUrl =  import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/analyze-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to analyze code');
      }

      const result = await response.json();
      setAnalysis(result);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Removed auto-analysis - only analyze when button is clicked



  return (
    <section className="border-t border-border bg-card/70 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">AI Analysis</h3>
        </div>
        <Button
          onClick={analyzeCode}
          disabled={isAnalyzing || !code.trim()}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3" />
              Analyze Code
            </>
          )}
        </Button>
      </div>

      <div
        className="rounded-md bg-background/60 border border-border p-4 text-sm text-muted-foreground overflow-auto max-h-96"
        id="ai-analysis-content"
      >
        {error && (
          <div className="flex items-start gap-2 text-red-500 mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Analysis Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex items-center gap-2 text-accent">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI is analyzing your code...</span>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6 text-foreground">
                         <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
               <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                 <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                 Code Analysis
               </h4>
               <div className="text-sm text-blue-100 leading-relaxed space-y-2">
                 {analysis.analysis.split('\n').map((line, index) => (
                   <p key={index} className={line.trim() ? '' : 'h-2'}>
                     {line.trim() || '\u00A0'}
                   </p>
                 ))}
               </div>
             </div>

            {analysis.suggestions.length > 0 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Suggestions
                </h4>
                                 <ul className="space-y-3">
                   {analysis.suggestions.map((suggestion, index) => (
                     <li key={index} className="text-sm">
                       <div className="flex items-start gap-3">
                         <span className="text-green-400 mt-1 flex-shrink-0 text-lg">•</span>
                         <div className="text-green-100 leading-relaxed space-y-1">
                           {suggestion.split('\n').map((line, lineIndex) => (
                             <p key={lineIndex} className={line.trim() ? '' : 'h-1'}>
                               {line.trim() || '\u00A0'}
                             </p>
                           ))}
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
              </div>
            )}

            {analysis.issues.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Issues
                </h4>
                                 <ul className="space-y-3">
                   {analysis.issues.map((issue, index) => (
                     <li key={index} className="text-sm">
                       <div className="flex items-start gap-3">
                         <span className="text-red-400 mt-1 flex-shrink-0 text-lg">⚠</span>
                         <div className="text-red-100 leading-relaxed space-y-1">
                           {issue.split('\n').map((line, lineIndex) => (
                             <p key={lineIndex} className={line.trim() ? '' : 'h-1'}>
                               {line.trim() || '\u00A0'}
                             </p>
                           ))}
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
              </div>
            )}
          </div>
        )}

        {!analysis && !isAnalyzing && !error && (
          <div className="space-y-2">
            <p className="text-foreground/80">Ready to analyze your code</p>
            <p className="text-xs">
              Click the "Analyze Code" button above to get AI-powered insights on your React/JSX code structure, 
              best practices, and potential improvements.
            </p>
          </div>
        )}
      </div>
      
      {/* Free AI Model Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-yellow-500 text-sm">ℹ</span>
          <div className="text-xs text-yellow-100 space-y-1">
            <p className="font-medium">Using Free AI Models</p>
                         <p>
               We're using free AI models to analyze your code. Sometimes they may throw errors, 
               not respond, or hit rate limits. Due to rate limits, very long codes might not be processed. 
               If you encounter issues, please try again. The main server might be slow or experiencing high traffic.
             </p>
             <p className="flex items-center gap-2 mt-2">
               <span>If the issue persists, please contact me at</span>
               <a 
                 href="https://x.com/adisha_10" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-yellow-300 hover:text-yellow-200 transition-colors"
               >
                 <Twitter className="w-3 h-3" />
                 <span>@adisha_10</span>
               </a>
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAnalysis;
