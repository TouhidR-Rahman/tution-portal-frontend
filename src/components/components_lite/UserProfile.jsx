import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/${id}`, {
          withCredentials: true,
        });
        console.log("UserProfile API response:", res.data);
        setUser(res.data.user || res.data);
      } catch {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex items-center gap-5">
          <Avatar className="cursor-pointer h-24 w-24">
            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>{user?.profile?.bio}</p>
            <div className="flex items-center gap-1 mt-2">
              {Array.isArray(user?.profile?.skills) &&
              user.profile.skills.length > 0 ? (
                user.profile.skills.map((item, idx) => (
                  <Badge key={idx}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
        <div className="my-5">
          <div>
            Email: <a href={`mailto:${user?.email}`}>{user?.email}</a>
          </div>
          <div>
            Phone: <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
          </div>
          <div>
            Resume:{" "}
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600">
                Download
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
