import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { X, FileText, Database, GitBranch } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ReactJson from 'react-json-view';
import mermaid from 'mermaid';

interface DocumentDrawerProps {
  open: boolean;
  onClose: () => void;
  type: 'markdown' | 'json' | 'mermaid';
  title: string;
  filePath: string;
}

const DocumentDrawer: React.FC<DocumentDrawerProps> = ({
  open,
  onClose,
  type,
  title,
  filePath,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && filePath) {
      loadFileContent();
    }
  }, [open, filePath]);

  useEffect(() => {
    if (type === 'mermaid' && content && mermaidRef.current) {
      // Add a small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        renderMermaid();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [content, type]);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        useMaxWidth: false,
        nodeSpacing: 50,
        rankSpacing: 80,
        padding: 20,
      },
      gantt: {
        useMaxWidth: false,
      },
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#333333',
        primaryBorderColor: '#d1d5db',
        lineColor: '#6b7280',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#f9fafb',
        fontSize: '14px',
      },
    });
  }, []);

  const loadFileContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
      const text = await response.text();
      setContent(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  const renderMermaid = async () => {
    if (!mermaidRef.current || !content) return;

    try {
      // Clear previous content and reset error
      mermaidRef.current.innerHTML = '';
      setError(null);

      // Add loading indicator
      mermaidRef.current.innerHTML =
        '<div style="text-align: center; padding: 20px; color: #6b7280;">Rendering diagram...</div>';

      // Create a unique ID for each render
      const id = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // Validate content first
      await mermaid.parse(content);

      const { svg } = await mermaid.render(id, content);

      // Clear and set the rendered SVG
      mermaidRef.current.innerHTML = svg;

      // Apply additional styling to the rendered SVG for better visibility
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.minWidth = '700px';
        svgElement.style.width = 'auto';
        svgElement.style.height = 'auto';
        svgElement.style.maxWidth = 'none';
        svgElement.style.fontSize = '16px';
      }

      console.log('Mermaid diagram rendered successfully');
    } catch (err) {
      console.error('Mermaid rendering error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to render diagram: ${errorMessage}`);

      // Show raw content as fallback
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = `
          <div style="padding: 16px;">
            <div style="color: #dc2626; font-weight: 500; margin-bottom: 12px;">
              Diagram rendering failed. Showing raw content:
            </div>
            <pre style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; font-size: 12px; line-height: 1.4; overflow-x: auto;">${content}</pre>
          </div>
        `;
      }
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'markdown':
        return <FileText size={20} color='#6b7280' />;
      case 'json':
        return <Database size={20} color='#6b7280' />;
      case 'mermaid':
        return <GitBranch size={20} color='#6b7280' />;
      default:
        return <FileText size={20} color='#6b7280' />;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      );
    }

    if (!content) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color='text.secondary'>No content available</Typography>
        </Box>
      );
    }

    switch (type) {
      case 'markdown':
        return (
          <Box sx={{ p: 3 }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <Typography variant='h4' gutterBottom>
                    {children}
                  </Typography>
                ),
                h2: ({ children }) => (
                  <Typography variant='h5' gutterBottom>
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography variant='h6' gutterBottom>
                    {children}
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography variant='body1' paragraph>
                    {children}
                  </Typography>
                ),
                code: ({ children }) => (
                  <Paper
                    component='code'
                    sx={{
                      p: 0.5,
                      backgroundColor: '#f5f5f5',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  >
                    {children}
                  </Paper>
                ),
                pre: ({ children }) => (
                  <Paper
                    component='pre'
                    sx={{
                      p: 2,
                      backgroundColor: '#f5f5f5',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      overflow: 'auto',
                      mb: 2,
                    }}
                  >
                    {children}
                  </Paper>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
        );

      case 'json':
        try {
          const jsonData = JSON.parse(content);
          return (
            <Box sx={{ p: 3 }}>
              <ReactJson
                src={jsonData}
                theme='rjv-default'
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={true}
                collapsed={2}
                name={false}
                style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              />
            </Box>
          );
        } catch (jsonError) {
          return (
            <Box sx={{ p: 3 }}>
              <Alert severity='error'>Invalid JSON format</Alert>
              <Paper
                sx={{
                  p: 2,
                  mt: 2,
                  backgroundColor: '#f8f9fa',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {content}
              </Paper>
            </Box>
          );
        }

      case 'mermaid':
        return (
          <Box sx={{ p: 3 }}>
            <Box
              ref={mermaidRef}
              sx={{
                textAlign: 'center',
                overflow: 'auto',
                minHeight: '400px',
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                backgroundColor: 'white',
                p: 3,
                '& svg': {
                  width: 'auto',
                  height: 'auto',
                  minWidth: '600px',
                  transform: 'scale(1)',
                  transformOrigin: 'center center',
                },
              }}
            />
            {error && (
              <Alert severity='warning' sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {!content && !loading && (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography color='text.secondary'>
                  Loading diagram...
                </Typography>
              </Box>
            )}
          </Box>
        );

      default:
        return (
          <Box sx={{ p: 3 }}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: '#f8f9fa',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {content}
            </Paper>
          </Box>
        );
    }
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1300,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 600, md: 800, lg: 1000 },
          maxWidth: '95vw',
          zIndex: 1300,
        },
        '& .MuiDrawer-root': {
          zIndex: 1300,
        },
        '& .MuiModal-root': {
          zIndex: 1300,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'white',
          }}
        >
          {getIcon()}
          <Typography variant='h6' sx={{ flex: 1, fontSize: '1.1rem' }}>
            {title}
          </Typography>
          <IconButton size='small' onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: '#fafbfc' }}>
          {renderContent()}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DocumentDrawer;
