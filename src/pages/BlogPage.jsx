
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux/Slicer/blogSlice";

const fallbackImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85";

const BlogPage = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);
    const [activeProgram, setActiveProgram] = useState("ALL");

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const blogList = Array.isArray(blogs) ? blogs : [];

    const publishedBlogs = useMemo(() => blogList.filter((blog) => blog.isPublished === true), [blogList]);

    const programs = useMemo(() => {
        const uniquePrograms = publishedBlogs
            .map((blog) => blog.program)
            .filter(Boolean)
            .map((program) => String(program).trim())
            .filter((program) => program.length > 0);

        return ["ALL", ...new Set(uniquePrograms)];
    }, [publishedBlogs]);

    const filteredBlogs = useMemo(() => {
        if (activeProgram === "ALL") return publishedBlogs;

        return publishedBlogs.filter(
            (blog) => String(blog.program || "").trim().toLowerCase() === activeProgram.trim().toLowerCase()
        );
    }, [publishedBlogs, activeProgram]);

    const featuredBlog = filteredBlogs[0];
    const remainingBlogs = filteredBlogs.slice(1);

    const getBlogId = (blog) => blog?._id || blog?.id;

    const getImage = (blog) => blog?.image || blog?.imageUrl || blog?.coverImage || fallbackImage;

    const formatDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);
        if (Number.isNaN(parsedDate.getTime())) return "";

        return parsedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).toUpperCase();
    };

    const formatProgram = (program) => program ? String(program).toUpperCase() : "FITNESS";

    const formatReadTime = (readTime) => {
        if (!readTime) return "5 MIN READ";
        if (typeof readTime === "number") return `${readTime} MIN READ`;

        const value = String(readTime).toUpperCase();
        return value.includes("READ") ? value : `${value} MIN READ`;
    };

    return (
        <main className="w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* HERO */}
            <section className="border-b border-white/10">
                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-7 lg:px-16 xl:px-[7%]">
                    <div className="grid items-center gap-6 lg:grid-cols-[1fr_0.7fr] lg:gap-16">

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-[2px] w-8 bg-[#e85d3a]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e85d3a] sm:text-[12px]">
                                    Fitness Center Journal
                                </span>
                            </div>

                            <h1 className="max-w-[700px] text-[28px] font-bold leading-[0.95] tracking-tight sm:text-[34px] md:text-[40px] lg:text-[44px]">
                                TRAIN SMARTER. <span className="text-[#e85d3a]">LIVE STRONGER.</span>
                            </h1>
                        </div>

                        <div className="max-w-[500px] lg:justify-self-end">
                            <p className="text-[13px] leading-6 text-white/50 sm:text-[14px] sm:leading-7">
                                Training tips, nutrition advice, recovery strategies and practical fitness insights to help you make better decisions inside and outside the gym.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <div className="rounded-md border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[11px]">
                                        {publishedBlogs.length} Articles
                                    </span>
                                </div>

                                <div className="rounded-md border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[11px]">
                                        Expert Insights
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PROGRAM BAR */}
            <section className="border-b border-white/10 bg-[#111111]">
                <div className="mx-auto flex w-full max-w-[110rem] items-center gap-2 overflow-x-auto px-6 py-3 sm:px-10 lg:px-16 xl:px-[7%]">
                    <span className="mr-2 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                        Explore:
                    </span>

                    {programs.map((program) => (
                        <button
                            key={program}
                            type="button"
                            onClick={() => setActiveProgram(program)}
                            className={`shrink-0 rounded-md border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                                activeProgram === program
                                    ? "border-[#e85d3a] bg-[#e85d3a] text-white"
                                    : "border-white/10 bg-[#151515] text-white/55 hover:border-[#e85d3a]/60 hover:text-white"
                            }`}
                        >
                            {program}
                        </button>
                    ))}
                </div>
            </section>

            {/* LOADING */}
            {loading && (
                <section className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />
                        <p className="mt-3 text-[12px] uppercase tracking-[0.1em] text-white/40">
                            Loading Articles...
                        </p>
                    </div>
                </section>
            )}

            {/* ERROR */}
            {!loading && error && (
                <section className="px-6 py-20 text-center">
                    <p className="text-[14px] text-red-400">{error}</p>
                </section>
            )}

            {/* EMPTY */}
            {!loading && !error && filteredBlogs.length === 0 && (
                <section className="px-6 py-20 text-center">
                    <p className="text-[14px] text-white/40">No articles found in this program.</p>
                </section>
            )}

            {/* BLOG CONTENT */}
            {!loading && !error && featuredBlog && (
                <>
                    {/* FEATURED ARTICLE */}
                    <section>
                        <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">
                            <div className="mb-5 flex items-center gap-2">
                                <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Featured Article
                                </span>
                            </div>

                            <Link to={`/blogs/${getBlogId(featuredBlog)}`} className="group block">
                                <article className="grid overflow-hidden rounded-lg border border-white/10 bg-[#151515] lg:grid-cols-[1.15fr_0.85fr]">

                                    <div className="relative h-[230px] overflow-hidden sm:h-[300px] lg:h-[340px]">
                                        <img
                                            src={getImage(featuredBlog)}
                                            alt={featuredBlog.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                                        <div className="absolute left-4 top-4 rounded-md bg-[#e85d3a] px-3 py-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
                                                {formatProgram(featuredBlog.program)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/35">
                                                {formatDate(featuredBlog.date || featuredBlog.createdAt)}
                                            </span>

                                            <span className="h-1 w-1 rounded-full bg-[#e85d3a]" />

                                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-white/35">
                                                <FaClock size={9} />
                                                {formatReadTime(featuredBlog.readTime)}
                                            </span>
                                        </div>

                                        <h2 className="mt-4 max-w-[620px] text-[26px] font-bold leading-[1] tracking-tight sm:text-[32px] lg:text-[38px]">
                                            {featuredBlog.title}
                                        </h2>

                                        <p className="mt-4 max-w-[560px] text-[13px] leading-6 text-white/45 sm:text-[14px] sm:leading-7">
                                            {featuredBlog.description}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#e85d3a]">
                                            Read Featured Article
                                            <FaArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>

                                </article>
                            </Link>
                        </div>
                    </section>

                    {/* ALL ARTICLES */}
                    <section className="border-t border-white/10">
                        <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                            Latest From The Gym
                                        </span>
                                    </div>

                                    <h2 className="text-[25px] font-bold leading-none tracking-tight sm:text-[30px] md:text-[34px]">
                                        ALL <span className="text-[#e85d3a]">ARTICLES</span>
                                    </h2>
                                </div>

                                <p className="max-w-[430px] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                                    Practical information to help you train consistently, recover properly and make smarter fitness choices.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                                {remainingBlogs.map((blog, index) => (
                                    <Link key={getBlogId(blog)} to={`/blogs/${getBlogId(blog)}`} className="group block">
                                        <article className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">

                                            <div className="relative h-[205px] overflow-hidden rounded-t-lg sm:h-[220px] lg:h-[210px] xl:h-[225px]">
                                                <img
                                                    src={getImage(blog)}
                                                    alt={blog.title}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                                <div className="absolute left-3 top-3 rounded-md bg-[#e85d3a] px-2.5 py-1">
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.1em]">
                                                        {formatProgram(blog.program)}
                                                    </span>
                                                </div>

                                                <span className="absolute right-3 top-3 text-[18px] font-semibold text-white/40">
                                                    {String(index + 2).padStart(2, "0")}
                                                </span>
                                            </div>

                                            <div className="p-4 sm:p-5">
                                                <div className="mb-2.5 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/35">
                                                            {formatDate(blog.date || blog.createdAt)}
                                                        </span>

                                                        <span className="h-1 w-1 rounded-full bg-white/20" />

                                                        <span className="text-[9px] uppercase tracking-[0.05em] text-white/30">
                                                            {formatReadTime(blog.readTime)}
                                                        </span>
                                                    </div>

                                                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white">
                                                        <FaArrowRight size={8} />
                                                    </span>
                                                </div>

                                                <h3 className="line-clamp-2 text-[19px] leading-[1.05] tracking-tight transition-colors duration-300 group-hover:text-[#e85d3a] sm:text-[21px]">
                                                    {blog.title}
                                                </h3>

                                                <p className="mt-2.5 line-clamp-3 text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-[1.55]">
                                                    {blog.description}
                                                </p>

                                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#e85d3a]">
                                                    Read Article
                                                    <FaArrowRight size={8} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>

                                            <span className="pointer-events-none absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />
                                        </article>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </section>
                </>
            )}

            {/* PHILOSOPHY */}
            <section className="border-y border-white/10 bg-[#111111]">
                <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">
                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-[2px] w-7 bg-[#e85d3a]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Our Philosophy
                                </span>
                            </div>

                            <h2 className="text-[25px] font-bold leading-[0.95] tracking-tight sm:text-[31px] md:text-[36px]">
                                KNOWLEDGE <span className="block text-[#e85d3a]">BUILDS RESULTS.</span>
                            </h2>

                            <p className="mt-3 max-w-[480px] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
                                The better you understand your training, nutrition and recovery, the better decisions you can make for your body and your long-term fitness journey.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {[
                                { number: "01", title: "TRAIN", text: "Follow structured training and focus on quality movement." },
                                { number: "02", title: "RECOVER", text: "Give your body the rest and nutrition it needs to adapt." },
                                { number: "03", title: "PROGRESS", text: "Stay consistent and let small improvements build over time." },
                            ].map((item) => (
                                <div key={item.number} className="rounded-md border border-white/10 bg-[#151515] p-4 transition-colors duration-300 hover:border-[#e85d3a]/50 sm:p-5">
                                    <span className="text-[17px] font-bold text-[#e85d3a]">{item.number}</span>
                                    <h3 className="mt-2 text-[18px] font-bold leading-none tracking-tight">{item.title}</h3>
                                    <p className="mt-2 text-[11px] leading-5 text-white/35 sm:text-[12px]">{item.text}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section>
                <div className="mx-auto w-full max-w-[110rem] px-6 py-6 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:py-10 lg:px-14">

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-[680px]">

                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e85d3a] sm:text-[12px]">
                                    Keep Learning
                                </p>

                                <h2 className="text-[26px] font-bold leading-[0.95] tracking-tight sm:text-[32px] md:text-[38px]">
                                    YOUR FITNESS. <span className="text-[#e85d3a]">YOUR JOURNEY.</span>
                                </h2>

                                <p className="mt-3 max-w-[560px] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                                    Ready to turn what you learn into action? Explore our programs or connect with our team to find the right training path for you.
                                </p>
                            </div>

                            <Link
                                to="/programs"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-md bg-[#e85d3a] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] sm:text-[12px]"
                            >
                                Explore Programs
                                <FaArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default BlogPage;

