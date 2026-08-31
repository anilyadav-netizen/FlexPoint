
import React, { useEffect, useRef, useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTestimonials } from "../redux/Slicer/testimonialSlice";

const TestimonailPage = () => {
    const dispatch = useDispatch();
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { testimonials = [], loading, error } = useSelector(
        (state) => state.testimonial
    );

    // GET ACTIVE TESTIMONIALS
    useEffect(() => {
        dispatch(getActiveTestimonials());
    }, [dispatch]);

    // RESET ACTIVE INDEX
    useEffect(() => {
        if (testimonials.length === 0) {
            setActiveIndex(0);
            return;
        }

        if (activeIndex >= testimonials.length) {
            setActiveIndex(testimonials.length - 1);
        }
    }, [testimonials.length, activeIndex]);

    // GET IMAGE URL
    const getImageUrl = (testimonial) => {
        if (!testimonial) return "";

        if (
            typeof testimonial.image === "string" &&
            testimonial.image.trim() !== ""
        ) {
            return testimonial.image.trim();
        }

        if (
            typeof testimonial.imageUrl === "string" &&
            testimonial.imageUrl.trim() !== ""
        ) {
            return testimonial.imageUrl.trim();
        }

        if (
            typeof testimonial.photo === "string" &&
            testimonial.photo.trim() !== ""
        ) {
            return testimonial.photo.trim();
        }

        return "";
    };

    // GET INITIALS
    const getInitials = (testimonial) => {
        if (testimonial?.initials) {
            return testimonial.initials.substring(0, 2).toUpperCase();
        }

        if (testimonial?.name) {
            return testimonial.name.substring(0, 2).toUpperCase();
        }

        return "GY";
    };

    // SCROLL SLIDER
    const scrollSlider = (direction) => {
        if (!sliderRef.current) return;

        const scrollAmount = window.innerWidth < 640 ? 300 : 420;

        sliderRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    // HANDLE SCROLL
    const handleScroll = () => {
        if (!sliderRef.current) return;

        const firstCard = sliderRef.current.firstElementChild;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = 16;

        if (!cardWidth) return;

        const index = Math.round(
            sliderRef.current.scrollLeft / (cardWidth + gap)
        );

        setActiveIndex(
            Math.min(
                Math.max(index, 0),
                Math.max(testimonials.length - 1, 0)
            )
        );
    };

    // SCROLL TO CARD
    const scrollToCard = (index) => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.children[index];
        if (!card) return;

        sliderRef.current.scrollTo({
            left: card.offsetLeft,
            behavior: "smooth",
        });

        setActiveIndex(index);
    };

    // IMAGE ERROR HANDLER
    const handleImageError = (event) => {
        event.currentTarget.style.display = "none";

        const fallback =
            event.currentTarget.parentElement?.querySelector(
                ".testimonial-image-fallback"
            );

        if (fallback) {
            fallback.classList.remove("hidden");
            fallback.classList.add("flex");
        }
    };

    // LOADING
    if (loading) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-10 text-white sm:py-12 lg:py-16"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="flex min-h-[250px] items-center justify-center">
                        <p className="text-[13px] text-white/50 sm:text-[14px]">
                            Loading testimonials...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // ERROR
    if (error) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-10 text-white sm:py-12 lg:py-16"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="flex min-h-[250px] items-center justify-center">
                        <p className="text-[13px] text-red-400 sm:text-[14px]">
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // NO TESTIMONIALS
    if (testimonials.length === 0) {
        return (
            <section
                id="testimonials"
                className="w-full overflow-hidden bg-[#0d0d0d] py-10 text-white sm:py-12 lg:py-16"
            >
                <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                    <div className="mb-7">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[1px] w-7 bg-[#e85d3a]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[12px]">
                                CLIENT STORIES
                            </span>
                        </div>

                        <h2 className="text-[14px] font-bold leading-tight tracking-wide text-white sm:text-[15px] md:text-[16px]">
                            WHAT OUR{" "}
                            <span className="text-[#e85d3a]">
                                MEMBERS SAY
                            </span>
                        </h2>
                    </div>

                    <p className="text-[13px] text-white/40 sm:text-[14px]">
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

                {/* HEADER */}
                <div className="mb-7 flex flex-col gap-5 sm:mb-9 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[1px] w-7 bg-[#e85d3a]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#e85d3a] sm:text-[12px]">
                                CLIENT STORIES
                            </span>
                        </div>

                        <h2 className="text-[14px] font-bold leading-tight tracking-wide text-white sm:text-[15px] md:text-[16px] lg:text-[24px]">
                            WHAT OUR{" "}
                            <span className="text-[#e85d3a]">
                                MEMBERS SAY
                            </span>
                        </h2>

                        <p className="mt-3 max-w-[500px] text-[12px] leading-6 text-white/45 sm:text-[13px] md:text-[14px]">
                            Real stories from real members who are working
                            every day to become stronger, healthier and better.
                        </p>
                    </div>

                    {/* ARROWS */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scrollSlider("prev")}
                            className="group flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-[#151515] text-white/60 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            aria-label="Previous testimonials"
                        >
                            <ArrowLeft size={15} strokeWidth={1.5} />
                        </button>

                        <button
                            onClick={() => scrollSlider("next")}
                            className="group flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-[#151515] text-white/60 transition-all duration-300 hover:border-[#e85d3a] hover:bg-[#e85d3a] hover:text-white"
                            aria-label="Next testimonials"
                        >
                            <ArrowRight size={15} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* TESTIMONIAL SLIDER */}
                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {testimonials.map((testimonial, index) => {
                        const imageUrl = getImageUrl(testimonial);

                        return (
                            <article
                                key={testimonial._id}
                                className="group relative min-w-[88%] snap-start overflow-hidden rounded-lg border border-white/10 bg-[#151515] p-4 transition-all duration-500 hover:border-[#e85d3a]/50 sm:min-w-[47%] sm:p-5 lg:min-w-[31.5%] xl:min-w-[31.8%]"
                            >
                                {/* TOP LINE */}
                                <span className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-60 bg-[#e85d3a] transition-transform duration-500 group-hover:scale-x-100" />

                                {/* NUMBER */}
                                <span className="absolute right-4 top-3 text-[28px] font-bold leading-none text-white/[0.035] transition-colors duration-300 group-hover:text-[#e85d3a]/10 sm:text-[32px]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* TOP */}
                                <div className="flex items-start justify-between">
                                    {/* QUOTE */}
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e85d3a]/10 text-[#e85d3a] transition-all duration-300 group-hover:bg-[#e85d3a] group-hover:text-white">
                                        <Quote size={17} strokeWidth={1.4} />
                                    </div>

                                    {/* RATING */}
                                    <div className="flex gap-1 pt-1">
                                        {Array.from({
                                            length: Math.min(
                                                Math.max(
                                                    Number(
                                                        testimonial.rating
                                                    ) || 0,
                                                    0
                                                ),
                                                5
                                            ),
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
                                <p className="mt-4 text-[13px] leading-6 text-white/60 sm:mt-5 sm:text-[14px] md:text-[15px]">
                                    "{testimonial.review}"
                                </p>

                                {/* DIVIDER */}
                                <div className="my-4 h-[1px] w-full bg-white/10 sm:my-5" />

                                {/* MEMBER */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">

                                        {/* AVATAR */}
                                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={
                                                        testimonial.name ||
                                                        "Member"
                                                    }
                                                    className="block h-full w-full rounded-full object-cover"
                                                    onError={
                                                        handleImageError
                                                    }
                                                />
                                            ) : null}

                                            {/* INITIALS FALLBACK */}
                                            <div
                                                className={`testimonial-image-fallback absolute inset-0 items-center justify-center rounded-full bg-[#e85d3a] text-[11px] font-bold text-white ${
                                                    imageUrl
                                                        ? "hidden"
                                                        : "flex"
                                                }`}
                                            >
                                                {getInitials(testimonial)}
                                            </div>
                                        </div>

                                        {/* NAME + ROLE */}
                                        <div>
                                            <h3 className="text-[13px] font-bold tracking-wide text-white sm:text-[14px]">
                                                {testimonial.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/35">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* VERIFIED */}
                                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#e85d3a] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        VERIFIED
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* BOTTOM NAVIGATION */}
                <div className="mt-3 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* DOTS */}
                    <div className="flex items-center gap-1.5">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToCard(index)}
                                className={`h-[2px] rounded-full transition-all duration-300 ${
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
                        <span className="text-[17px] font-bold leading-none text-[#e85d3a] sm:text-[19px]">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[10px] uppercase tracking-[0.1em] text-white/25">
                            / {String(testimonials.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonailPage;

