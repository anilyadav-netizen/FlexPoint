
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaClock, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    getBlog,
    clearSelectedBlog,
} from "../redux/Slicer/blogSlice";

const fallbackImage =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85";

const BlogDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { blog, loading, error } = useSelector(
        (state) => state.blog
    );

    // ============================
    // GET SINGLE BLOG
    // ============================

    useEffect(() => {
        if (id) {
            dispatch(getBlog(id));
        }

        return () => {
            dispatch(clearSelectedBlog());
        };
    }, [dispatch, id]);

    // ============================
    // HELPERS
    // ============================

    const getImage = () => {
        return (
            blog?.image ||
            blog?.imageUrl ||
            blog?.coverImage ||
            fallbackImage
        );
    };

    const formatDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        return parsedDate
            .toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
            .toUpperCase();
    };

    const formatCategory = (category) => {
        if (!category) return "FITNESS";

        return String(category).toUpperCase();
    };

    const formatReadTime = (readTime) => {
        if (!readTime) {
            return "5 MIN READ";
        }

        const value = String(readTime).toUpperCase();

        return value.includes("READ")
            ? value
            : `${value} MIN READ`;
    };

    // ============================
    // LOADING
    // ============================

    if (loading) {
        return (
            <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#0d0d0d] text-white">
                <div className="text-center">
                    <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                    <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                        Loading Article...
                    </p>
                </div>
            </main>
        );
    }

    // ============================
    // ERROR
    // ============================

    if (error) {
        return (
            <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#0d0d0d] px-5 text-white sm:px-8">
                <div className="max-w-[500px] text-center">
                    <p className="text-[24px] font-bold leading-tight text-red-400 sm:text-[28px] md:text-[32px]">
                        ARTICLE NOT FOUND
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-white/40 sm:text-[11px] md:text-[12px]">
                        {error}
                    </p>

                    <Link
                        to="/blogs"
                        className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#e85d3a] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                    >
                        <FaArrowLeft size={8} />
                        Back To Blogs
                    </Link>
                </div>
            </main>
        );
    }

    // ============================
    // NO BLOG
    // ============================

    if (!blog) {
        return (
            <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#0d0d0d] px-5 text-white sm:px-8">
                <div className="text-center">
                    <p className="text-[24px] font-bold leading-tight text-white/40 sm:text-[28px] md:text-[32px]">
                        BLOG NOT FOUND
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-white/30 sm:text-[11px] md:text-[12px]">
                        The article you are looking for does not exist.
                    </p>

                    <Link
                        to="/blogs"
                        className="mt-5 inline-flex items-center gap-2 rounded-md border border-[#e85d3a] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#e85d3a]"
                    >
                        <FaArrowLeft size={8} />
                        Back To Blogs
                    </Link>
                </div>
            </main>
        );
    }

    // ============================
    // DETAIL PAGE
    // ============================

    return (
        <main className="mt-0 w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =========================
                HERO / ARTICLE HEADER
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    {/* BACK BUTTON */}
                    <Link
                        to="/blogs"
                        className="group mb-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40 transition-colors duration-300 hover:text-[#e85d3a] sm:mb-6"
                    >
                        <FaArrowLeft
                            size={8}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Back To Blogs
                    </Link>

                    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">

                        {/* LEFT */}
                        <div>

                            {/* CATEGORY */}
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#e85d3a]" />

                                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                    {formatCategory(blog.category)}
                                </span>
                            </div>

                            {/* TITLE */}
                            <h1 className="max-w-[850px] text-[20px] font-bold leading-tight md:text-[28px]">
                                {blog.title}
                            </h1>

                            {/* DESCRIPTION */}
                            {blog.description && (
                                <p className="mt-2 max-w-[650px] text-[12px] leading-5 text-white/40 md:text-[14px]">
                                    {blog.description}
                                </p>
                            )}

                        </div>

                        {/* RIGHT META */}
                        <div className="lg:justify-self-end">

                            <div className="rounded-md border border-white/10 bg-[#151515] p-4 sm:p-5">

                                <div className="grid grid-cols-2 gap-5">

                                    {/* DATE */}
                                    <div>
                                        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/25">
                                            Published
                                        </span>

                                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white/65 md:text-[11px]">
                                            {formatDate(
                                                blog.date ||
                                                blog.createdAt
                                            )}
                                        </p>
                                    </div>

                                    {/* READ TIME */}
                                    <div>
                                        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/25">
                                            Reading Time
                                        </span>

                                        <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/65 md:text-[11px]">
                                            <FaClock
                                                size={8}
                                                className="text-[#e85d3a]"
                                            />

                                            {formatReadTime(
                                                blog.readTime
                                            )}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================
                COVER IMAGE
            ========================== */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="group relative h-[240px] overflow-hidden rounded-md border border-white/10 bg-[#151515] sm:h-[300px] md:h-[400px] lg:h-[480px]">

                        <img
                            src={getImage()}
                            alt={blog.title || "Fitness Blog"}
                            className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = fallbackImage;
                            }}
                        />

                        {/* DARK OVERLAY */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                        {/* CATEGORY */}
                        <div className="absolute bottom-4 left-4 rounded-md bg-[#e85d3a] px-3 py-1.5 sm:bottom-5 sm:left-5">
                            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                                {formatCategory(blog.category)}
                            </span>
                        </div>

                        {/* NUMBER / DATE */}
                        <div className="absolute right-4 top-4">
                            <span className="text-[18px] font-bold text-white/25 sm:text-[20px]">
                                {formatDate(
                                    blog.date || blog.createdAt
                                )}
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================
                BLOG CONTENT
            ========================== */}
            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[900px] px-5 py-6 sm:px-8 md:py-8 lg:px-10">

                    {/* CONTENT HEADER */}
                    <div className="mb-5">

                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-[2px] w-6 bg-[#e85d3a]" />

                            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a] md:text-[13px]">
                                Article
                            </span>
                        </div>

                        <h2 className="text-[18px] font-bold leading-tight md:text-[22px]">
                            {blog.title}
                        </h2>

                    </div>

                    {/* FULL CONTENT */}
                    <article className="text-[12px] leading-6 text-white/65 sm:text-[13px] sm:leading-7 md:text-[14px]">

                        {blog.content ? (
                            <div className="whitespace-pre-line">
                                {blog.content}
                            </div>
                        ) : (
                            <p className="text-white/30">
                                No article content available.
                            </p>
                        )}

                    </article>

                </div>
            </section>

            {/* =========================
                BOTTOM CTA
            ========================== */}
            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-5 py-6 sm:px-8 md:py-8 lg:px-12 xl:px-[7%]">

                    <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#151515] px-5 py-7 sm:px-8 md:flex md:items-center md:justify-between md:gap-8 md:py-8 lg:px-12">

                        {/* GLOW */}
                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        {/* LEFT */}
                        <div className="relative z-10">

                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#e85d3a] md:text-[11px]">
                                Keep Learning
                            </p>

                            <h2 className="mt-1 text-[18px] font-bold leading-tight md:text-[22px]">
                                EXPLORE MORE
                                <span className="text-[#e85d3a]">
                                    {" "}ARTICLES.
                                </span>
                            </h2>

                            <p className="mt-2 max-w-[560px] text-[11px] leading-5 text-white/40 md:text-[12px]">
                                Discover more training tips, nutrition advice
                                and practical fitness insights.
                            </p>

                        </div>

                        {/* BUTTON */}
                        <Link
                            to="/blogs"
                            className="group relative z-10 mt-5 inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#e85d3a] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] md:mt-0 md:text-[10px]"
                        >
                            View All Blogs

                            <FaArrowRight
                                size={8}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default BlogDetailPage;
