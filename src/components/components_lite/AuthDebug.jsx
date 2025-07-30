import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { auth } from "@/utils/auth";
import apiClient from "@/utils/axios";
import { toast } from "sonner";

const AuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAuth = async () => {
    setLoading(true);
    try {
      // Test authentication with your backend
      const response = await apiClient.get("/api/debug/auth");
      setDebugInfo({
        success: true,
        data: response.data,
        token: auth.getToken(),
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.success("Authentication test successful!");
    } catch (error) {
      setDebugInfo({
        success: false,
        error: error.response?.data || error.message,
        token: auth.getToken(),
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.error("Authentication test failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testAuth} disabled={loading}>
            {loading ? "Testing..." : "Test Authentication"}
          </Button>

          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">Debug Results:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p>
              <strong>Current Token:</strong>{" "}
              {auth.getToken() || "No token found"}
            </p>
            <p>
              <strong>Is Authenticated:</strong>{" "}
              {auth.isAuthenticated() ? "Yes" : "No"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDebug;
