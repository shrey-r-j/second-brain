import SharedCard from "./SharedCard";

interface SharedFeedProps {
  content: {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document";
  }[];
}

export default function SharedFeed({ content }: SharedFeedProps) {
  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
        <p className="text-gray-500">This shared brain doesn't contain any content yet.</p>
      </div>
    );
  }

  // Group content by type for better organization
  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof content>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'document':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'youtube':
        return 'YouTube Videos';
      case 'twitter':
        return 'Twitter Posts';
      case 'document':
        return 'Documents';
      default:
        return 'Other Content';
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedContent).map(([type, items]) => (
        <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {getTypeIcon(type)}
              <h3 className="text-lg font-semibold text-gray-900">
                {getTypeLabel(type)}
              </h3>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(({ _id, title, link, type }) => (
                <div key={_id} className="transform transition-transform duration-200 hover:scale-105">
                  <SharedCard 
                    title={title} 
                    link={link} 
                    type={type} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Collection Summary
            </h4>
            <p className="text-gray-600">
              Total of {content.length} curated {content.length === 1 ? 'item' : 'items'} across {Object.keys(groupedContent).length} {Object.keys(groupedContent).length === 1 ? 'category' : 'categories'}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {Object.entries(groupedContent).map(([type, items]) => (
              <div key={type} className="flex items-center space-x-1">
                {getTypeIcon(type)}
                <span>{items.length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}