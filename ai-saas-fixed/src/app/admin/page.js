"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaShieldAlt, FaUsers, FaBox, FaTag, FaChartBar } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Admin emails allowlist — add your email here or use ADMIN_EMAILS env var
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean);

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("apps");
  const [apps, setApps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalApps: 0, totalCreations: 0, totalCategories: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", longDescription: "",
    icon: "🤖", author: "AIForge", version: "1.0.0",
    categoryId: "", creditCost: 1, rating: 4.5,
    downloads: 0, isPublic: true, featured: false, tags: [],
  });

  const isAdmin = status === "authenticated" && (
    ADMIN_EMAILS.includes(session?.user?.email) ||
    session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated" && !isAdmin) {
      toast.error("غير مصرح لك بالوصول إلى لوحة التحكم");
      router.push("/");
      return;
    }
    if (status === "authenticated" && isAdmin) {
      fetchData();
    }
  }, [status, isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsRes, categoriesRes] = await Promise.all([
        axios.get("/api/apps?limit=100"),
        axios.get("/api/categories"),
      ]);
      const appsData = appsRes.data.data || [];
      const catsData = categoriesRes.data.data || [];
      setApps(appsData);
      setCategories(catsData);
      setStats(prev => ({
        ...prev,
        totalApps: appsData.length,
        totalCategories: catsData.length,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApp = async () => {
    if (!formData.name || !formData.slug || !formData.description || !formData.categoryId) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    // Auto-generate manifest
    const payload = {
      ...formData,
      manifest: {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        version: formData.version,
        icon: formData.icon,
      },
    };

    try {
      if (editingApp) {
        await axios.put(`/api/apps/${editingApp.id}`, payload);
        toast.success("تم تحديث التطبيق بنجاح ✓");
      } else {
        await axios.post("/api/apps", payload);
        toast.success("تم إضافة التطبيق بنجاح ✓");
      }
      setShowForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "حدث خطأ في العملية");
    }
  };

  const handleDeleteApp = async (appId) => {
    if (!confirm("هل أنت متأكد من حذف هذا التطبيق؟ سيتم حذف جميع التثبيتات المرتبطة به.")) return;
    try {
      await axios.delete(`/api/apps/${appId}`);
      toast.success("تم حذف التطبيق بنجاح");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || "خطأ في الحذف");
    }
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setFormData({
      name: app.name, slug: app.slug, description: app.description,
      longDescription: app.longDescription || "", icon: app.icon || "🤖",
      author: app.author || "AIForge", version: app.version || "1.0.0",
      categoryId: app.categoryId || "", creditCost: app.creditCost || 1,
      rating: app.rating || 4.5, downloads: app.downloads || 0,
      isPublic: app.isPublic, featured: app.featured, tags: app.tags || [],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      name: "", slug: "", description: "", longDescription: "",
      icon: "🤖", author: "AIForge", version: "1.0.0",
      categoryId: "", creditCost: 1, rating: 4.5,
      downloads: 0, isPublic: true, featured: false, tags: [],
    });
    setEditingApp(null);
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <FaShieldAlt className="mx-auto text-5xl text-red-500/50" />
            <h2 className="text-2xl font-black text-red-400">غير مصرح بالوصول</h2>
            <p className="text-secondary-text">ليس لديك صلاحيات للوصول إلى لوحة التحكم.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
              <FaShieldAlt className="text-primary text-2xl" />
              لوحة تحكم المسؤول
            </h1>
            <p className="text-secondary-text text-sm">مرحباً، {session.user.email}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "التطبيقات", value: stats.totalApps, icon: FaBox, color: "text-primary" },
            { label: "الفئات", value: stats.totalCategories, icon: FaTag, color: "text-emerald-400" },
            { label: "إجمالي التحميلات", value: apps.reduce((a,b) => a + (b.downloads||0), 0).toLocaleString(), icon: FaChartBar, color: "text-amber-400" },
            { label: "تطبيقات مميزة", value: apps.filter(a => a.featured).length, icon: FaUsers, color: "text-pink-400" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-bg-card border border-divider/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-secondary-text font-bold uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`${stat.color} text-lg`} />
                </div>
                <div className="text-2xl font-black">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-divider">
          {[
            { id: "apps", label: `التطبيقات (${apps.length})` },
            { id: "categories", label: `الفئات (${categories.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary-text hover:text-primary-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Apps Tab */}
        {activeTab === "apps" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text text-sm" />
                <input
                  type="text"
                  placeholder="البحث عن تطبيق..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <button
                onClick={() => { resetForm(); setShowForm(!showForm); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all text-sm"
              >
                <FaPlus />
                إضافة تطبيق
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-bg-card border border-divider/50 rounded-xl p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-divider/40 pb-4">
                  <h3 className="text-lg font-black">{editingApp ? "✏️ تعديل التطبيق" : "➕ إضافة تطبيق جديد"}</h3>
                  <button onClick={() => { setShowForm(false); resetForm(); }} className="text-secondary-text hover:text-primary-text text-sm">إلغاء</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">اسم التطبيق *</label>
                    <input type="text" placeholder="مثال: مولّد الصور الاحترافي"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const autoSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                        setFormData({ ...formData, name, slug: editingApp ? formData.slug : autoSlug });
                      }}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">Slug (URL) *</label>
                    <input type="text" placeholder="pro-image-generator"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">أيقونة (Emoji) *</label>
                    <input type="text" placeholder="🤖"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm text-2xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">الفئة *</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    >
                      <option value="">-- اختر فئة --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">الوصف القصير *</label>
                  <textarea
                    placeholder="وصف مختصر يظهر في قائمة التطبيقات..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    rows="2"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">تكلفة الرصيد</label>
                    <input type="number" min="1" value={formData.creditCost}
                      onChange={(e) => setFormData({ ...formData, creditCost: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">التقييم</label>
                    <input type="number" min="0" max="5" step="0.1" value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.5 })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">الإصدار</label>
                    <input type="text" value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text uppercase tracking-wider">المؤلف</label>
                    <input type="text" value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-2 bg-bg-page border border-divider rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-semibold">عام (مرئي للجميع)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-semibold">مميز (يظهر في الصفحة الرئيسية)</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2 border-t border-divider/40">
                  <button onClick={handleSaveApp}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all text-sm"
                  >
                    <FaSave />
                    {editingApp ? "حفظ التعديلات" : "إضافة التطبيق"}
                  </button>
                  <button onClick={() => { setShowForm(false); resetForm(); }}
                    className="px-6 py-2.5 bg-bg-page border border-divider hover:bg-bg-card text-primary-text font-bold rounded-lg transition-all text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* Apps List */}
            <div className="space-y-3">
              {filteredApps.length === 0 ? (
                <div className="text-center py-16 bg-bg-card/20 border border-dashed border-divider rounded-xl">
                  <FaBox className="mx-auto text-4xl text-secondary-text/30 mb-3" />
                  <p className="text-secondary-text font-semibold">{searchTerm ? "لا توجد نتائج" : "لا توجد تطبيقات بعد"}</p>
                </div>
              ) : (
                filteredApps.map((app) => (
                  <div key={app.id} className="bg-bg-card border border-divider/50 rounded-xl p-5 flex items-center gap-4 justify-between hover:border-divider transition-all">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center bg-bg-page rounded-lg border border-divider/40">
                        {app.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base">{app.name}</h3>
                          {app.featured && (
                            <span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold uppercase">مميز</span>
                          )}
                          {!app.isPublic && (
                            <span className="text-[9px] px-2 py-0.5 bg-secondary-text/10 text-secondary-text border border-divider/30 rounded-full font-bold uppercase">خاص</span>
                          )}
                        </div>
                        <p className="text-xs text-secondary-text truncate mt-0.5">{app.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-secondary-text">
                          <span>⭐ {app.rating}</span>
                          <span>⬇️ {(app.downloads || 0).toLocaleString()}</span>
                          <span>💳 {app.creditCost} رصيد</span>
                          <span className="text-secondary-text/60">/{app.slug}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEditApp(app)}
                        className="p-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
                        title="تعديل"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => handleDeleteApp(app.id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                        title="حذف"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <p className="text-secondary-text">لا توجد فئات. أضف فئات عبر API أو seed script.</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="bg-bg-card border border-divider/50 rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold">{cat.name}</h3>
                      <p className="text-xs text-secondary-text">/{cat.slug}</p>
                    </div>
                  </div>
                  <p className="text-xs text-secondary-text">{cat.description || "لا يوجد وصف"}</p>
                  <div className="text-xs text-secondary-text">
                    {apps.filter(a => a.categoryId === cat.id).length} تطبيق
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
