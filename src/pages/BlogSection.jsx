import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux/Slicer/blogSlice";

const fallbackImage =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80";

const BlogSection = () => {
    const dispatch = useDispatch();

    const { blogs, loading, error } = useSelector(
        (state) => state.blog
    );

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    // ============================
    // BACKEND DATA
    // ============================
    const blogList = Array.isArray(blogs) ? blogs : [];

    // ============================
    // ONLY PUBLISHED BLOGS
    // ============================
    const publishedBlogs = useMemo(() => {
        return blogList.filter(
            (blog) => blog.isPublished === true
        );
    }, [blogList]);

    // ============================
    // SHOW LATEST 4 BLOGS
    // ============================
    const latestBlogs = useMemo(() => {
        return publishedBlogs.slice(0, 4);
    }, [publishedBlogs]);

    // ============================
    // GET BLOG ID
    // ============================
    const getBlogId = (blog) => {
        return blog?._id || blog?.id;
    };

    // ============================
    // GET IMAGE
    // ============================
    const getImage = (blog) => {
        return (
            blog?.image ||
            blog?.imageUrl ||
            blog?.coverImage ||
            fallbackImage
        );
    };

    // ============================
    // FORMAT DATE
    // ============================
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

    // ============================
    // FORMAT PROGRAM
    // ============================
    const formatProgram = (program) => {
        if (!program) return "FITNESS";

        return String(program).toUpperCase();
    };

    // ============================
    // LOADING
    // ============================
    if (loading) {
        return (
            <section
                id="blogs"
                className="w-full overflow-hidden border-t border-white/10 bg-[#0d0d0d] py-8 text-white"
            >
                <div className="flex min-h-[250px] items-center justify-center">
                    <div className="text-center">

                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#e85d3a]" />

                        <p className="mt-3 font-['Barlow'] text-[12px] uppercase tracking-[0.1em] text-white/40">
                            Loading Articles...
                        </p>

                    </div>
                </div>
            </section>
        );
    }

    // ============================
    // API ERROR
    // ============================
    if (error) {
        return null;
    }

    // ============================
    // NO BLOGS
    // ============================
    if (latestBlogs.length === 0) {
        return null;
    }

    return (
        <section
            id="blogs"
            className="w-full overflow-hidden border-t border-white/10 bg-[#0d0d0d] py-2 text-white md:py-5 lg:py-6"
        >

            {/* ================= CONTAINER ================= */}

            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= HEADER ================= */}

                <div className="flex items-end justify-between">

                    <div>

                        <h2 className="font-['Bebas_Neue'] text-[20px] leading-none tracking-[0.02em] text-white md:text-[35px] lg:text-[40px]">
                            LATEST{" "}
                            <span className="text-[#e85d3a]">
                                INSIGHTS
                            </span>
                        </h2>

                        <p className="mt-2 max-w-[560px] font-['Barlow'] text-[12px] leading-5 text-white/50 sm:text-[13px] md:text-[14px] md:leading-6">
                            Training tips, nutrition advice and practical fitness
                            insights to help you train smarter and get better results.
                        </p>

                    </div>

                </div>


                {/* ================= BLOG GRID ================= */}

                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3 lg:mt-4 lg:grid-cols-4 lg:gap-4">

                    {latestBlogs.map((blog) => {

                        const blogId = getBlogId(blog);

                        return (
                            <Link
                                key={blogId}
                                to={`/blogs/${blogId}`}
                                className="group block"
                            >

                                {/* ================= BLOG CARD ================= */}

                                <article className="group relative h-full overflow-hidden border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">

                                    {/* ================= IMAGE ================= */}

                                    <div className="relative h-[190px] overflow-hidden sm:h-[205px] lg:h-[190px] xl:h-[205px]">

                                        <img
                                            src={getImage(blog)}
                                            alt={blog.title || "Fitness Blog"}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* IMAGE OVERLAY */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                                        {/* PROGRAM */}

                                        <div className="absolute left-3 top-3 bg-[#e85d3a] px-2.5 py-1">

                                            <span className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.1em] text-white sm:text-[10px]">
                                                {formatProgram(blog.program)}
                                            </span>

                                        </div>

                                    </div>


                                    {/* ================= CONTENT ================= */}

                                    <div className="p-4 sm:p-4.5">

                                        {/* DATE + ARROW */}

                                        <div className="mb-2.5 flex items-center justify-between">

                                            <span className="font-['Barlow'] text-[10px] font-medium uppercase tracking-[0.08em] text-white/35 sm:text-[11px]">
                                                {formatDate(
                                                    blog.date ||
                                                    blog.createdAt
                                                )}
                                            </span>

                                            <span className="flex h-6 w-6 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white">

                                                <FaArrowRight size={9} />

                                            </span>

                                        </div>


                                        {/* TITLE */}

                                        <h3 className="font-['Bebas_Neue'] text-[21px] leading-[0.95] tracking-wide text-white transition-colors duration-300 group-hover:text-[#e85d3a] sm:text-[23px] lg:text-[21px] xl:text-[23px]">
                                            {blog.title}
                                        </h3>


                                        {/* DESCRIPTION */}

                                        <p className="mt-2.5 font-['Barlow'] text-[12px] leading-5 text-white/45 md:text-[14px] sm:leading-[1.55]">
                                            {blog.description}
                                        </p>


                                        {/* READ MORE */}

                                        <div className="mt-4 flex items-center gap-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-[#e85d3a] sm:text-[11px]">

                                            Read Article

                                            <FaArrowRight
                                                size={8}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />

                                        </div>

                                    </div>


                                    {/* ================= BOTTOM ACCENT ================= */}

                                    <span
                                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-[width] duration-300 group-hover:w-full"
                                    />

                                </article>

                            </Link>
                        );
                    })}

                </div>


                {/* ================= VIEW ALL ================= */}

                <div className="mt-4 flex justify-center sm:mt-5">

                    <Link
                        to="/blog"
                        className="group inline-flex h-[40px] items-center gap-2 bg-[#e85d3a] px-6 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] sm:h-[42px] sm:px-7 sm:text-[12px]"
                        style={{
                            clipPath:
                                "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
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
    );
};

export default BlogSection;