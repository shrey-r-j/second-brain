import Card from "./Card"
import { useContent } from "../hooks/useContent"
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Feed() {
  const {content, setContent} = useContent();

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local state to remove deleted content
      setContent(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting content", err);
    }
  };

  if (content.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
          <p className="text-gray-500">Start by adding your first piece of content to your brain.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Brain</h1>
        <p className="text-gray-600">{content.length} {content.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {content.map(({_id, link, title, type}) => (
          <div key={_id} className="transform transition-all duration-200 hover:scale-105">
            <Card 
              id={_id} 
              title={title} 
              link={link} 
              type={type} 
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}