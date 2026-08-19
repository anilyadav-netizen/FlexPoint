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

                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                    <p className="mt-4 font-['Barlow'] text-[12px] font-semibold uppercase tracking-[0.15em] text-white/40">
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
            <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#0d0d0d] px-6 text-white">
                <div className="max-w-[500px] text-center">

                    <p className="font-['Bebas_Neue'] text-[38px] text-red-400">
                        ARTICLE NOT FOUND
                    </p>

                    <p className="mt-2 font-['Barlow'] text-[13px] leading-6 text-white/40">
                        {error}
                    </p>

                    <Link
                        to="/blog"
                        className="mt-6 inline-flex items-center gap-2 bg-[#e85d3a] px-6 py-3 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                        style={{
                            clipPath:
                                "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                        }}
                    >
                        <FaArrowLeft size={9} />

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
            <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#0d0d0d] px-6 text-white">
                <div className="text-center">

                    <p className="font-['Bebas_Neue'] text-[36px] text-white/40">
                        BLOG NOT FOUND
                    </p>

                    <p className="mt-2 font-['Barlow'] text-[13px] text-white/30">
                        The article you are looking for does not exist.
                    </p>

                    <Link
                        to="/blogs"
                        className="mt-6 inline-flex items-center gap-2 border border-[#e85d3a] px-6 py-3 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#e85d3a]"
                    >
                        <FaArrowLeft size={9} />

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
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO / ARTICLE HEADER
            ===================================================== */}

            <section className="border-b border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    {/* Back Button */}

                    <Link
                        to="/blogs"
                        className="group mb-6 inline-flex items-center gap-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 transition-colors duration-300 hover:text-[#e85d3a]"
                    >
                        <FaArrowLeft
                            size={9}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back To Blogs
                    </Link>

                    <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-14">

                        {/* LEFT CONTENT */}

                        <div>

                            {/* CATEGORY */}

                            <div className="mb-4 flex items-center gap-3">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="bg-[#e85d3a] px-3 py-1.5 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                                    {formatCategory(blog.category)}
                                </span>

                            </div>

                            {/* TITLE */}

                            <h1 className="max-w-[950px] font-['Bebas_Neue'] text-[42px] leading-[0.82] tracking-[0.01em] sm:text-[52px] md:text-[64px] lg:text-[72px]">

                                {blog.title}

                            </h1>

                            {/* DESCRIPTION */}

                            {blog.description && (
                                <p className="mt-5 max-w-[720px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px] sm:leading-7 md:text-[15px]">
                                    {blog.description}
                                </p>
                            )}

                        </div>

                        {/* RIGHT META */}

                        <div className="lg:justify-self-end">

                            <div className="border border-white/10 bg-[#151515] p-5 sm:p-6">

                                <div className="grid grid-cols-2 gap-5">

                                    {/* DATE */}

                                    <div>

                                        <span className="font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.12em] text-white/25">
                                            Published
                                        </span>

                                        <p className="mt-1 font-['Barlow'] text-[11px] font-medium uppercase tracking-[0.08em] text-white/65">
                                            {formatDate(
                                                blog.date ||
                                                blog.createdAt
                                            )}
                                        </p>

                                    </div>

                                    {/* READ TIME */}

                                    <div>

                                        <span className="font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.12em] text-white/25">
                                            Reading Time
                                        </span>

                                        <p className="mt-1 flex items-center gap-1.5 font-['Barlow'] text-[11px] font-medium uppercase tracking-[0.08em] text-white/65">

                                            <FaClock
                                                size={9}
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

            {/* =====================================================
                COVER IMAGE
            ===================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    <div className="group relative h-[260px] overflow-hidden border border-white/10 bg-[#151515] sm:h-[380px] md:h-[470px] lg:h-[540px]">

                        <img
                            src={getImage()}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            onError={(e) => {
                                e.currentTarget.src = fallbackImage;
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        {/* IMAGE CATEGORY */}

                        <div className="absolute bottom-5 left-5 bg-[#e85d3a] px-3 py-1.5 sm:bottom-7 sm:left-7">

                            <span className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em]">
                                {formatCategory(blog.category)}
                            </span>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                BLOG CONTENT
            ===================================================== */}

            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[900px] px-6 py-7 sm:px-10 md:py-10 lg:px-12">

                    {/* CONTENT LABEL */}

                    <div className="mb-6 flex items-center gap-3">

                        <span className="h-[2px] w-8 bg-[#e85d3a]" />

                        <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                            Article
                        </span>

                    </div>

                    {/* FULL CONTENT */}

                    <article className="font-['Barlow'] text-[14px] leading-7 text-white/65 sm:text-[15px] sm:leading-8">

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

            {/* =====================================================
                BOTTOM CTA
            ===================================================== */}

            <section className="border-t border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-7 sm:px-10 md:py-9 lg:px-16 xl:px-[7%]">

                    <div className="flex flex-col gap-5 border border-white/10 bg-[#151515] px-6 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">

                        <div>

                            <p className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.14em] text-[#e85d3a]">
                                Keep Learning
                            </p>

                            <h2 className="mt-1 font-['Bebas_Neue'] text-[28px] leading-none tracking-wide sm:text-[36px]">
                                EXPLORE MORE
                                <span className="text-[#e85d3a]">
                                    {" "}ARTICLES.
                                </span>
                            </h2>

                            <p className="mt-2 max-w-[550px] font-['Barlow'] text-[12px] leading-5 text-white/35">
                                Discover more training tips, nutrition advice
                                and practical fitness insights.
                            </p>

                        </div>

                        <Link
                            to="/blogs"
                            className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                            style={{
                                clipPath:
                                    "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                            }}
                        >
                            View All Blogs

                            <FaArrowRight
                                size={9}
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