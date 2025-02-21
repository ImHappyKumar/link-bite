import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { redirectAndTrack } from "../api/api";

const Redirect = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const hasExecuted = useRef(false); // Prevent double execution

  useEffect(() => {
    if (hasExecuted.current) return; // Prevent duplicate runs
    hasExecuted.current = true;

    (async () => {
      try {
        await redirectAndTrack(shortCode);
      } catch (error) {
        console.error("Error redirecting:", error);
        navigate("/");
      }
    })();
  }, [shortCode, navigate]);

  return <p>Redirecting...</p>;
};

export default Redirect;
