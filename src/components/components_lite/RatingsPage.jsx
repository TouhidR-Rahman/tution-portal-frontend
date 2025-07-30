import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2 } from "lucide-react";
import StarRating from "../ui/StarRating";
import RatingModal from "./RatingModal";
import { toast } from "sonner";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://tution-portal-backend.vercel.app";

const RatingsPage = () => {
  const { user } = useSelector((store) => store.auth);
  const [rateableCenters, setRateableCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState({ open: false, center: null });

  useEffect(() => {
    fetchRateableCenters();
  }, []);

  const fetchRateableCenters = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/rating/rateable`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setRateableCenters(response.data.tutionCenters);
      }
    } catch {
      toast.error("Failed to fetch tuition centers");
    } finally {
      setLoading(false);
    }
  };

  const handleRateCenter = (center) => {
    setRatingModal({ open: true, center });
  };

  const handleRatingSubmitted = () => {
    fetchRateableCenters(); // Refresh the list
  };

  if (user?.role !== "Tutor") {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto my-10 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600">
              Only tutors can rate tuition centers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Rate Tuition Centers
          </h1>
          <p className="text-gray-600">
            Rate the tuition centers where you have worked as an accepted tutor
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : rateableCenters.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tuition centers to rate
            </h3>
            <p className="text-gray-600">
              You need to have accepted applications at tuition centers to rate
              them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rateableCenters.map((center) => (
              <Card
                key={center._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {center.logo ? (
                      <img
                        src={center.logo}
                        alt={center.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <p className="text-sm text-gray-600">{center.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Rating:</span>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={center.averageRating} />
                      <span className="text-sm text-gray-600">
                        ({center.totalRatings} reviews)
                      </span>
                    </div>
                  </div>

                  {center.hasRated && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Your Rating:</span>
                      <StarRating rating={center.userRating} />
                    </div>
                  )}

                  <Button
                    onClick={() => handleRateCenter(center)}
                    className="w-full"
                    variant={center.hasRated ? "outline" : "default"}
                  >
                    {center.hasRated ? "Update Rating" : "Rate Center"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <RatingModal
          open={ratingModal.open}
          setOpen={(open) => setRatingModal({ ...ratingModal, open })}
          tutionCenter={ratingModal.center}
          onRatingSubmitted={handleRatingSubmitted}
        />
      </div>
    </div>
  );
};

export default RatingsPage;
