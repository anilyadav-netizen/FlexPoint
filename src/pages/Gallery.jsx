import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExpand } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getGallery } from "../redux/Slicer/gallerySlice";

const Gallery = () => {
    const dispatch = useDispatch();
    const { gallery, loading } = useSelector((state) => state.gallery);

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    const galleryList = Array.isArray(gallery) ? gallery.slice(0, 5) : [];

    return (
        <main className="mt-0 overflow-hidden bg-[#0d0d0d] text-white">
            {/* ================= GALLERY SECTION ================= */}
            <section className="border-b border-white/10 bg-[#111111]">
                <div className="mx-auto max-w-[110rem] px-5 py-8 sm:px-8 md:py-12 lg:px-12 xl:px-[7%]">

                    {/* ================= HEADER ================= */}
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e85d3a] sm:text-[12px]">
                                    01 — Our Gallery
                                </span>
                            </div>

                            <h2 className="text-[24px] font-bold leading-none tracking-wide sm:text-[28px] md:text-[32px] lg:text-[36px]">
                                TRAIN. <span className="text-[#e85d3a]">MOVE.</span> REPEAT.
                            </h2>
                        </div>

                        <p className="max-w-[400px] text-[13px] leading-5 text-white/45 sm:text-right sm:text-[14px] sm:leading-6">
                            Real people. Real training. Real progress. Explore moments from our fitness community.
                        </p>
                    </div>

                    {/* ================= LOADING ================= */}
                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/40">
                                Loading Gallery...
                            </p>
                        </div>
                    ) : galleryList.length > 0 ? (
                        /* ================= MASONRY GRID ================= */
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {galleryList.map((item, index) => (
                                <article
                                    key={item._id}
                                    className={`group relative overflow-hidden border rounded-lg border-white/10 bg-[#151515] ${
                                        index % 5 === 0 ? "sm:row-span-2" : ""
                                    }`}
                                >
                                    {/* ================= IMAGE CONTAINER ================= */}
                                    <div
                                        className={`relative overflow-hidden ${
                                            index % 5 === 0
                                                ? "h-[430px] sm:h-full"
                                                : "h-[260px] sm:h-[280px] "
                                        }`}
                                    >
                                        {/* ================= IMAGE ================= */}
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.description || "Fitness Gallery"}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-[#151515] text-white/20">
                                                <span className="text-[13px] uppercase tracking-wider">
                                                    No Image
                                                </span>
                                            </div>
                                        )}

                                        {/* ================= OVERLAY ================= */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* ================= ORANGE TOP LINE ================= */}
                                        <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-full" />

                                        {/* ================= NUMBER ================= */}
                                        <div className="absolute left-4 top-4">
                                            <span className="text-[20px] font-bold text-white/35 sm:text-[22px]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* ================= EXPAND ICON ================= */}
                                        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                                            <FaExpand size={11} />
                                        </div>

                                        {/* ================= DESCRIPTION ================= */}
                                        <div className="absolute bottom-0 left-0 w-full p-5">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e85d3a] sm:text-[11px]">
                                                Fitness Centers
                                            </p>

                                            <h3 className="mt-2 max-w-[400px] text-[18px] font-bold leading-tight tracking-wide text-white sm:text-[20px] md:text-[22px]">
                                                {item.description || "Fitness Training"}
                                            </h3>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* ================= EMPTY STATE ================= */
                        <div className="border border-white/10 bg-[#151515] py-20 text-center">
                            <p className="text-[20px] font-bold text-white/40 sm:text-[24px]">
                                NO GALLERY PHOTOS YET.
                            </p>

                            <p className="mt-2 text-[13px] text-white/35 sm:text-[14px]">
                                Gallery photos will appear here once added from the admin panel.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ================= VIEW ALL BUTTON ================= */}
            <section>
                <div className="mx-auto max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">
                    <div className="flex justify-center">
                        <Link
                            to="/gallery"
                            className="group flex h-[44px] items-center justify-center gap-3 bg-[#e85d3a] px-7 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f06a49] sm:h-[48px] sm:px-8 sm:text-[12px]"
                            style={{
                                clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                            }}
                        >
                            VIEW ALL GALLERY

                            <FaArrowRight
                                size={11}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Gallery;