import { useState } from "react";
import { getAnalytics } from "../api/api";
import Layout from "../layouts/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const [shortCode, setShortCode] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  const fetchAnalytics = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before fetching
    setAnalytics(null); // Reset previous data

    const data = await getAnalytics(shortCode);
    if (data.error) {
      setError(data.error || "Something went wrong!");
    } else {
      setAnalytics(data);
    }
  };

  // Chart Colors
  const COLORS = ["#2563eb", "#1e40af", "#facc15", "#ef4444"];

  // Process Data for Graphs
  const clicksOverTime =
    analytics?.timestamps?.map((timestamp, index) => ({
      name: `Click ${index + 1}`,
      clicks: 1, // Each timestamp represents a click
    })) || [];

  const referrerData = analytics?.referrer
    ? Object.entries(analytics.referrer).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  const deviceData = analytics?.device_info
    ? Object.entries(analytics.device_info).map(([key, value]) => ({
        name: key,
        value,
      }))
    : [];

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-6">
            URL Analytics
          </h2>
          <p className="text-lg text-gray-600">
            Enter a short code below to view detailed analytics.
          </p>
        </div>

        {/* Form Section */}
        <form
          className="mt-8 mx-auto w-full max-w-lg bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row gap-4"
          onSubmit={fetchAnalytics}
        >
          <div className="w-full">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter short code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
            />
          </div>

          <button className="w-full sm:w-3/4 px-4 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition duration-300 shadow-md">
            Get Analytics
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {/* Analytics Data */}
        {analytics && (
          <div className="mt-10 mx-auto w-full max-w-3xl">
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Clicks
                </h3>
                <p className="text-2xl font-bold text-primary capitalize">
                  {analytics.clicks || "N/A"}
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Top Referrer
                </h3>
                <p className="text-xl font-bold text-secondary capitalize">
                  {Object.keys(analytics.referrer || {})[0] || "N/A"}
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Top Device
                </h3>
                <p className="text-xl font-bold text-accent capitalize">
                  {Object.keys(analytics.device_info || {})[0] || "N/A"}
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Geo Location
                </h3>
                <p className="text-xl font-bold text-red-500 capitalize">
                  {Object.keys(analytics.geo_location || {})[0] || "Unknown"}
                </p>
              </div>
            </div>

            {/* Clicks Over Time Graph */}
            {clicksOverTime.length > 0 && (
              <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
                <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                  Clicks Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clicksOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Referrer & Device Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {/* Referrer Chart */}
              {referrerData.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Traffic Sources
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={referrerData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#2563eb"
                        label
                      >
                        {referrerData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Device Info Chart */}
              {deviceData.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Device Usage
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#1e40af"
                        label
                      >
                        {deviceData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
