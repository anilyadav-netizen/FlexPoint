import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock } from "react-icons/fa";

const blogs = [
    {
        id: 1,
        category: "TRAINING",
        date: "AUG 02, 2026",
        readTime: "5 MIN READ",
        title: "How To Build A Stronger Training Routine",
        description:
            "Learn how to create a structured workout routine that keeps you consistent, focused and progressing.",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 2,
        category: "NUTRITION",
        date: "JUL 28, 2026",
        readTime: "6 MIN READ",
        title: "Simple Nutrition Habits For Better Results",
        description:
            "Small changes in your daily nutrition can make a big difference in your energy, recovery and performance.",
        image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 3,
        category: "FITNESS",
        date: "JUL 21, 2026",
        readTime: "4 MIN READ",
        title: "Why Consistency Beats Motivation",
        description:
            "Motivation comes and goes. Discover why building consistent habits is the real key to long-term fitness.",
        image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 4,
        category: "RECOVERY",
        date: "JUL 15, 2026",
        readTime: "5 MIN READ",
        title: "The Importance Of Rest And Recovery",
        description:
            "Training hard is only one part of the process. Learn how proper recovery helps your body perform better.",
        image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 5,
        category: "STRENGTH",
        date: "JUL 10, 2026",
        readTime: "7 MIN READ",
        title: "How To Start Strength Training The Right Way",
        description:
            "A practical guide to building strength with proper technique, progressive training and smart exercise selection.",
        image:
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 6,
        category: "CARDIO",
        date: "JUL 05, 2026",
        readTime: "5 MIN READ",
        title: "Cardio Training Without Losing Strength",
        description:
            "Discover how to combine cardiovascular training with strength work without compromising your progress.",
        image:
            "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 7,
        category: "MINDSET",
        date: "JUN 29, 2026",
        readTime: "4 MIN READ",
        title: "Build A Fitness Mindset That Lasts",
        description:
            "Long-term fitness starts with the right mindset. Learn how to stay disciplined when motivation gets low.",
        image:
            "https://images.unsplash.com/photo-1526401485004-2aa7e3d6c0c7?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 8,
        category: "MOBILITY",
        date: "JUN 22, 2026",
        readTime: "5 MIN READ",
        title: "Why Mobility Should Be Part Of Your Training",
        description:
            "Better mobility can improve movement quality, training performance and everyday physical comfort.",
        image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 9,
        category: "WELLNESS",
        date: "JUN 16, 2026",
        readTime: "6 MIN READ",
        title: "Small Daily Habits That Improve Your Fitness",
        description:
            "Fitness is not only about workouts. These simple daily habits can help you become healthier and more consistent.",
        image:
            "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 10,
        category: "TRAINING",
        date: "JUN 10, 2026",
        readTime: "6 MIN READ",
        title: "Train Smarter And Make Every Session Count",
        description:
            "Learn how to structure your workouts so every session has a clear purpose and contributes to your goals.",
        image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 11,
        category: "NUTRITION",
        date: "JUN 04, 2026",
        readTime: "5 MIN READ",
        title: "What To Eat Before And After Training",
        description:
            "Understand the basics of pre-workout and post-workout nutrition to support energy and recovery.",
        image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 12,
        category: "RECOVERY",
        date: "MAY 28, 2026",
        readTime: "4 MIN READ",
        title: "Recovery Mistakes That Could Slow Your Progress",
        description:
            "Training harder is not always better. Avoid these common recovery mistakes and give your body time to adapt.",
        image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85",
    },
];

const categories = [
    "ALL",
    "TRAINING",
    "NUTRITION",
    "FITNESS",
    "RECOVERY",
    "MINDSET",
];

const BlogPage = () => {
    const featuredBlog = blogs[0];
    const remainingBlogs = blogs.slice(1);

    return (
        <main className="mt-[0px] w-full overflow-hidden bg-[#0d0d0d] text-white">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="border-b border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-4 sm:px-10 md:py-7 lg:px-16 xl:px-[7%]">

                    <div className="grid items-end gap-5 lg:grid-cols-[1fr_0.7fr] lg:gap-16">

                        {/* LEFT */}

                        <div>

                            <div className="mb-3 flex items-center gap-2">

                                <span className="h-[2px] w-8 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e85d3a] sm:text-[13px]">
                                    Fitness Center Journal
                                </span>

                            </div>

                            <h1 className="max-w-[850px] font-['Bebas_Neue'] text-[32px] leading-[0.82] tracking-[0.01em] sm:text-[42px] md:text-[52px]">

                                TRAIN SMARTER.

                                <span className="text-[#e85d3a]">
                                    {" "}LIVE STRONGER.
                                </span>

                            </h1>

                        </div>

                        {/* RIGHT */}

                        <div className="max-w-[500px] lg:justify-self-end">

                            <p className="font-['Barlow'] text-[13px] leading-6 text-white/50 sm:text-[14px] sm:leading-7">
                                Training tips, nutrition advice, recovery strategies
                                and practical fitness insights to help you make
                                better decisions inside and outside the gym.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                                <div className="border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[11px]">
                                        12+ Articles
                                    </span>
                                </div>

                                <div className="border border-white/10 bg-[#151515] px-3.5 py-2">
                                    <span className="font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[11px]">
                                        Expert Insights
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CATEGORY BAR
            ====================================================== */}

            <section className="border-b border-white/10 bg-[#111111]">

                <div className="mx-auto flex w-full max-w-[110rem] items-center gap-2 overflow-x-auto px-6 py-3 sm:px-10 lg:px-16 xl:px-[7%]">

                    <span className="mr-2 shrink-0 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                        Explore:
                    </span>

                    {categories.map((category, index) => (
                        <button
                            key={category}
                            type="button"
                            className={`shrink-0 border px-4 py-2 font-['Barlow'] text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${index === 0
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
                FEATURED ARTICLE
            ====================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    <div className="mb-5 flex items-center gap-2">

                        <span className="h-[2px] w-7 bg-[#e85d3a]" />

                        <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                            Featured Article
                        </span>

                    </div>

                    <Link
                        to={`/blogs/${featuredBlog.id}`}
                        className="group block"
                    >

                        <article className="grid overflow-hidden border border-white/10 bg-[#151515] lg:grid-cols-[1.15fr_0.85fr]">

                            {/* IMAGE */}

                            <div className="relative h-[230px] overflow-hidden sm:h-[300px] lg:h-[350px]">

                                <img
                                    src={featuredBlog.image}
                                    alt={featuredBlog.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                                <div className="absolute left-4 top-4 bg-[#e85d3a] px-3 py-1.5">

                                    <span className="font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em]">
                                        {featuredBlog.category}
                                    </span>

                                </div>

                            </div>


                            {/* CONTENT */}

                            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">

                                <div className="flex items-center gap-4">

                                    <span className="font-['Barlow'] text-[10px] font-medium uppercase tracking-[0.08em] text-white/35">
                                        {featuredBlog.date}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-[#e85d3a]" />

                                    <span className="flex items-center gap-1.5 font-['Barlow'] text-[10px] uppercase tracking-[0.08em] text-white/35">
                                        <FaClock size={9} />
                                        {featuredBlog.readTime}
                                    </span>

                                </div>

                                <h2 className="mt-4 font-['Bebas_Neue'] text-[32px] leading-[0.88] tracking-wide sm:text-[42px] lg:text-[48px]">

                                    {featuredBlog.title}

                                </h2>

                                <p className="mt-4 max-w-[560px] font-['Barlow'] text-[13px] leading-6 text-white/45 sm:text-[14px] sm:leading-7">
                                    {featuredBlog.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.1em] text-[#e85d3a]">

                                    Read Featured Article

                                    <FaArrowRight
                                        size={9}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />

                                </div>

                            </div>

                        </article>

                    </Link>

                </div>

            </section>


            {/* =====================================================
                ALL ARTICLES
            ====================================================== */}

            <section className="border-t border-white/10">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    {/* HEADER */}

                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Latest From The Gym
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[26px] leading-[0.85] tracking-wide sm:text-[34px] md:text-[40px]">

                                ALL

                                <span className="text-[#e85d3a]">
                                    {" "}ARTICLES
                                </span>

                            </h2>

                        </div>

                        <p className="max-w-[430px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                            Practical information to help you train consistently,
                            recover properly and make smarter fitness choices.
                        </p>

                    </div>


                    {/* BLOG GRID */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">

                        {remainingBlogs.map((blog) => (

                            <Link
                                key={blog.id}
                                to={""}
                                className="group block"
                            >

                                <article className="h-full overflow-hidden border border-white/10 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">

                                    {/* IMAGE */}

                                    <div className="relative h-[205px] overflow-hidden sm:h-[220px] lg:h-[210px] xl:h-[225px]">

                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                        {/* CATEGORY */}

                                        <div className="absolute left-3 top-3 bg-[#e85d3a] px-2.5 py-1">

                                            <span className="font-['Barlow'] text-[9px] font-bold uppercase tracking-[0.1em]">
                                                {blog.category}
                                            </span>

                                        </div>

                                        {/* NUMBER */}

                                        <span className="absolute right-3 top-3 font-['Bebas_Neue'] text-[20px] text-white/40">
                                            {String(blog.id).padStart(2, "0")}
                                        </span>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-4 sm:p-5">

                                        <div className="mb-2.5 flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <span className="font-['Barlow'] text-[10px] font-medium uppercase tracking-[0.08em] text-white/35">
                                                    {blog.date}
                                                </span>

                                                <span className="h-1 w-1 rounded-full bg-white/20" />

                                                <span className="font-['Barlow'] text-[9px] uppercase tracking-[0.05em] text-white/30">
                                                    {blog.readTime}
                                                </span>

                                            </div>

                                            <span className="flex h-6 w-6 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#e85d3a] group-hover:bg-[#e85d3a] group-hover:text-white">

                                                <FaArrowRight size={8} />

                                            </span>

                                        </div>


                                        <h3 className="font-['Bebas_Neue'] text-[22px] leading-[0.92] tracking-wide transition-colors duration-300 group-hover:text-[#e85d3a] sm:text-[24px]">

                                            {blog.title}

                                        </h3>


                                        <p className="mt-2.5 font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-[1.55]">

                                            {blog.description}

                                        </p>


                                        <div className="mt-4 flex items-center gap-2 font-['Barlow'] text-[10px] font-bold uppercase tracking-[0.1em] text-[#e85d3a]">

                                            Read Article

                                            <FaArrowRight
                                                size={8}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />

                                        </div>

                                    </div>


                                    {/* BOTTOM ACCENT */}

                                    <div className="h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                                </article>

                            </Link>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                FITNESS PHILOSOPHY
            ====================================================== */}

            <section className="border-y border-white/10 bg-[#111111]">

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">

                        {/* LEFT */}

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="h-[2px] w-7 bg-[#e85d3a]" />

                                <span className="font-['Barlow'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Our Philosophy
                                </span>

                            </div>

                            <h2 className="font-['Bebas_Neue'] text-[27px] leading-[0.84] tracking-wide sm:text-[36px] md:text-[45px]">

                                KNOWLEDGE

                                <span className="block text-[#e85d3a]">
                                    BUILDS RESULTS.
                                </span>

                            </h2>

                            <p className="mt-3 max-w-[480px] font-['Barlow'] text-[13px] leading-6 text-white/40 sm:text-[14px] sm:leading-7">
                                The better you understand your training, nutrition
                                and recovery, the better decisions you can make
                                for your body and your long-term fitness journey.
                            </p>

                        </div>


                        {/* RIGHT */}

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                            {[
                                {
                                    number: "01",
                                    title: "TRAIN",
                                    text: "Follow structured training and focus on quality movement.",
                                },
                                {
                                    number: "02",
                                    title: "RECOVER",
                                    text: "Give your body the rest and nutrition it needs to adapt.",
                                },
                                {
                                    number: "03",
                                    title: "PROGRESS",
                                    text: "Stay consistent and let small improvements build over time.",
                                },
                            ].map((item) => (

                                <div
                                    key={item.number}
                                    className="border border-white/10 bg-[#151515] p-4 transition-colors duration-300 hover:border-[#e85d3a]/50 sm:p-5"
                                >

                                    <span className="font-['Bebas_Neue'] text-[20px] text-[#e85d3a]">
                                        {item.number}
                                    </span>

                                    <h3 className="mt-2 font-['Bebas_Neue'] text-[21px] leading-none tracking-wide">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 font-['Barlow'] text-[11px] leading-5 text-white/35 sm:text-[12px]">
                                        {item.text}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ====================================================== */}

            <section>

                <div className="mx-auto w-full max-w-[110rem] px-6 py-5 sm:px-10 md:py-8 lg:px-16 xl:px-[7%]">

                    <div className="relative overflow-hidden border border-white/10 bg-[#151515] px-6 py-8 sm:px-10 md:py-10 lg:px-14">

                        {/* Accent */}

                        <div className="absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div className="max-w-[680px]">

                                <p className="mb-2 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.14em] text-[#e85d3a]">
                                    Keep Learning
                                </p>

                                <h2 className="font-['Bebas_Neue'] text-[28px] leading-[0.85] tracking-wide sm:text-[38px] md:text-[48px]">

                                    YOUR FITNESS.

                                    <span className="text-[#e85d3a]">
                                        {" "}YOUR JOURNEY.
                                    </span>

                                </h2>

                                <p className="mt-3 max-w-[560px] font-['Barlow'] text-[12px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                                    Ready to turn what you learn into action?
                                    Explore our programs or connect with our
                                    team to find the right training path for you.
                                </p>

                            </div>


                            <Link
                                to="/programs"
                                className="group inline-flex w-fit shrink-0 items-center gap-3 bg-[#e85d3a] px-7 py-3.5 font-['Barlow'] text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] sm:text-[12px]"
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

        </main>
    );
};

export default BlogPage;