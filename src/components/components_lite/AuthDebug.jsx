import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { auth } from "@/utils/auth";
import { cookieUtils } from "@/utils/cookies";
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
        cookieToken: cookieUtils.getTokenFromCookies(),
        allCookies: document.cookie,
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.success("Authentication test successful!");
    } catch (error) {
      setDebugInfo({
        success: false,
        error: error.response?.data || error.message,
        token: auth.getToken(),
        cookieToken: cookieUtils.getTokenFromCookies(),
        allCookies: document.cookie,
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.error("Authentication test failed!");
    } finally {
      setLoading(false);
    }
  };

  const testTutionCenters = async () => {
    setLoading(true);
    try {
      // Test the specific endpoint that's failing
      const response = await apiClient.get("/api/tution-center/get");
      setDebugInfo({
        success: true,
        endpoint: "tution-center/get",
        data: response.data,
        token: auth.getToken(),
        cookieToken: cookieUtils.getTokenFromCookies(),
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.success("Tution Centers API test successful!");
    } catch (error) {
      setDebugInfo({
        success: false,
        endpoint: "tution-center/get",
        error: error.response?.data || error.message,
        status: error.response?.status,
        token: auth.getToken(),
        cookieToken: cookieUtils.getTokenFromCookies(),
        isAuthenticated: auth.isAuthenticated(),
      });
      toast.error("Tution Centers API test failed!");
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
          <div className="flex gap-2">
            <Button onClick={testAuth} disabled={loading}>
              {loading ? "Testing..." : "Test Debug Auth"}
            </Button>
            <Button
              onClick={testTutionCenters}
              disabled={loading}
              variant="outline"
            >
              {loading ? "Testing..." : "Test Tution Centers"}
            </Button>
          </div>

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
              <strong>Storage Token:</strong>{" "}
              {auth.getToken() || "No token found"}
            </p>
            <p>
              <strong>Cookie Token:</strong>{" "}
              {cookieUtils.getTokenFromCookies() || "No cookie token found"}
            </p>
            <p>
              <strong>All Cookies:</strong> {document.cookie || "No cookies"}
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
