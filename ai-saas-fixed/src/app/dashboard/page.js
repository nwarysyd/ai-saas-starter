"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaPlus,
  FaArrowRight,
  FaStar,
  FaDownload,
  FaStore,
  FaTh,
  FaList,
  FaDownload as FaDownloadIcon,
  FaMagic,
  FaClock,
  FaEye,
} from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [featuredApps, setFeaturedApps] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchInstalledApps();
      fetchFeaturedApps();
    }
  }, [status, router]);

  const fetchInstalledApps = async () => {
    try {
      const { data } = await axios.get("/api/installed-apps");
      setInstalledApps(data.data || []);
    } catch (error) {
      console.error("Error fetching installed apps:", error);
      toast.error("Failed to load apps");
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedApps = async () => {
    try {
      const { data } = await axios.get("/api/apps?featured=true&limit=6");
      setFeaturedApps(data.data || []);
    } catch (error) {
      console.error("Error fetching featured apps:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen flex-col bg-bg-page text-primary-text">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <FaMagic className="mx-auto text-5xl text-primary animate-spin" />
            <p className="text-secondary-text">Loading your dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-page text-primary-text">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto scrollbar-subtle">
        {/* Header */}
        <div className="w-full border-b border-divider/30 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black">Dashboard</h1>
                <p className="text-secondary-text mt-2">
                  Welcome back, {session?.user?.name || "Creator"}
                </p>
              </div>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition-all shadow-lg shadow-primary/30 active:scale-95"
              >
                <FaStore size={18} />
                Browse Store
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Installed Apps", value: installedApps.length, icon: FaMagic },
              { label: "Credits", value: session?.user?.credits || 0, icon: FaStar },
              { label: "Recent Activity", value: "Today", icon: FaClock },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-bg-card border border-divider/50 rounded-lg p-6 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-secondary-text text-sm font-semibold">{stat.label}</p>
                      <p className="text-3xl font-black mt-2">{stat.value}</p>
                    </div>
                    <Icon className="text-primary text-2xl opacity-50" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Installed Apps Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Your Apps</h2>
                <p className="text-secondary-text text-sm mt-1">
                  {installedApps.length} app{installedApps.length !== 1 ? "s" : ""} installed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "bg-bg-card text-primary-text hover:bg-bg-card/80"
                  }`}
                >
                  <FaTh size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-bg-card text-primary-text hover:bg-bg-card/80"
                  }`}
                >
                  <FaList size={18} />
                </button>
              </div>
            </div>

            {installedApps.length === 0 ? (
              <div className="bg-bg-card border-2 border-dashed border-divider rounded-lg p-12 text-center space-y-4">
                <FaPlus className="mx-auto text-4xl text-secondary-text" />
                <div>
                  <h3 className="font-bold text-lg mb-2">No apps installed yet</h3>
                  <p className="text-secondary-text mb-6">
                    Browse our store and install your first app to get started
                  </p>
                  <Link
                    href="/store"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition-all"
                  >
                    <FaStore size={18} />
                    Go to Store
                  </Link>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {installedApps.map((installed) => (
                  <Link
                    key={installed.id}
                    href={`/app/${installed.app.slug}`}
                    className="group bg-bg-card border border-divider rounded-lg overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                      {installed.app.icon}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg">{installed.app.name}</h3>
                        <p className="text-xs text-secondary-text">{installed.app?.category?.name || "AI App"}</p>
                      </div>
                      <p className="text-sm text-secondary-text line-clamp-2">
                        {installed.app.description}
                      </p>
                      <button className="w-full py-2 px-3 bg-primary hover:bg-primary-hover text-white font-bold rounded transition-all text-sm active:scale-95">
                        Open App
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {installedApps.map((installed) => (
                  <Link
                    key={installed.id}
                    href={`/app/${installed.app.slug}`}
                    className="block bg-bg-card border border-divider rounded-lg p-4 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{installed.app.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{installed.app.name}</h3>
                        <p className="text-sm text-secondary-text truncate">
                          {installed.app.description}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded transition-all text-sm whitespace-nowrap">
                        Open
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Featured Apps Section */}
          {featuredApps.length > 0 && (
            <div className="space-y-6 border-t border-divider/30 pt-12">
              <div>
                <h2 className="text-2xl font-black mb-2">Featured Apps</h2>
                <p className="text-secondary-text">Try these handpicked premium tools</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredApps.map((app) => (
                  <div key={app.id} className="bg-bg-card border border-divider rounded-lg overflow-hidden hover:border-primary/50 transition-all group">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                      {app.icon}
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg">{app.name}</h3>
                        <p className="text-xs text-secondary-text">{app.category?.name}</p>
                      </div>
                      <p className="text-sm text-secondary-text line-clamp-2">{app.description}</p>
                      <div className="flex items-center gap-4 text-xs text-secondary-text">
                        <div className="flex items-center gap-1">
                          <FaStar size={12} className="text-primary" />
                          {app.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaDownloadIcon size={12} />
                          {app.downloads.toLocaleString()}
                        </div>
                      </div>
                      <button className="w-full py-2 px-3 bg-primary hover:bg-primary-hover text-white font-bold rounded transition-all text-sm active:scale-95">
                        Install
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card border border-divider hover:border-primary text-primary-text hover:text-primary font-bold rounded-full transition-all"
                >
                  View All Apps
                  <FaArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
