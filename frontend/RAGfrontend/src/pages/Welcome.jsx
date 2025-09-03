// Update this page (the content is just a fallback if you fail to update the page)

export const Welcome = () => {
    return (
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-7xl mx-auto h-full flex gap-4">
            {/* Left Column */}
            <div className="w-80 flex flex-col gap-4">
              {/* Top Component */}
              <div className="h-32 bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-card-foreground mb-2">Component 1</h3>
                <p className="text-sm text-muted-foreground">Top left component</p>
              </div>
              
              {/* Bottom Component */}
              <div className="flex-1 bg-card border border-border rounded-lg p-4 min-h-96">
                <h3 className="font-medium text-card-foreground mb-2">Component 2</h3>
                <p className="text-sm text-muted-foreground">Bottom left component</p>
              </div>
            </div>
            
            {/* Right Large Component */}
            <div className="flex-1 bg-card border border-border rounded-lg flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-card-foreground">Main Component</h2>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 p-4">
                <p className="text-muted-foreground">Content area of the main component</p>
              </div>
              
              {/* Text Input Bar */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start typing..."
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  };
  
