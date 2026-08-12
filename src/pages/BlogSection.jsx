import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const blogs = [
    {
        id: 1,
        category: "TRAINING",
        date: "AUG 02, 2026",
        title: "How To Build A Stronger Training Routine",
        description:
            "Learn how to create a structured workout routine that keeps you consistent, focused and progressing.",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 2,
        category: "NUTRITION",
        date: "JUL 28, 2026",
        title: "Simple Nutrition Habits For Better Results",
        description:
            "Small changes in your daily nutrition can make a big difference in your energy, recovery and performance.",
        image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 3,
        category: "FITNESS",
        date: "JUL 21, 2026",
        title: "Why Consistency Beats Motivation",
        description:
            "Motivation comes and goes. Discover why building consistent habits are the real key to long-term fitness.",
        image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 4,
        category: "RECOVERY",
        date: "JUL 15, 2026",
        title: "The Importance Of Rest And Recovery",
        description:
            "Training hard is only one part of the process. Learn how proper recovery helps your body perform better.",
        image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    },
];

const BlogSection = () => {
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

                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/${blog.id}`}
                            className="group block"
                        >
                            <article className="h-full overflow-hidden border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">

                                {/* ================= IMAGE ================= */}

                                <div className="relative h-[190px] overflow-hidden sm:h-[205px] lg:h-[190px] xl:h-[205px]">

                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                                    {/* Category */}

                                    <div className="absolute left-3 top-3 bg-[#e85d3a] px-2.5 py-1">

                                        <span className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.1em] text-white sm:text-[10px]">
                                            {blog.category}
                                        </span>

                                    </div>

                                </div>

                                {/* ================= CONTENT ================= */}

                                <div className="p-4 sm:p-4.5">

                                    {/* Date + Arrow */}

                                    <div className="mb-2.5 flex items-center justify-between">

                                        <span className="font-['Barlow'] text-[10px] font-medium uppercase tracking-[0.08em] text-white/35 sm:text-[11px]">
                                            {blog.date}
                                        </span>

                                        <Link to="/blog">

                                            <span className="flex h-6 w-6 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white">
                                                <FaArrowRight size={9} />
                                            </span>
                                        </Link>
                                    </div>

                                    {/* Title */}

                                    <h3 className="font-['Bebas_Neue'] text-[21px] leading-[0.95] tracking-wide text-white transition-colors duration-300 group-hover:text-[#e85d3a] sm:text-[23px] lg:text-[21px] xl:text-[23px]">
                                        {blog.title}
                                    </h3>

                                    {/* Description */}

                                    <p className="mt-2.5 font-['Barlow'] text-[12px] leading-5 text-white/45 sm:text-[13px] sm:leading-[1.55]">
                                        {blog.description}
                                    </p>

                                    {/* Read More */}
                                    <Link to="/blog">
                                        <div className="mt-4 flex items-center gap-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-[#e85d3a] sm:text-[11px]">

                                            Read Article

                                            <FaArrowRight
                                                size={8}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />

                                        </div>
                                    </Link>

                                </div>

                                {/* Bottom Accent */}

                                <div className="h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                            </article>
                        </Link>
                    ))}

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