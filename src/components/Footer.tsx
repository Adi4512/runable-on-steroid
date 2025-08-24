import React from 'react'


const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/80 backdrop-blur-xl glass-panel">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Crafted by</span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://adisharma.dev"
            className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:underline transition"
          >
            Aditya Sharma
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden md:inline">© {new Date().getFullYear()} Runable on Steroids. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer