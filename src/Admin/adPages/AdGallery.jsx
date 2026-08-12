import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, X, Image, Upload } from "lucide-react";

const initialGallery = [
    { id: 1, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", description: "Modern gym workout area" },
    { id: 2, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438", description: "Strength training session" },
    { id: 3, image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f", description: "Professional fitness equipment" },
];

const AdGallery = () => {
    const [gallery, setGallery] = useState(initialGallery);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ image: null, description: "" });

    const filteredGallery = gallery.filter((item) =>
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({ image: null, description: "" });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({ image: null, description: item.description });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            setGallery(gallery.map((item) =>
                item.id === editingItem.id
                    ? {
                        ...item,
                        description: formData.description,
                        image: formData.image ? URL.createObjectURL(formData.image) : item.image
                    }
                    : item
            ));
        } else {
            setGallery([
                ...gallery,
                {
                    id: Date.now(),
                    image: formData.image ? URL.createObjectURL(formData.image) : "",
                    description: formData.description
                }
            ]);
        }

        setShowModal(false);
        setEditingItem(null);
        setFormData({ image: null, description: "" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this photo?")) {
            setGallery(gallery.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Gallery</h1>
                        <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage fitness center photos and gallery content</p>
                    </div>

                    <button onClick={openAddModal} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-semibold hover:bg-[#2818D9] transition">
                        <Plus size={18} /> Add Photo
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Photos</p>
                        <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{gallery.length}</h3>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Gallery Status</p>
                        <h3 className="text-2xl font-bold text-green-500 mt-1">Active</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                        <input
                            type="text"
                            placeholder="Search gallery..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Image size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Gallery Photos</h2>
                    </div>

                    <div className="p-5">
                        {filteredGallery.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {filteredGallery.map((item) => (
                                    <div key={item.id} className="group bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.description} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#778387]">
                                                    <Image size={40} />
                                                </div>
                                            )}

                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                                <button onClick={() => openEditModal(item)} className="w-8 h-8 rounded-lg bg-white/95 text-[#606E6E] flex items-center justify-center shadow">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-white/95 text-red-500 flex items-center justify-center shadow">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">
                                No gallery photos found.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {editingItem ? "Edit Photo" : "Add Photo"}
                                </h2>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">
                                    {editingItem ? "Update gallery photo details" : "Add a new photo to your gallery"}
                                </p>
                            </div>

                            <button onClick={() => setShowModal(false)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FB] dark:hover:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA]">
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="p-5 space-y-5">
                                <div>
                                    <label className="form-label text-white">Gallery Photo</label>

                                    <label className="w-full h-44 rounded-xl border-2 border-dashed border-[#D7DCDF] dark:border-[#3A454A] bg-[#F8F9FB] dark:bg-[#12181B] flex flex-col items-center justify-center cursor-pointer hover:border-[#3420FF] overflow-hidden">
                                        {formData.image ? (
                                            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        ) : editingItem?.image ? (
                                            <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload size={25} className="text-[#778387] mb-2" />
                                                <span className="text-sm text-[#778387]">Click to upload photo</span>
                                                <span className="text-xs text-[#A0A8AA] mt-1">PNG, JPG or JPEG</span>
                                            </>
                                        )}

                                        <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
                                    </label>
                                </div>

                                <div>
                                    <label className="form-label text-white">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter photo description..."
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#303A3F] bg-black text-white text-sm outline-none placeholder:text-gray-500 focus:border-[#3420FF] resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-5 border-t border-[#E7EAED] dark:border-[#303A3F]">
                                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm font-medium text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F8F9FB] dark:hover:bg-white/5">
                                    Cancel
                                </button>

                                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]">
                                    {editingItem ? "Update Photo" : "Add Photo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdGallery;