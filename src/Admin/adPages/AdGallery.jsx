import React, { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    X,
    Image,
    Upload,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    getGallery,
    createGallery,
    updateGallery,
    deleteGallery,
} from "../../redux/Slicer/gallerySlice";

const AdGallery = () => {
    const dispatch = useDispatch();

    const { gallery, loading, error } = useSelector(
        (state) => state.gallery
    );

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        image: null,
        description: "",
    });

    // ==============================
    // GET GALLERY
    // ==============================

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    // ==============================
    // FILTER GALLERY
    // ==============================

    const galleryList = Array.isArray(gallery) ? gallery : [];

    const filteredGallery = galleryList.filter((item) =>
        item.description
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==============================
    // OPEN ADD MODAL
    // ==============================

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            image: null,
            description: "",
        });
        setShowModal(true);
    };

    // ==============================
    // OPEN EDIT MODAL
    // ==============================

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            image: null,
            description: item.description || "",
        });
        setShowModal(true);
    };

    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // ==============================
    // CLOSE MODAL
    // ==============================

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({
            image: null,
            description: "",
        });
    };

    // ==============================
    // SUBMIT
    // ==============================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.description.trim()) {
            alert("Description is required");
            return;
        }

        // ==============================
        // CREATE
        // ==============================

        if (!editingItem && !formData.image) {
            alert("Please select an image");
            return;
        }

        const data = new FormData();

        if (formData.image) {
            data.append("image", formData.image);
        }

        data.append("description", formData.description);

        try {
            if (editingItem) {
                await dispatch(
                    updateGallery({
                        id: editingItem._id,
                        formData: data,
                    })
                ).unwrap();
            } else {
                await dispatch(createGallery(data)).unwrap();
            }

            closeModal();
        } catch (error) {
            console.error("Gallery submit error:", error);
        }
    };

    // ==============================
    // DELETE
    // ==============================

    const handleDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to delete this photo?"
            )
        ) {
            try {
                await dispatch(deleteGallery(id)).unwrap();
            } catch (error) {
                console.error("Delete gallery error:", error);
            }
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] p-5 dark:bg-[#12181B] sm:p-8 lg:p-10">
            <div>

                {/* ================= HEADER ================= */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] sm:text-2xl">
                            Gallery
                        </h1>

                        <p className="mt-1 text-xs text-[#606E6E] dark:text-[#AEB7BA] sm:text-sm">
                            Manage fitness center photos and gallery content
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#3420FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2818D9]"
                    >
                        <Plus size={18} />
                        Add Photo
                    </button>
                </div>

                {/* ================= STATS ================= */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Total Photos
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                            {galleryList.length}
                        </h3>
                    </div>

                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                            Gallery Status
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-green-500">
                            Active
                        </h3>
                    </div>

                </div>

                {/* ================= SEARCH ================= */}

                <div className="mb-6 rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                    <div className="relative max-w-md">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                        />

                        <input
                            type="text"
                            placeholder="Search gallery..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full rounded-lg border border-[#E2E6E8] bg-[#F8F9FB] py-2.5 pl-10 pr-4 text-sm text-[#1F272B] outline-none placeholder:text-[#778387] focus:border-[#3420FF] dark:border-[#303A3F] dark:bg-[#12181B] dark:text-[#F4F6F7]"
                        />

                    </div>
                </div>

                {/* ================= GALLERY ================= */}

                <div className="overflow-hidden rounded-xl border border-[#E2E6E8] bg-white dark:border-[#303A3F] dark:bg-[#1C2529]">

                    <div className="flex items-center gap-2 border-b border-[#E7EAED] px-5 py-4 dark:border-[#303A3F]">

                        <Image
                            size={19}
                            className="text-[#3420FF]"
                        />

                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Gallery Photos
                        </h2>

                    </div>

                    <div className="p-5">

                        {/* LOADING */}

                        {loading && galleryList.length === 0 && (
                            <div className="py-16 text-center text-sm text-[#778387]">
                                Loading gallery...
                            </div>
                        )}

                        {/* ERROR */}

                        {!loading && error && galleryList.length === 0 && (
                            <div className="py-16 text-center text-sm text-red-500">
                                {error}
                            </div>
                        )}

                        {/* DATA */}

                        {!loading &&
                            !error &&
                            filteredGallery.length > 0 && (
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                    {filteredGallery.map((item) => (
                                        <div
                                            key={item._id}
                                            className="group overflow-hidden rounded-xl border border-[#E2E6E8] bg-[#F8F9FB] dark:border-[#303A3F] dark:bg-[#12181B]"
                                        >

                                            {/* IMAGE */}

                                            <div className="relative aspect-[4/3] overflow-hidden">

                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={
                                                            item.description
                                                        }
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[#778387]">
                                                        <Image size={40} />
                                                    </div>
                                                )}

                                                {/* ACTIONS */}

                                                <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">

                                                    <button
                                                        onClick={() =>
                                                            openEditModal(
                                                                item
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-[#606E6E] shadow"
                                                    >
                                                        <Edit size={14} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-red-500 shadow"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>

                                                </div>
                                            </div>

                                            {/* DESCRIPTION */}

                                            <div className="p-4">
                                                <p className="line-clamp-2 text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                                    {item.description}
                                                </p>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        {/* EMPTY */}

                        {!loading &&
                            !error &&
                            filteredGallery.length === 0 && (
                                <div className="py-16 text-center text-[#778387] dark:text-[#AEB7BA]">
                                    No gallery photos found.
                                </div>
                            )}

                    </div>
                </div>
            </div>

            {/* ================= MODAL ================= */}

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

                    <div className="w-full max-w-lg rounded-xl border border-[#E2E6E8] bg-white shadow-2xl dark:border-[#303A3F] dark:bg-[#1C2529]">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b border-[#E7EAED] px-5 py-4 dark:border-[#303A3F]">

                            <div>

                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {editingItem
                                        ? "Edit Photo"
                                        : "Add Photo"}
                                </h2>

                                <p className="mt-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                    {editingItem
                                        ? "Update gallery photo details"
                                        : "Add a new photo to your gallery"}
                                </p>

                            </div>

                            <button
                                onClick={closeModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#606E6E] hover:bg-[#F8F9FB] dark:text-[#AEB7BA] dark:hover:bg-white/5"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        {/* FORM */}

                        <form onSubmit={handleSubmit}>

                            <div className="space-y-5 p-5">

                                {/* IMAGE */}

                                <div>

                                    <label className="form-label text-white">
                                        Gallery Photo
                                    </label>

                                    <label className="flex h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#D7DCDF] bg-[#F8F9FB] hover:border-[#3420FF] dark:border-[#3A454A] dark:bg-[#12181B]">

                                        {formData.image ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.image
                                                )}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : editingItem?.image ? (
                                            <img
                                                src={editingItem.image}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <Upload
                                                    size={25}
                                                    className="mb-2 text-[#778387]"
                                                />

                                                <span className="text-sm text-[#778387]">
                                                    Click to upload photo
                                                </span>

                                                <span className="mt-1 text-xs text-[#A0A8AA]">
                                                    PNG, JPG or JPEG
                                                </span>
                                            </>
                                        )}

                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />

                                    </label>
                                </div>

                                {/* DESCRIPTION */}

                                <div>

                                    <label className="form-label text-white">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            formData.description
                                        }
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter photo description..."
                                        className="w-full resize-none rounded-lg border border-[#303A3F] bg-black px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#3420FF]"
                                    />

                                </div>

                            </div>

                            {/* FOOTER */}

                            <div className="flex justify-end gap-3 border-t border-[#E7EAED] p-5 dark:border-[#303A3F]">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg border border-[#E2E6E8] px-5 py-2.5 text-sm font-medium text-[#606E6E] hover:bg-[#F8F9FB] dark:border-[#303A3F] dark:text-[#AEB7BA] dark:hover:bg-white/5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg bg-[#3420FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2818D9] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Saving..."
                                        : editingItem
                                            ? "Update Photo"
                                            : "Add Photo"}
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