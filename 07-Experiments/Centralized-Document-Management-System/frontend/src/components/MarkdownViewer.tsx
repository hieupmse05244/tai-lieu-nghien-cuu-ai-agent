'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
});

interface MarkdownViewerProps {
  content: string;
}

const MermaidChart = ({ chart }: { chart: string }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [chart]);

  return <div className="mermaid bg-black/30 p-4 rounded-lg my-4">{chart}</div>;
};

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none prose-pre:bg-gray-800 prose-pre:p-0">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-mermaid/.exec(className || '');
            if (match) {
              return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
