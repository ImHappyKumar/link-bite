import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center py-12 px-6">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-primary mb-6">
          About{" "}
          <span>
            <span className="text-secondary">Link</span>
            <span className="text-accent">Bite</span>
          </span>
        </h2>

        {/* Introduction */}
        <p className="text-gray-700 text-lg leading-relaxed">
          LinkBite is a modern and reliable URL shortener that makes link
          sharing easy, efficient, and trackable. Whether you’re a marketer,
          business owner, or an individual user, LinkBite helps you create
          short, shareable links with real-time analytics.
        </p>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-secondary">
              🔗 Shorten Links
            </h3>
            <p className="text-gray-600 mt-2">
              Convert long, complex URLs into short, clean, and shareable links
              in seconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-secondary">
              📊 Track Clicks
            </h3>
            <p className="text-gray-600 mt-2">
              Get real-time analytics on how your links are performing,
              including clicks and user insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-secondary">
              🛡 Secure & Reliable
            </h3>
            <p className="text-gray-600 mt-2">
              Your links are safe with us. We use advanced security measures to
              prevent misuse.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-primary text-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold">
            Start Shortening Your Links Today!
          </h3>
          <p className="mt-2 text-lg">
            Create short, memorable URLs and track engagement effortlessly.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-3 bg-accent text-black font-semibold rounded-md shadow hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
