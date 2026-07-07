"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSearch, FaSave } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("apps");
  const [apps, setApps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    icon: "",
    author: "AIForge",
    version: "1.0.0",
    categoryId: "",
    creditCost: 1,
    rating: 4.5,
    downloads: 0,
    isPublic: true,
    featured: false,
    tags: [],
  });

  // Check if user is admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppsAndCategories();
    }
  }, [status]);

  const fetchAppsAndCategories = async () => {
    try {
      setLoading(true);
      const [appsRes, categoriesRes] = await Promise.all([
        axios.get("/api/apps?limit=100"),
        axios.get("/api/categories"),
      ]);
      setApps(appsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleAddApp = async () => {
    try {
      if (!formData.name || !formData.slug || !formData.description || !formData.categoryId) {
        toast.error("الرجاء ملء جميع الحقول المطلوبة");
        return;
      }

      if (editingApp) {
        await axios.put(`/api/apps/${editingApp.id}`, formData);
        toast.success("تم تحديث التطبيق بنجاح");
      } else {
        await axios.post("/api/apps", formData);
        toast.success("تم إضافة التطبيق بنجاح");
      }

      setShowForm(false);
      resetForm();
      fetchAppsAndCategories();
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ في العملية");
    }
  };

  const handleDeleteApp = async (appId) => {
    if (confirm("هل أنت متأكد من حذف هذا التطبيق؟")) {
      try {
        await axios.delete(`/api/apps/${appId}`);
        toast.success("تم حذف التطبيق بنجاح");
        fetchAppsAndCategories();
      } catch (error) {
        console.error("Error:", error);
        toast.error("خطأ في الحذف");
      }
    }
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      slug: app.slug,
      description: app.description,
      longDescription: app.longDescription || "",
      icon: app.icon || "",
      author: app.author || "AIForge",
      version: app.version || "1.0.0",
      categoryId: app.categoryId || "",
      creditCost: app.creditCost || 1,
      rating: app.rating || 4.5,
      downloads: app.downloads || 0,
      isPublic: app.isPublic,
      featured: app.featured,
      tags: app.tags || [],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      icon: "",
      author: "AIForge",
      version: "1.0.0",
      categoryId: "",
      creditCost: 1,
      rating: 4.5,
      downloads: 0,
      isPublic: true,
      featured: false,
      tags: [],
    });
    setEditingApp(null);
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">لوحة تحكم المسؤول</h1>
          <p className="text-secondary-text">إدارة التطبيقات والفئات</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-divider">
          <button
            onClick={() => setActiveTab("apps")}
            className={`px-4 py-2 font-bold border-b-2 transition-all ${
              activeTab === "apps" ? "border-primary text-primary" : "border-transparent text-secondary-text"
            }`}
          >
            التطبيقات ({apps.length})
          </button>
        </div>

        {/* Apps Tab */}
        {activeTab === "apps" && (
          <div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-3 text-secondary-text" />
                <input
                  type="text"
                  placeholder="البحث عن التطبيقات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-card border border-divider rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all"
              >
                <FaPlus size={18} />
                إضافة تطبيق
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-bg-card border border-divider rounded-lg p-6 mb-8 space-y-4">
                <h3 className="text-xl font-bold">{editingApp ? "تعديل التطبيق" : "إضافة تطبيق جديد"}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسم التطبيق"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="الـ Slug (بدون مسافات)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <textarea
                  placeholder="الوصف القصير"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  rows="2"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="رابط الأيقونة"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  />
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="">اختر فئة</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="تكلفة الرصيد"
                    min="1"
                    value={formData.creditCost}
                    onChange={(e) => setFormData({ ...formData, creditCost: parseInt(e.target.value) })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="التقييم"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="px-4 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>عام</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>مميز</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddApp}
                    className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all"
                  >
                    <FaSave size={18} />
                    حفظ
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-6 py-2 bg-bg-page border border-divider hover:bg-bg-card text-primary-text font-bold rounded-lg transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Apps List */}
            <div className="space-y-4">
              {filteredApps.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary-text">لا توجد تطبيقات</p>
                </div>
              ) : (
                filteredApps.map((app) => (
                  <div key={app.id} className="bg-bg-card border border-divider rounded-lg p-6 flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{app.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{app.name}</h3>
                        <p className="text-sm text-secondary-text">{app.description}</p>
                        <div className="flex gap-4 mt-2 text-xs">
                          <span>★ {app.rating}</span>
                          <span>تحميلات: {app.downloads}</span>
                          <span>رصيد: {app.creditCost}</span>
                          {app.featured && <span className="bg-primary/20 text-primary px-2 py-1 rounded">مميز</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditApp(app)}
                        className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteApp(app.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-all"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
