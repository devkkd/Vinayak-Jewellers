import React, { useEffect, useRef, useState } from "react";
import { FaInstagram, FaTrash, FaEdit, FaPlus, FaCheck, FaTimes, FaVideo, FaCloudUploadAlt } from "react-icons/fa";
import { getAllReels, addReel, updateReel, deleteReel } from "../../api/instagramReelAPI";

const MAX_REELS = 7;
const emptyForm = { isActive: true, videoFile: null, thumbnailFile: null };

export default function ManageInstagramReels() {
  const [reels, setReels] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const data = await getAllReels();
      setReels(data || []);
    } catch {
      setError("Failed to load reels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReels(); }, []);

  const showMsg = (msg, isError = false) => {
    if (isError) { setError(msg); setSuccess(""); }
    else { setSuccess(msg); setError(""); }
    setTimeout(() => { setError(""); setSuccess(""); }, 4000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, videoFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, thumbnailFile: file }));
    setThumbPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !form.videoFile) return showMsg("Please select a video file", true);

    setUploading(true);
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => (p < 85 ? p + 5 : p));
    }, 300);

    try {
      if (editId) {
        await updateReel(editId, {
          isActive: form.isActive,
          videoFile: form.videoFile || undefined,
          thumbnailFile: form.thumbnailFile || undefined,
        });
        showMsg("Reel updated successfully");
      } else {
        await addReel({ videoFile: form.videoFile, thumbnailFile: form.thumbnailFile });
        showMsg(
          reels.length >= MAX_REELS
            ? `Reel uploaded. Oldest reel was auto-removed (max ${MAX_REELS} allowed).`
            : "Reel uploaded successfully"
        );
      }
      resetForm();
      fetchReels();
    } catch {
      showMsg("Upload failed. Please try again.", true);
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setTimeout(() => { setUploading(false); setUploadProgress(0); }, 600);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setPreview(null);
    setThumbPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  };

  const handleEdit = (reel) => {
    setEditId(reel._id);
    setForm({ isActive: reel.isActive, videoFile: null, thumbnailFile: null });
    setPreview(reel.videoUrl);
    setThumbPreview(reel.thumbnailUrl || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reel? This will also remove it from Cloudinary.")) return;
    try {
      await deleteReel(id);
      showMsg("Reel deleted");
      fetchReels();
    } catch {
      showMsg("Failed to delete reel", true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
          <FaInstagram className="text-white text-lg" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#5C1D02] cinzelfont">Instagram Reels</h2>
          <p className="text-xs text-[#7a563f]">Upload reels to display on the website</p>
        </div>
        <span className={`ml-auto text-sm px-3 py-1 rounded-full font-medium border ${
          reels.length >= MAX_REELS
            ? "bg-amber-50 border-amber-300 text-amber-700"
            : "bg-[#FFEAC5] border-[#b68d52] text-[#5A2B1A]"
        }`}>
          {reels.length} / {MAX_REELS} reels
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <FaTimes /> {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <FaCheck /> {success}
        </div>
      )}
      {reels.length >= MAX_REELS && !editId && (
        <div className="mb-4 bg-amber-50 border border-amber-300 text-amber-700 px-4 py-3 rounded-xl text-sm">
          ⚠️ Max {MAX_REELS} reels reached. Adding a new one will auto-delete the oldest reel.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#E2C887]/60 rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-base font-semibold text-[#5C1D02] mb-5">
          {editId ? "✏️ Edit Reel" : "➕ Upload New Reel"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Video Upload */}
          <div>
            <label className="text-xs font-semibold text-[#5A2B1A] mb-1.5 block uppercase tracking-wide">
              {editId ? "Replace Video (optional)" : "Video File *"}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#d1b890] rounded-xl p-4 text-center cursor-pointer hover:border-[#b68d52] hover:bg-[#FFFDF5] transition group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                onChange={handleFileChange}
                className="hidden"
              />
              {preview ? (
                <div className="flex flex-col items-center gap-2">
                  <video
                    src={preview}
                    className="w-full h-36 object-cover rounded-xl"
                    muted playsInline
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                  />
                  <p className="text-xs text-[#7a563f]">
                    {form.videoFile ? form.videoFile.name : "Current video"} · Click to change
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-5">
                  <FaCloudUploadAlt className="text-3xl text-[#b68d52] group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-[#5A2B1A]">Click to upload video</p>
                  <p className="text-xs text-[#7a563f]">MP4, MOV, AVI, WEBM · Max 100MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="text-xs font-semibold text-[#5A2B1A] mb-1.5 block uppercase tracking-wide">
              Thumbnail Image
              <span className="ml-1 text-[#7a563f] normal-case font-normal">(optional)</span>
            </label>
            <div
              onClick={() => thumbInputRef.current?.click()}
              className="border-2 border-dashed border-[#d1b890] rounded-xl p-4 text-center cursor-pointer hover:border-[#b68d52] hover:bg-[#FFFDF5] transition group"
            >
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleThumbChange}
                className="hidden"
              />
              {thumbPreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={thumbPreview}
                    alt="Thumbnail"
                    className="w-full h-36 object-cover rounded-xl border border-[#d1b890]"
                  />
                  <p className="text-xs text-[#7a563f]">
                    {form.thumbnailFile ? form.thumbnailFile.name : "Current thumbnail"} · Click to change
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-5">
                  <svg className="w-8 h-8 text-[#b68d52] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-[#5A2B1A]">Click to upload thumbnail</p>
                  <p className="text-xs text-[#7a563f]">JPEG, PNG, WEBP · Optional</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active toggle (edit only) */}
        {editId && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="accent-[#b68d52] w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm text-[#5A2B1A]">
              Active — visible on website
            </label>
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#7a563f] mb-1">
              <span>Uploading to Cloudinary...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#FFEAC5] rounded-full h-2">
              <div className="bg-[#b68d52] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button type="submit" disabled={uploading}
            className="flex items-center gap-2 bg-[#5C1D02] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#7A2D0E] transition disabled:opacity-50">
            {uploading
              ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Uploading...</>
              : editId ? <><FaCheck /> Update Reel</> : <><FaPlus /> Upload Reel</>}
          </button>
          {editId && (
            <button type="button" onClick={resetForm}
              className="flex items-center gap-2 border border-[#d1b890] text-[#5A2B1A] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#FFF4DC] transition">
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Reels Grid */}
      {loading ? (
        <div className="text-center py-12 text-[#7a563f]">
          <div className="w-8 h-8 border-2 border-[#b68d52] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading reels...
        </div>
      ) : reels.length === 0 ? (
        <div className="text-center py-12 text-[#7a563f] bg-white rounded-2xl border border-[#E2C887]/60">
          <FaVideo className="text-4xl mx-auto mb-3 text-[#d1b890]" />
          <p className="font-medium">No reels uploaded yet</p>
          <p className="text-sm mt-1">Upload your first reel above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reels.map((reel, i) => (
            <div key={reel._id}
              className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition ${reel.isActive ? "border-[#E2C887]/60" : "border-gray-200 opacity-60"}`}>
              <div className="relative bg-[#FFF4DC] aspect-[9/16] overflow-hidden">
                {reel.thumbnailUrl && (
                  <img src={reel.thumbnailUrl} alt="thumbnail" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <video
                  src={reel.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted playsInline loop
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <span className="absolute top-2 left-2 bg-[#5C1D02]/80 text-white text-xs px-2 py-0.5 rounded-full">#{i + 1}</span>
                {!reel.isActive && (
                  <span className="absolute top-2 right-2 bg-gray-600/80 text-white text-xs px-2 py-0.5 rounded-full">Hidden</span>
                )}
              </div>
              <div className="p-3 flex gap-2">
                <button onClick={() => handleEdit(reel)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[#b68d52] text-[#5A2B1A] py-1.5 rounded-lg text-xs font-medium hover:bg-[#FFF4DC] transition">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(reel._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-red-300 text-red-600 py-1.5 rounded-lg text-xs font-medium hover:bg-red-50 transition">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
