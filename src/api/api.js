import {
  db,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion,
} from "../firebase";
import { nanoid } from "nanoid";

// Function to generate a unique short code
const generateShortCode = () => nanoid(6);

// Shorten a URL & Save in Firestore
export const shortenUrl = async (longUrl) => {
  try {
    if (!longUrl) return { error: "URL is required!" };

    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}/${shortCode}`;

    await setDoc(doc(db, "short_urls", shortCode), {
      long_url: longUrl,
      short_url: shortUrl,
      created_at: new Date().toISOString(),
      clicks: 0,
    });

    return { shortUrl };
  } catch (error) {
    console.error("Error shortening URL:", error);
    return { error: "Something went wrong!" };
  }
};

// Fetch URL Analytics
export const getAnalytics = async (shortCode) => {
  try {
    if (!shortCode) return { error: "Short code is required!" };

    const analyticsRef = doc(db, "url_stats", shortCode);
    const analyticsSnap = await getDoc(analyticsRef);

    if (!analyticsSnap.exists()) {
      return { error: "No analytics found!" };
    }

    return analyticsSnap.data();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { error: "Failed to fetch analytics!" };
  }
};

// Redirect & Track Clicks in Firestore
export const redirectAndTrack = async (shortCode) => {
  try {
    if (!shortCode) return { error: "Invalid short code!" };

    const docRef = doc(db, "short_urls", shortCode);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { error: "URL not found!" };

    const data = docSnap.data();

    // Device & Referrer Detection (runs after redirection)
    const userAgent = navigator.userAgent.toLowerCase();
    const referrer = document.referrer || "direct";
    const deviceType = /mobile|android|iphone/.test(userAgent)
      ? "mobile"
      : "desktop";
    const timestamp = new Date().toISOString();

    // Firestore Updates (Runs Asynchronously)
    const analyticsRef = doc(db, "url_stats", shortCode);
    const shortUrlRef = doc(db, "short_urls", shortCode);

    await Promise.all([
      // Update Analytics in `url_stats`
      setDoc(
        analyticsRef,
        {
          clicks: increment(1),
          referrer: { [referrer]: increment(1) },
          device_info: { [deviceType]: increment(1) },
          timestamps: arrayUnion(timestamp),
        },
        { merge: true }
      ),

      // Update Clicks Count in `short_urls`
      updateDoc(shortUrlRef, {
        clicks: increment(1),
      }),
    ]).catch((error) => console.error("Error updating analytics:", error));

    window.location.href = data.long_url;
  } catch (error) {
    console.error("Error in redirecting:", error);
    return { error: "Failed to redirect!" };
  }
};
