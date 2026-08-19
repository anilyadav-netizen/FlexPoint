import React, { useEffect, useRef, useState } from "react";
import {
    Star,
    Quote,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTestimonials } from "../redux/Slicer/testimonialSlice";

const TestimonailPage = () => {
    const dispatch = useDispatch();
    const sliderRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const {
        testimonials,
        loading,
        error,
    } = useSelector((state) => state.testimonial);

    // ==========================================
    // GET ACTIVE TESTIMONIALS
    // ==========================================
    useEffect(() => {
        dispatch(getActiveTestimonials());
    }, [dispatch]);

    // ==========================================
    // SCROLL SLIDER
    // ==========================================
    const scrollSlider = (direction) => {
        if (!sliderRef.current) return;

        const scrollAmount =
            window.innerWidth < 640 ? 300 : 420;

        sliderRef.current.scrollBy({
            left:
                direction === "next"
                    ? scrollAmount
                    : -scrollAmount,
            behavior: "smooth",
        });
    };

    // ==========================================
    // HANDLE SCROLL
    // ==========================================
    const handleScroll = () => {
        if (!sliderRef.current) return;

        const scrollLeft = sliderRef.current.scrollLeft;

        const cardWidth =
            sliderRef.current.firstElementChild?.offsetWidth || 1;

        const gap = 16;

        const index = Math.round(
            scrollLeft / (cardWidth + gap)
        );

        setActiveIndex(
            Math.min(
                Math.max(index, 0),
                testimonials.length - 1
            )
        );
    };

    // ==========================================
    // SCROLL TO CARD
    // ==========================================
    const scrollToCard = (index) => {
        if (!sliderRef.current) return;

        const card =
            sliderRef.current.children[index];

        if (card) {
            sliderRef.current.scrollTo({
                left: card.offsetLeft,
                behavior: "smooth",
            });
        }

        setActiveIndex(index);
    };

    // ==========================================
    // LOADING
    // ==========================================
    if (loading) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-16 text-white"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="flex min-h-[250px] items-center justify-center">
                        <p className="font-['Barlow'] text-sm text-white/50">
                            Loading testimonials...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================
    if (error) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-16 text-white"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="flex min-h-[250px] items-center justify-center">
                        <p className="font-['Barlow'] text-sm text-red-400">
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // ==========================================
    // NO TESTIMONIALS
    // ==========================================
    if (!testimonials || testimonials.length === 0) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-16 text-white"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="mb-7">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[1px] w-7 bg-[#e85d3a]" />

                            <span className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.22em] text-[#e85d3a]">
                                CLIENT STORIES
                            </span>
                        </div>

                        <h2 className="font-['Bebas_Neue'] text-[34px] leading-none tracking-[0.02em] sm:text-[42px] md:text-[48px] lg:text-[52px]">
                            WHAT OUR{" "}
                            <span className="text-[#e85d3a]">
                                MEMBERS SAY
                            </span>
                        </h2>
                    </div>

                    <p className="font-['Barlow'] text-sm text-white/40">
                        No testimonials available yet.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            id="testimonials"
            className="w-full overflow-hidden bg-[#0d0d0d] py-10 text-white sm:py-12 lg:py-16"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ==========================================
                    HEADER
                ========================================== */}
                <div className="mb-7 flex flex-col gap-6 sm:mb-9 lg:flex-row lg:items-end lg:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[1px] w-7 bg-[#e85d3a]" />

                            <span className="font-['Barlow'] text-[12px] font-bold uppercase tracking-[0.22em] text-[#e85d3a]">
                                CLIENT STORIES
                            </span>
                        </div>

                        <h2 className="font-['Bebas_Neue'] text-[34px] leading-none tracking-[0.02em] text-white sm:text-[42px] md:text-[48px] lg:text-[52px]">
                            WHAT OUR{" "}
                            <span className="text-[#e85d3a]">
                                MEMBERS SAY
                            </span>
                        </h2>

                        <p className="mt-3 max-w-[400px] font-['Barlow'] text-[10px] leading-[1.7] text-white/45 sm:text-[15px]">
                            Real stories from real members who are
                            working every day to become stronger,
                            healthier and better.
                        </p>
                    </div>

                    {/* ARROWS */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scrollSlider("prev")}
                            className="group flex h-9 w-9 items-center justify-center border border-white/10 bg-[#151515] text-white/60 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            aria-label="Previous testimonials"
                        >
                            <ArrowLeft
                                size={15}
                                strokeWidth={1.5}
                            />
                        </button>

                        <button
                            onClick={() => scrollSlider("next")}
                            className="group flex h-9 w-9 items-center justify-center border border-white/10 bg-[#151515] text-white/60 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            aria-label="Next testimonials"
                        >
                            <ArrowRight
                                size={15}
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </div>

                {/* ==========================================
                    TESTIMONIAL SLIDER
                ========================================== */}
                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={testimonial._id}
                            className="group relative min-w-[88%] snap-start overflow-hidden rounded-lg border border-white/10 bg-[#151515] p-4 transition-all duration-500 hover:border-[#e85d3a]/50 sm:min-w-[47%] sm:p-5 lg:min-w-[31.5%] xl:min-w-[31.8%]"
                        >
                            {/* TOP LINE */}
                            <span className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-60 bg-[#e85d3a] transition-transform duration-500 group-hover:scale-x-100" />

                            {/* NUMBER */}
                            <span className="absolute right-4 top-3 font-['Bebas_Neue'] text-[36px] leading-none text-white/[0.035] transition-colors duration-300 group-hover:text-[#e85d3a]/10">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* TOP */}
                            <div className="flex items-start justify-between">

                                {/* QUOTE */}
                                <div className="flex h-9 w-9 items-center justify-center bg-[#e85d3a]/10 text-[#e85d3a] transition-all duration-300 group-hover:bg-[#e85d3a] group-hover:text-white">
                                    <Quote
                                        size={17}
                                        strokeWidth={1.4}
                                    />
                                </div>

                                {/* RATING */}
                                <div className="flex gap-1 pt-1">
                                    {Array.from({
                                        length: testimonial.rating || 0,
                                    }).map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={11}
                                            fill="currentColor"
                                            strokeWidth={1.5}
                                            className="text-[#e85d3a]"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* REVIEW */}
                            <p className="mt-2.5 font-['Barlow'] text-[16px] leading-[1.65] text-white/60 sm:mt-5">
                                "{testimonial.review}"
                            </p>

                            {/* DIVIDER */}
                            <div className="my-4 h-[1px] w-full bg-white/10 sm:my-5" />

                            {/* MEMBER */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    {/* INITIALS */}
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#e85d3a] font-['Barlow'] text-[12px] font-bold text-white">
                                        {testimonial.initials ||
                                            testimonial.name
                                                ?.substring(0, 2)
                                                .toUpperCase()}
                                    </div>

                                    {/* NAME + ROLE */}
                                    <div>
                                        <h3 className="font-['Barlow'] text-[14px] font-bold tracking-[0.05em] text-white">
                                            {testimonial.name}
                                        </h3>

                                        <p className="mt-1 font-['Barlow'] text-[10px] uppercase tracking-[0.12em] text-white/35">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                {/* VERIFIED */}
                                <span className="font-['Barlow'] text-[7px] font-bold uppercase tracking-[0.12em] text-[#e85d3a] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    VERIFIED
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* ==========================================
                    BOTTOM NAVIGATION
                ========================================== */}
                <div className="mt-2.5 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* DOTS */}
                    <div className="flex items-center gap-1.5">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    scrollToCard(index)
                                }
                                className={`h-[2px] transition-all duration-300 ${
                                    activeIndex === index
                                        ? "w-7 bg-[#e85d3a]"
                                        : "w-3 bg-white/15 hover:bg-white/40"
                                }`}
                                aria-label={`Go to testimonial ${
                                    index + 1
                                }`}
                            />
                        ))}
                    </div>

                    {/* COUNTER */}
                    <div className="flex items-center gap-2">
                        <span className="font-['Bebas_Neue'] text-[20px] leading-none text-[#e85d3a]">
                            {String(
                                activeIndex + 1
                            ).padStart(2, "0")}
                        </span>

                        <span className="font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/25">
                            /{" "}
                            {String(
                                testimonials.length
                            ).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonailPage;