import React, { useState } from "react";
import { Search } from "lucide-react";

import PointNetPage from "../pages/pointNet";
import IntroductionToComputerVision from "../pages/indtroductionToComputerVision";
import UNetOverview from "../pages/unet";
import TrackingPaperPage from "../pages/tracktor";

const BodySection = () => {
  const pageComponents = {
    1: IntroductionToComputerVision,
    2: PointNetPage,
    3: UNetOverview,
    4: TrackingPaperPage,
    // Add more page components here
  };

  // Sample note pages data - you can replace this with your actual data
  const [notePages] = useState([
    {
      id: 1,
      title: "Introduction to Computer Vision",
    },
    {
      id: 2,
      title: "PointNet",
    },
    {
      id: 3,
      title: "U-Net",
    },
    {
      id: 4,
      title: "Tracking without betts and whistles",
    },
    {
      id: 5,
      title: "Image Segmentation Techniques",
    },
  ]);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  // Filter notes based on search term
  const filteredNotes = notePages.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle note selection
  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const getSelectedPageComponent = () => {
    if (!selectedNote) return null;

    const PageComponent = pageComponents[selectedNote.id];
    return PageComponent ? <PageComponent /> : null;
  };

  return (
    <div className="flex h-screen">
      {/* Left Component - Notes List */}
      <div className="w-1/5 bg-emerald-950 border-r border-emerald-950 flex flex-col">
        {/* Search Box */}
        <div className=" m-2 rounded-lg border-b border-emerald-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 w-4 h-4" />
            <input
              type="text"
              placeholder="Search note pages..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Notes List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteSelect(note)}
                className={`p-4 border-b border-emerald-800 rounded-lg m-2 cursor-pointer transition-colors
                ${
                  selectedNote?.id === note.id
                    ? "bg-emerald-400 text-emerald-950"
                    : "bg-emerald-900 text-emerald-200 hover:bg-emerald-200 hover:text-emerald-950"
                }
                `}
              >
                <h3 className="font-semibold text-md leading-tight">
                  {note.title}
                </h3>
              </div>
            ))
          ) : (
            <div className="p-4 text-emerald-100 text-center">
              No notes found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Right Component - Main Viewing Area */}
      <div className="flex-1 bg-emerald-100 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {selectedNote ? (
            <div>
              <h1 className="text-3xl font-bold text-emarald-800 mb-6">
                {selectedNote.title}
              </h1>
              <div className="bg-emerald-300 rounded-lg shadow-sm p-6 border border-green-200">
                {getSelectedPageComponent() || (
                  <div className="text-emerald-600 text-center p-8">
                    <p>
                      Content for "{selectedNote.title}" is not available yet.
                    </p>
                    <p className="text-sm mt-2">
                      This page component needs to be created.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-green-600">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome to Computer Vision Hub
                </h2>
                <p>Select a note from the left panel to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodySection;
