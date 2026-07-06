"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaSearch,
  FaStar,
  FaArrowRight,
  FaDownload,
  FaFilter,
  FaTimes,
  FaMagic,
} from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { APP_CATEGORIES } from "@/lib/apps/appRegistry";

const CATEGORIES = Object.values(APP_CATEGORIES);

export default function AppStore() {
  const { data: session } = useSession();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchApps();
  }, [searchQuery, selectedCategory]);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory) params.append("category", selectedCategory);

      const { data } = await axios.get(`/api/apps?${params.toString()}`);
      setApps(data.data);
    } catch (error) {
      console.error("Error fetching apps:", error);
      toast.error("Failed to load apps");
    } finally {
      setLoading(false);
    }
  };

  const handleInstallApp = (app) => {
    if (!session) {
      toast.error("Please sign in to install apps");
      return;
    }
    toast.success(`${app.name} installed successfully!`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-page text-primary-text">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto scrollbar-subtle">
        {/* Header */}
        <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-divider/30">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black">App Store</h1>
              <p className="text-secondary-text">
                Discover and install premium AI apps
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-card border border-divider rounded-lg py-3 pl-12 pr-4 text-primary-text placeholder-secondary-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
              <div className="space-y-6">
                <div className="flex items-center justify-between lg:block">
                  <h2 className="font-bold text-lg">Categories</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-secondary-text hover:text-primary-text"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      !selectedCategory
                        ? "bg-primary text-white"
                        : "text-primary-text hover:bg-bg-card"
                    }`}
                  >
                    All Apps
                  </button>

                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory === category.slug
                          ? "bg-primary text-white"
                          : "text-primary-text hover:bg-bg-card"
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apps Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-bg-card border border-divider rounded-lg hover:border-primary transition-colors"
              >
                <FaFilter size={16} />
                Filters
              </button>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-bg-card border border-divider rounded-lg p-4 animate-pulse"
                    >
                      <div className="aspect-square bg-bg-page rounded mb-4" />
                      <div className="h-4 bg-bg-page rounded mb-2" />
                      <div className="h-3 bg-bg-page rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : apps.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <FaMagic className="mx-auto text-4xl text-secondary-text" />
                  <p className="text-secondary-text">No apps found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-bg-card border border-divider rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
                    >
                      {/* App Icon/Banner */}
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                        {app.icon}
                      </div>

                      {/* App Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-bold text-lg text-primary-text line-clamp-1">
                            {app.name}
                          </h3>
                          <p className="text-xs text-secondary-text">
                            {app.category?.name}
                          </p>
                        </div>

                        <p className="text-sm text-secondary-text line-clamp-2">
                          {app.description}
                        </p>

                        {/* Rating and Downloads */}
                        <div className="flex items-center justify-between text-xs text-secondary-text">
                          <div className="flex items-center gap-1">
                            <FaStar size={12} className="text-primary" />
                            <span>{app.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaDownload size={12} />
                            <span>{app.downloads.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Credit Cost */}
                        <div className="text-xs font-bold text-primary">
                          {app.creditCost} credit{app.creditCost > 1 ? "s" : ""} per use
                        </div>

                        {/* Install Button */}
                        <button
                          onClick={() => handleInstallApp(app)}
                          className="w-full py-2 px-3 bg-primary hover:bg-primary-hover text-white font-bold rounded transition-all text-sm active:scale-95"
                        >
                          Install
                        </button>

                        {/* View Details Link */}
                        <Link
                          href={`/app/${app.slug}`}
                          className="flex items-center justify-center gap-2 text-primary hover:text-primary-hover text-xs font-semibold"
                        >
                          View Details
                          <FaArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
