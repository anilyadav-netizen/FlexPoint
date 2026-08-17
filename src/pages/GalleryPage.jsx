import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaExpand,
    FaXmark,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getGallery } from "../redux/Slicer/gallerySlice";

const GalleryPage = () => {
    const dispatch = useDispatch();

    const { gallery, loading } = useSelector(
        (state) => state.gallery
    );

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    // ================= GALLERY DATA =================

    const galleryList = Array.isArray(gallery) ? gallery : [];

    const categories = useMemo(() => {
        return ["ALL"];
    }, []);

    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredGallery = useMemo(() => {
        if (activeCategory === "ALL") {
            return galleryList;
        }

        return galleryList;
    }, [galleryList, activeCategory]);

    return (
        <main className="mt-0 w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-8 sm:px-8 md:py-12 lg:px-12 xl:px-[7%]">

                    <div className="grid items-end gap-5 lg:grid-cols-[1fr_0.7fr] lg:gap-16">

                        {/* LEFT */}

                        <div>

                            <div className="mb-3 flex items-center gap-3">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e85d3a] sm:text-[13px]">
                                    Fitness Center Gallery
                                </span>

                            </div>

                            <h1 className="max-w-[850px] font-['Bebas_Neue'] text-[38px] leading-[0.82] tracking-wide sm:text-[48px] md:text-[60px]">

                                TRAIN.

                                <span className="text-[#e85d3a]">
                                    {" "}MOVE.
                                </span>

                                {" "}REPEAT.

                            </h1>

                        </div>

                        {/* RIGHT */}

                        <div className="max-w-[500px] lg:justify-self-end">

                            <p className="font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">

                                Real people. Real training. Real progress.
                                Explore moments from our fitness community
                                and take a look inside our training environment.

                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">

                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        {galleryList.length} Photos
                                    </span>

                                </div>

                                <div className="border border-white/10 bg-[#151515] px-4 py-2.5">

                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 sm:text-[11px]">
                                        Real Training
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                CATEGORY BAR
            ===================================================== */}

            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto flex w-full max-w-[110rem] items-center gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12 xl:px-[7%]">

                    <span className="mr-2 shrink-0 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                        Explore:
                    </span>

                    {categories.map((category) => (

                        <button
                            key={category}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={`shrink-0 border px-4 py-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                                activeCategory === category
                                    ? "border-[#e85d3a] bg-[#e85d3a] text-white"
                                    : "border-white/10 bg-[#151515] text-white/55 hover:border-[#e85d3a]/60 hover:text-white"
                            }`}
                        >
                            {category}
                        </button>

                    ))}

                </div>

            </section>

            {/* =====================================================
                GALLERY SECTION
            ===================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-5 py-7 sm:px-8 md:py-10 lg:px-12 xl:px-[7%]">

                    {/* HEADER */}

                    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Inside The Gym
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[28px] leading-[0.85] tracking-wide sm:text-[36px] md:text-[44px]">

                                OUR

                                <span className="text-[#e85d3a]">
                                    {" "}MOMENTS
                                </span>

                            </h2>

                        </div>

                        <p className="max-w-[430px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">

                            A closer look at our workouts, facilities,
                            training sessions and fitness community.

                        </p>

                    </div>

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading ? (

                        <div className="flex min-h-[450px] items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                                <p className="mt-4 font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
                                    Loading Gallery...
                                </p>

                            </div>

                        </div>

                    ) : filteredGallery.length > 0 ? (

                        /* =================================================
                           MASONRY GRID
                        ================================================= */

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">

                            {filteredGallery.map((item, index) => (

                                <article
                                    key={item._id}
                                    className={`group relative overflow-hidden border border-white/10 bg-[#151515] ${
                                        index % 5 === 0
                                            ? "sm:row-span-2"
                                            : ""
                                    }`}
                                >

                                    <div
                                        className={`relative overflow-hidden ${
                                            index % 5 === 0
                                                ? "h-[430px] sm:h-full sm:min-h-[450px]"
                                                : "h-[270px] sm:h-[290px]"
                                        }`}
                                    >

                                        {/* IMAGE */}

                                        {item.image ? (

                                            <img
                                                src={item.image}
                                                alt={
                                                    item.description ||
                                                    "Fitness Gallery"
                                                }
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center bg-[#151515]">

                                                <span className="font-['Barlow'] text-[11px] uppercase tracking-[0.12em] text-white/20">
                                                    No Image
                                                </span>

                                            </div>

                                        )}

                                        {/* OVERLAY */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* ORANGE TOP LINE */}

                                        <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#e85d3a] transition-all duration-500 group-hover:w-full" />

                                        {/* NUMBER */}

                                        <div className="absolute left-4 top-4">

                                            <span className="font-['Bebas_Neue'] text-[24px] text-white/30">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                        </div>

                                        {/* EXPAND BUTTON */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(item)
                                            }
                                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/30 text-white/60 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white group-hover:opacity-100"
                                            aria-label="Expand image"
                                        >

                                            <FaExpand size={11} />

                                        </button>

                                        {/* DESCRIPTION */}

                                        <div className="absolute bottom-0 left-0 w-full p-5">

                                            <p className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                                Fitness Centers
                                            </p>

                                            <h3 className="mt-2 max-w-[400px] font-['Bebas_Neue'] text-[23px] leading-none tracking-wide text-white sm:text-[25px]">

                                                {item.description ||
                                                    "Fitness Center"}

                                            </h3>

                                        </div>

                                    </div>

                                    {/* BOTTOM ACCENT */}

                                    <div className="h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                                </article>

                            ))}

                        </div>

                    ) : (

                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div className="border border-white/10 bg-[#151515] py-24 text-center">

                            <p className="font-['Bebas_Neue'] text-[28px] text-white/40 sm:text-[34px]">
                                NO GALLERY PHOTOS YET.
                            </p>

                            <p className="mt-2 font-['Barlow'] text-[12px] text-white/30 sm:text-[13px]">
                                Gallery photos will appear here once added
                                from the admin panel.
                            </p>

                        </div>

                    )}

                </div>

            </section>

            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-7 sm:px-8 md:py-10 lg:px-12 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:py-10 lg:px-14">

                        {/* Glow */}

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">

                                <p className="mb-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.14em] text-[#e85d3a]">
                                    Ready To Start?
                                </p>

                                <h2 className="font-['Bebas_Neue'] text-[29px] leading-[0.85] tracking-wide sm:text-[38px] md:text-[48px]">

                                    YOUR FITNESS.

                                    <span className="text-[#e85d3a]">
                                        {" "}YOUR JOURNEY.
                                    </span>

                                </h2>

                                <p className="mt-3 max-w-[560px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">

                                    Ready to become stronger and more
                                    consistent? Find the right training
                                    program and start your journey.

                                </p>

                            </div>

                            <Link
                                to="/programs"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >

                                Explore Programs

                                <FaArrowRight
                                    size={9}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                IMAGE LIGHTBOX
            ===================================================== */}

            {selectedImage && (

                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >

                    {/* CLOSE BUTTON */}

                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 text-white/70 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                    >

                        <FaXmark size={14} />

                    </button>

                    {/* IMAGE CONTAINER */}

                    <div
                        className="relative max-h-[90vh] max-w-[1100px]"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {selectedImage.image ? (

                            <img
                                src={selectedImage.image}
                                alt={
                                    selectedImage.description ||
                                    "Fitness Gallery"
                                }
                                className="max-h-[85vh] max-w-full object-contain"
                            />

                        ) : (

                            <div className="flex h-[400px] w-[600px] items-center justify-center bg-[#151515]">
                                <span className="font-['Barlow'] text-white/30">
                                    No Image
                                </span>
                            </div>

                        )}
                        {selectedImage.description && (

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-12">

                                <p className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                    Fitness Centers
                                </p>

                                <h2 className="mt-1 font-['Bebas_Neue'] text-[25px] tracking-wide text-white">
                                    {selectedImage.description}
                                </h2>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </main>
    );
};

export default GalleryPage;