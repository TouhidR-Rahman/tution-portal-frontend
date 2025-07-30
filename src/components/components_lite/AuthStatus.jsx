import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "@/utils/auth";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";

const AuthStatus = () => {
  const { user } = useSelector((store) => store.auth);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!auth.getToken());
  }, []);

  if (!user && !hasToken) {
    return (
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You need to be logged in to access this content.
          </p>
          <div className="space-x-2">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
            <Link to="/auth-debug">
              <Button variant="secondary">Debug Auth</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hasToken && !user) {
    return (
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Loading User Data...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Token found, loading user information...</p>
          <Link to="/auth-debug">
            <Button variant="secondary">Debug Auth</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return null; // User is properly authenticated
};

export default AuthStatus;
