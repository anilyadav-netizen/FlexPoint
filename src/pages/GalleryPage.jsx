
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExpand, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getGallery } from "../redux/Slicer/gallerySlice";

const GalleryPage = () => {
    const dispatch = useDispatch();

    const { gallery, loading } = useSelector((state) => state.gallery);

    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState("ALL");

    useEffect(() => {
        dispatch(getGallery());
    }, [dispatch]);

    const galleryList = Array.isArray(gallery) ? gallery : [];

    const categories = useMemo(() => {
        return ["ALL"];
    }, []);

    const filteredGallery = useMemo(() => {
        if (activeCategory === "ALL") {
            return galleryList;
        }

        return galleryList;
    }, [galleryList, activeCategory]);

    return (
        <main className="mt-0 w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =========================
                GALLERY SECTION
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    {/* HEADER */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        {/* LEFT */}
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#e85d3a]" />

                                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                    Our Fitness Space
                                </span>
                            </div>

                            <h1 className="text-[20px] font-bold leading-tight md:text-[28px]">
                                TRAIN.
                                <span className="text-[#e85d3a]">
                                    {" "}MOVE.
                                </span>{" "}
                                REPEAT.
                            </h1>
                        </div>

                        {/* RIGHT */}
                        <p className="max-w-[450px] text-[12px] leading-5 text-white/40 md:text-[14px]">
                            Step inside our training environment and experience
                            the energy, dedication and moments that define our
                            fitness community.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="flex min-h-[350px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                    Loading Gallery...
                                </p>
                            </div>
                        </div>
                    ) : filteredGallery.length > 0 ? (


                        <div
                            className="
                                mt-5
                                columns-1
                                gap-3
                                sm:columns-2
                                lg:columns-3
                                lg:gap-4
                            "
                        >
                            {filteredGallery.map((item, index) => (
                                <article
                                    key={item._id}
                                    className="
                                        group
                                        relative
                                        mb-3
                                        break-inside-avoid
                                        overflow-hidden
                                        rounded-md
                                        border
                                        border-white/10
                                        bg-[#151515]
                                        lg:mb-4
                                    "
                                >

                                    {/* =========================
                                        FIXED IMAGE AREA
                                    ========================== */}
                                    <div
                                        className="
                                            relative
                                            h-[240px]
                                            w-full
                                            overflow-hidden
                                            sm:h-[280px]
                                            lg:h-[300px]
                                        "
                                    >

                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={
                                                    item.description ||
                                                    "Fitness Gallery"
                                                }
                                                loading="lazy"
                                                className="
                                                    block
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    object-center
                                                    transition-transform
                                                    duration-700
                                                    ease-out
                                                    group-hover:scale-105
                                                "
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-[#151515]">
                                                <span className="text-[9px] uppercase tracking-[0.12em] text-white/20">
                                                    No Image
                                                </span>
                                            </div>
                                        )}

                                        {/* DARK OVERLAY */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-black/85
                                                via-black/10
                                                to-transparent
                                            "
                                        />

                                        {/* NUMBER */}
                                        <div className="absolute left-3 top-3">
                                            <span className="text-[18px] font-bold text-white/30">
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
                                            className="
                                                absolute
                                                right-3
                                                top-3
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-md
                                                border
                                                border-white/20
                                                bg-black/30
                                                text-white/60
                                                opacity-0
                                                backdrop-blur-sm
                                                transition-all
                                                duration-300
                                                hover:border-[#e85d3a]
                                                hover:bg-[#e85d3a]
                                                hover:text-white
                                                group-hover:opacity-100
                                            "
                                            aria-label="Expand image"
                                        >
                                            <FaExpand size={10} />
                                        </button>

                                        {/* DESCRIPTION */}
                                        <div className="absolute bottom-0 left-0 w-full p-4">

                                            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#e85d3a]">
                                                Fitness Centers
                                            </p>

                                            <h3 className="mt-1.5 max-w-[400px] text-[14px] font-semibold leading-tight text-white sm:text-[15px] md:text-[16px]">
                                                {item.description ||
                                                    "Fitness Center"}
                                            </h3>

                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (

                        /* EMPTY STATE */
                        <div className="rounded-md border border-white/10 bg-[#151515] py-16 text-center">

                            <p className="text-[14px] font-bold text-white/40 sm:text-[15px] md:text-[16px]">
                                NO GALLERY PHOTOS YET.
                            </p>

                            <p className="mt-2 text-[10px] text-white/30 sm:text-[11px]">
                                Gallery photos will appear here once added
                                from the admin panel.
                            </p>

                        </div>
                    )}

                </div>
            </section>

            {/* =========================
                CTA SECTION
            ========================== */}
            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-md
                            border
                            border-white/10
                            bg-[#151515]
                            px-5
                            py-7
                            sm:px-8
                            md:py-8
                            lg:px-12
                        "
                    >
                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div
                            className="
                                relative
                                z-10
                                flex
                                flex-col
                                gap-5
                                md:flex-row
                                md:items-center
                                md:justify-between
                            "
                        >

                            {/* LEFT */}
                            <div className="max-w-[680px]">

                                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                    Ready To Start?
                                </p>

                                <h2 className="text-[14px] font-bold leading-tight sm:text-[15px] md:text-[16px]">
                                    YOUR FITNESS.
                                    <span className="text-[#e85d3a]">
                                        {" "}YOUR JOURNEY.
                                    </span>
                                </h2>

                                <p className="mt-2 max-w-[560px] text-[10px] leading-5 text-white/40 sm:text-[11px]">
                                    Ready to become stronger and more
                                    consistent? Find the right training
                                    program and start your journey.
                                </p>

                            </div>

                            {/* BUTTON */}
                            <Link
                                to="/programs"
                                className="
                                    group
                                    inline-flex
                                    w-fit
                                    shrink-0
                                    items-center
                                    gap-2
                                    rounded-md
                                    bg-[#e85d3a]
                                    px-5
                                    py-2.5
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.08em]
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:bg-[#f16a49]
                                "
                            >
                                Explore Programs

                                <FaArrowRight
                                    size={8}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                LIGHTBOX
            ========================== */}
            {selectedImage && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[999]
                        flex
                        items-center
                        justify-center
                        bg-black/90
                        p-4
                        backdrop-blur-sm
                    "
                    onClick={() => setSelectedImage(null)}
                >

                    {/* CLOSE BUTTON */}
                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-white/20
                            bg-white/5
                            text-white/70
                            transition-all
                            duration-300
                            hover:border-[#e85d3a]
                            hover:bg-[#e85d3a]
                            hover:text-white
                        "
                        aria-label="Close image"
                    >
                        <FaXmark size={13} />
                    </button>

                    {/* IMAGE CONTAINER */}
                    <div
                        className="
                            relative
                            max-h-[90vh]
                            max-w-[1100px]
                            overflow-hidden
                            rounded-md
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {selectedImage.image ? (
                            <img
                                src={selectedImage.image}
                                alt={
                                    selectedImage.description ||
                                    "Fitness Gallery"
                                }
                                className="
                                    block
                                    max-h-[85vh]
                                    max-w-full
                                    rounded-md
                                    object-contain
                                "
                            />
                        ) : (
                            <div className="flex h-[400px] w-[600px] items-center justify-center rounded-md bg-[#151515]">
                                <span className="text-[11px] text-white/30">
                                    No Image
                                </span>
                            </div>
                        )}

                        {selectedImage.description && (
                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    bg-gradient-to-t
                                    from-black/90
                                    to-transparent
                                    px-4
                                    pb-4
                                    pt-10
                                "
                            >
                                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#e85d3a]">
                                    Fitness Centers
                                </p>

                                <h2 className="mt-1 text-[14px] font-bold text-white">
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
