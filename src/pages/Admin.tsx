import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ADMIN_LOGIN_KEY = 'adminLoggedIn';

const Admin = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(ADMIN_LOGIN_KEY) === 'true') {
      navigate('/admin/panel');
    }
  }, [navigate]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setAdminUsername("");
      setAdminPassword("");
      localStorage.setItem(ADMIN_LOGIN_KEY, 'true');
      navigate('/admin/panel');
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center py-8 relative"
      style={{
        backgroundImage: "url('/DeWatermark.ai_1752809220809.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="w-full max-w-xl">
        <form onSubmit={handleAdminLogin} className="max-w-md mx-auto space-y-4 p-6 bg-card rounded-lg border">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <Input
              type="text"
              value={adminUsername}
              onChange={e => setAdminUsername(e.target.value)}
              placeholder="Enter admin username"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <Input
              type="password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          <Button type="submit" className="w-full" variant="medical">Login as Admin</Button>
        </form>
      </div>
    </div>
  );
};

export default Admin; 