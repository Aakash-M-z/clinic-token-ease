import { useQueue } from "../QueueContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminActivity = () => {
  const { currentNumber, tokens } = useQueue();
  const navigate = useNavigate();

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem('adminLoggedIn');
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8"
      style={{
        backgroundImage: "url('/DeWatermark.ai_1752809220809.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/80 -z-10" />
      <div className="w-full max-w-xl">
        <Button
          className="mb-6 mt-2 p-6 bg-card/50 backdrop-blur-sm rounded-xl border-2 border-primary/20 text-black"
          onClick={() => navigate('/admin')}
        >
          ← Back
        </Button>
        <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border-2 border-primary/20">
          <div className="font-semibold text-lg mb-4">Patient Activity</div>
          {tokens.filter(token => token.tokenNumber < currentNumber).length === 0 ? (
            <div className="text-center py-8 text-black flex-1 flex items-center justify-center">
              No patients have visited yet
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto flex-1">
              {tokens.filter(token => token.tokenNumber < currentNumber).map((token) => (
                <div 
                  key={token.tokenNumber} 
                  className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold bg-primary/10 text-primary">#{token.tokenNumber}</div>
                    <div>
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-muted-foreground">{token.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-accent text-white text-xs px-2 py-1 rounded">Visited</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(token.bookedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminActivity; 