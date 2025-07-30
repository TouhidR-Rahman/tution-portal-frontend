import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import StarRating from "../ui/StarRating";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://tution-portal-backend.vercel.app";

const RatingModal = ({ open, setOpen, tutionCenter, onRatingSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/rating/submit/${tutionCenter._id}`,
        { rating, comment },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Rating submitted successfully!");
        setOpen(false);
        setRating(0);
        setComment("");
        if (onRatingSubmitted) {
          onRatingSubmitted();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate {tutionCenter?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              interactive={true}
              size="w-8 h-8"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience working with this tuition center..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-sm text-gray-500">{comment.length}/500</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || rating === 0}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Rating
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

RatingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  tutionCenter: PropTypes.object,
  onRatingSubmitted: PropTypes.func,
};

export default RatingModal;
