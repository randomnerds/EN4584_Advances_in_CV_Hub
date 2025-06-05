import React, { useState } from "react";

const ResearchPaperFormatter = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [authorName, setAuthorName] = useState("");

  // Helper function to render images
  const renderImage = (src, alt = "") => (
    <div className="my-4 flex justify-center">
      <img src={src} alt={alt} className="rounded-md border border-green-300" />
    </div>
  );

  // Helper function to render aside/note boxes
  const renderAside = (children) => (
    <div className="flex items-start space-x-3 bg-green-100 p-2 border-l-4 border-green-400 rounded-md">
      <div className="text-xl">💡</div>
      <div className="text-md">{children}</div>
    </div>
  );

  // Function to parse markdown and convert to styled format
  const parseMarkdown = (markdown) => {
    if (!markdown.trim()) return null;

    const lines = markdown.split("\n");
    const elements = [];
    let currentSection = null;
    let currentList = [];
    let sectionCounter = 1;

    const flushCurrentList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-1"
          >
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCurrentSection = () => {
      if (currentSection) {
        flushCurrentList();
        if (currentSection.content.length > 0) {
          elements.push(
            <div
              key={`section-${elements.length}`}
              className="bg-green-100 p-4 rounded-lg border-l-4 border-green-400"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {sectionCounter}. {currentSection.title}
              </h2>
              <div className="space-y-2">{currentSection.content}</div>
            </div>
          );
          sectionCounter++;
        }
        currentSection = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      // Handle main headings (# Header)
      if (line.startsWith("# ") && !line.startsWith("## ")) {
        flushCurrentSection();
        const title = line.substring(2).trim();
        currentSection = { title, content: [] };
      }
      // Handle subheadings (## Subheader)
      else if (line.startsWith("## ")) {
        flushCurrentList();
        const subtitle = line.substring(3).trim();
        if (currentSection) {
          currentSection.content.push(
            <h3
              key={`subtitle-${i}`}
              className="text-lg font-semibold text-green-700 mt-4 mb-2"
            >
              {subtitle}
            </h3>
          );
        }
      }
      // Handle list items (- item or * item)
      else if (line.startsWith("- ") || line.startsWith("* ")) {
        const listItem = line.substring(2).trim();
        const formattedItem = listItem
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/`(.*?)`/g, "<code>$1</code>");
        currentList.push(formattedItem);
      }
      // Handle images ![alt](src)
      else if (line.includes("![") && line.includes("](")) {
        flushCurrentList();
        const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          const element = renderImage(imageMatch[2], imageMatch[1]);
          if (currentSection) {
            currentSection.content.push(<div key={`img-${i}`}>{element}</div>);
          } else {
            elements.push(<div key={`img-${elements.length}`}>{element}</div>);
          }
        }
      }
      // Handle blockquotes (> text) as aside boxes
      else if (line.startsWith("> ")) {
        flushCurrentList();
        const quoteText = line
          .substring(2)
          .trim()
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>");
        const element = renderAside(
          <div dangerouslySetInnerHTML={{ __html: quoteText }} />
        );
        if (currentSection) {
          currentSection.content.push(<div key={`aside-${i}`}>{element}</div>);
        } else {
          elements.push(<div key={`aside-${elements.length}`}>{element}</div>);
        }
      }
      // Handle regular paragraphs
      else if (line.length > 0) {
        flushCurrentList();
        const formattedText = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/`(.*?)`/g, "<code>$1</code>");

        if (currentSection) {
          currentSection.content.push(
            <p
              key={`p-${i}`}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          );
        } else {
          elements.push(
            <p
              key={`p-${elements.length}`}
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          );
        }
      }
    }

    // Flush any remaining content
    flushCurrentSection();
    flushCurrentList();

    return elements;
  };

  const formattedContent = parseMarkdown(markdownInput);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Research Paper Formatter
          </h1>
          <p className="text-gray-600 mb-4">
            Convert your markdown research paper content into a styled reference
            format. The formatter will automatically structure your content with
            proper headings, lists, and highlighting while maintaining the same
            visual style as your PointNet reference.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name (optional)
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter author name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Markdown Content
              </label>
              <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                placeholder="Paste your markdown content here..."
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {formattedContent && formattedContent.length > 0 && (
          <div className="text-green-950 bg-green-200 leading-relaxed space-y-6 p-4 rounded-lg">
            {authorName && (
              <p className="text-md text-right italic">
                Prepared by: {authorName}
              </p>
            )}
            {formattedContent}
          </div>
        )}

        {markdownInput &&
          (!formattedContent || formattedContent.length === 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                No content to display. Make sure your markdown follows the
                supported format:
              </p>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                <li>Use # for main headings</li>
                <li>Use ## for subheadings</li>
                <li>Use - or * for list items</li>
                <li>Use **text** for bold, *text* for italic</li>
                <li>Use `code` for inline code</li>
                <li>Use for highlighted notes/asides</li>
                <li>Use ![alt](url) for images</li>
              </ul>
            </div>
          )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            How to Use:
          </h3>
          <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
            <li>Enter the author name (optional) in the first field</li>
            <li>Paste your markdown research paper content in the textarea</li>
            <li>
              The formatter will automatically convert it to the styled format
            </li>
            <li>
              Main headings (#) become numbered sections with green backgrounds
            </li>
            <li>Subheadings (##) become subsection titles</li>
            <li>Lists (- or *) are formatted with proper spacing</li>
            <li>
              Blockquotes () become highlighted note boxes with lightbulb icons
            </li>
            <li>
              Bold (**text**), italic (*text*), and code (`text`) formatting is
              preserved
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperFormatter;
