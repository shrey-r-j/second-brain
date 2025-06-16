import Button from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Share } from "../icons/ShareIcon";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";

function NavBar({ onAddContentClick }) {
  const handleShare = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      
      const res = await axios.post(`${BACKEND_URL}/brain/v1/share`, {
        share: "true"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Copy to clipboard instead of alert
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(res.data.link);
        toast.success("Share link copied to clipboard!");
      } else {
        alert(res.data.link);
      }
    } catch (err) {
      toast.error("Failed to generate share link");
      console.error("Share error:", err);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      {/* Left side - Title with responsive padding */}
      <div className="flex items-center">
        <h2 className="text-lg font-medium text-gray-900">All Notes</h2>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center space-x-3">
        <Button
          startIcon={<Share size="lg" />}
          variant="primary"
          size="md"
          text="Share Brain"
          onClick={handleShare}
        />
        <Button
          startIcon={<PlusIcon size="lg" />}
          variant="secondary"
          size="md"
          text="Add Content"
          onClick={onAddContentClick}
        />
      </div>
    </div>
  );
}

export default NavBar;