import HeroImage from "../assets/Images/HeroImage.png";
import MobileImage from "../assets/Images/MobileImage.png";
import React from "react";
import {
    ArrowRight,
    Play,
    Users,
    UserRound,
    CalendarDays,
    Star,
    MapPin,
    Clock3,
} from "lucide-react";

const Hero = () => {
    const stats = [
        {
            icon: Users,
            value: "20K+",
            label: "Happy Members",
        },
        {
            icon: UserRound,
            value: "50+",
            label: "Expert Trainers",
        },
        {
            icon: CalendarDays,
            value: "100+",
            label: "Weekly Classes",
        },
        {
            icon: Star,
            value: "10+",
            label: "Years Experience",
        },
        {
            icon: MapPin,
            value: "5",
            label: "Locations",
        },
        {
            icon: Clock3,
            value: "24/7",
            label: "Member Support",
        },
    ];

    return (
        <section
            id="home"
            className="relative flex w-full min-h-[30vh] overflow-hidden bg-[#F4F0EC] text-[#16251F] md:min-h-[620px] lg:min-h-screen lg:max-h-[550px]"
        >

            <div
                className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
                style={{
                    backgroundImage: `url(${HeroImage})`,
                }}
            >
                {/* Background Overlay */}

                <div className="absolute inset-0 bg-black/10" />

                {/* =================================================
                    MAIN CONTAINER
                ================================================== */}

                <div className="relative z-10 mx-auto h-full min-h-[620px] w-full max-w-[1600px] px-6 sm:px-8 md:px-10 lg:min-h-[calc(100vh-72px)] lg:px-12 xl:px-14 2xl:px-16">

                    {/* =================================================
                        HERO CONTENT
                    ================================================== */}

                    <div className="flex min-h-[620px] items-center lg:min-h-[calc(100vh-72px)]">

                        <div
                            className="
                                w-full
                                max-w-[470px]
                                pb-[120px]
                                sm:max-w-[500px]
                                md:max-w-[480px]
                                md:pb-[130px]
                                lg:max-w-[570px]
                                lg:pb-[90px]
                            "
                        >

                            {/* =================================================
                                LABEL
                            ================================================== */}

                            <div
                                className="
                                    mb-4
                                    inline-flex
                                    items-center
                                    border
                                    border-[#e85d3a]/40
                                    bg-[#0d0d0d]/60
                                    px-3
                                    py-1.5
                                    backdrop-blur-sm
                                    sm:mb-5
                                    sm:px-4
                                    sm:py-2
                                "
                            >

                                <span
                                    className="
                                        mr-2
                                        h-[7px]
                                        w-[3px]
                                        -skew-x-[25deg]
                                        bg-[#e85d3a]
                                        sm:h-[8px]
                                    "
                                />

                                <span
                                    className="
                                        font-['Barlow']
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.1em]
                                        text-[#e85d3a]
                                        sm:text-[10px]
                                        md:text-[10px]
                                        lg:text-[11px]
                                    "
                                >
                                    Train Hard. Stay Consistent.
                                </span>

                            </div>


                            {/* =================================================
                                HEADING
                            ================================================== */}

                            <h1
                                className="
                                    font-['Bebas_Neue']
                                    text-[32px]
                                    leading-[0.86]
                                    tracking-[0.01em]
                                    text-white

                                    sm:text-[36px]

                                    md:text-[38px]

                                    lg:text-[48px]
                                "
                            >
                                STRONGER BODY

                                <br />

                                <span className="bg-gradient-to-r from-[#e85d3a] via-[#f06440] to-[#b93420] bg-clip-text text-transparent">
                                    BETTER LIFE
                                </span>
                            </h1>


                            {/* =================================================
                                DESCRIPTION
                            ================================================== */}

                            <p
                                className="
                                    mt-3
                                    max-w-[390px]
                                   
                                    text-[14px]
                                    leading-[1.5]
                                    text-white/75
                                    md:mt-4
                                    md:max-w-[400px]
                                    md:text-[15px]
                                    lg:mt-6
                                    lg:max-w-[430px]
                                    lg:text-[16px]
                                    lg:leading-[1.55]
                                "
                            >
                                Expert coaching, premium equipment and a
                                supportive community to help you crush your
                                goals and become your best.
                            </p>


                            {/* =================================================
                                BUTTONS
                            ================================================== */}

                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-3

                                    sm:mt-6

                                    md:mt-6

                                    lg:mt-7
                                    lg:gap-4
                                "
                            >

                                {/* Primary */}

                                <a
                                    href="/programs"
                                    className="
                                        group
                                        relative
                                        flex
                                        h-[42px]
                                        items-center
                                        gap-2
                                        overflow-hidden
                                        bg-[#e85d3a]
                                        px-5
                                        font-['Barlow']
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:bg-[#f06a49]

                                        sm:h-[44px]
                                        sm:px-6

                                        md:h-[45px]

                                        lg:h-[48px]
                                        lg:gap-3
                                        lg:px-7
                                        lg:text-[13px]
                                    "
                                    style={{
                                        clipPath:
                                            "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                    }}
                                >
                                    <span className="relative z-10">
                                        GET STARTED
                                    </span>

                                    <ArrowRight
                                        size={14}
                                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 lg:size-[17px]"
                                    />

                                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        OFFER CARD
                    ================================================== */}

                    <div
                        className="
                            absolute
                            right-6
                            top-[105px]
                            w-[150px]
                            border
                            border-[#e85d3a]/40
                            bg-[#0d0d0d]/80
                            p-4
                            backdrop-blur-md

                            sm:right-8
                            sm:top-[115px]
                            sm:w-[160px]

                            md:right-10
                            md:top-[110px]
                            md:w-[165px]

                            lg:right-12
                            lg:top-[145px]
                            lg:w-[175px]
                            lg:p-5

                            xl:right-14
                            rounded-md
                        "
                    >

                        <p
                            className="
                                font-['Barlow']
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-wide
                                text-[#e85d3a]

                                sm:text-[9px]

                                lg:text-[10px]
                            "
                        >
                            New Member Offer
                        </p>


                        <div
                            className="
                                mt-1
                                font-['Bebas_Neue']
                                text-[38px]
                                leading-none
                                text-white

                                sm:text-[42px]

                                md:text-[44px]

                                lg:text-[48px]
                            "
                        >
                            10%

                            <span className="text-[#e85d3a]">
                                {" "}OFF
                            </span>
                        </div>


                        <p
                            className="
                                mt-1
                                font-['Barlow']
                                text-[8px]
                                uppercase
                                leading-tight
                                text-white/70

                                lg:mt-2
                                lg:text-[10px]
                            "
                        >
                            On all membership plans
                        </p>


                        <a
                            href="#membership"
                            className="
                                mt-3
                                flex
                                h-[34px]
                                items-center
                                justify-center
                                bg-[#e85d3a]
                                font-['Barlow']
                                text-[9px]
                                font-bold
                                uppercase
                                text-white
                                transition-colors
                                hover:bg-[#f06a49]

                                sm:h-[36px]

                                lg:mt-4
                                lg:h-[38px]
                                lg:text-[11px]
                            "
                            style={{
                                clipPath:
                                    "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                            }}
                        >
                            Claim Offer
                        </a>

                    </div>


                    {/* =================================================
                        DESKTOP STATS
                    ================================================== */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-6
                            right-6

                            sm:left-8
                            sm:right-8

                            md:left-10
                            md:right-10

                            lg:left-12
                            lg:right-12

                            xl:left-14
                            xl:right-14

                            2xl:left-16
                            2xl:right-16
                        "
                    >

                        <div
                            className="
                                grid
                                grid-cols-3
                                border
                                border-white/10
                                bg-[#111111]/90
                                backdrop-blur-md

                                md:grid-cols-6
                                rounded-md
                            "
                        >

                            {stats.map((item, index) => {

                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            px-3
                                            py-3

                                            sm:gap-2
                                            sm:px-4
                                            sm:py-3.5

                                            md:gap-2
                                            md:px-3
                                            md:py-3

                                            lg:gap-3
                                            lg:px-5
                                            lg:py-4

                                            ${index < 3
                                                ? "border-b border-white/10 md:border-b-0"
                                                : ""
                                            }

                                            ${index % 3 !== 2
                                                ? "border-r border-white/10 md:border-r border-white/10"
                                                : "md:border-r-0"
                                            }
                                        `}
                                    >

                                        <Icon
                                            size={20}
                                            strokeWidth={1.5}
                                            className="shrink-0 text-[#e85d3a] sm:size-[22px] md:size-[23px] lg:size-[29px]"
                                        />

                                        <div className="min-w-0">

                                            <div
                                                className="
                                                    font-['Bebas_Neue']
                                                    text-[18px]
                                                    leading-none
                                                    text-white

                                                    sm:text-[20px]

                                                    md:text-[20px]

                                                    lg:text-[23px]
                                                "
                                            >
                                                {item.value}
                                            </div>

                                            <div
                                                className="
                                                    mt-0.5
                                                    whitespace-nowrap
                                                    font-['Barlow']
                                                    text-[8px]
                                                    font-medium
                                                    text-white/55

                                                    sm:text-[9px]

                                                    md:text-[8px]

                                                    lg:mt-1
                                                    lg:text-[10px]
                                                "
                                            >
                                                {item.label}
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>
            </div>


            {/* =====================================================
                MOBILE HERO
            ====================================================== */}

            <div
                className="
                    relative
                    min-h-[400px]
                    w-full
                    bg-cover
                    bg-center
                    bg-no-repeat
                    md:hidden
                "
                style={{
                    backgroundImage: `url(${MobileImage})`,
                }}
            >

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-[#0d0d0d]/90" />


                {/* Content */}

                <div
                    className="
                        relative
                        z-10
                        flex
                        min-h-[400px]
                        flex-col
                        justify-end
                        px-5
                        pb-6

                        sm:px-8
                        sm:pb-7
                    "
                >

                    <div className="max-w-[500px]">

                        {/* Label */}

                        <div className="mb-2 inline-flex items-center border border-[#e85d3a]/40 bg-black/60 px-3 py-1.5 backdrop-blur-sm">

                            <span className="mr-2 h-[7px] w-[3px] -skew-x-[25deg] bg-[#e85d3a]" />

                            <span className="font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.1em] text-[#e85d3a]">
                                Train Hard. Stay Consistent.
                            </span>

                        </div>


                        {/* Heading */}

                        <h1
                            className="
                                font-['Bebas_Neue']
                                text-[32px]
                                leading-[0.86]
                                tracking-wide
                                text-white

                                sm:text-[38px]
                            "
                        >
                            STRONGER BODY

                            <br />

                            <span className="bg-gradient-to-r from-[#e85d3a] to-[#a82f20] bg-clip-text text-transparent">
                                BETTER LIFE
                            </span>
                        </h1>


                        {/* Description */}

                        <p className="mt-2 max-w-[400px] text-[14px] leading-[1.5] text-white/75 md:text-[16px]">
                            Expert coaching, premium equipment and a
                            supportive community to help you crush your
                            goals and become your best.
                        </p>


                        {/* Buttons */}

                        <div className="mt-3 flex gap-3">

                            <a
                                href="/programs"
                                className="flex h-[43px] items-center gap-2 bg-[#e85d3a] px-5 text-[10px] font-bold uppercase text-white sm:h-[45px] sm:text-[11px]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                GET STARTED

                                <ArrowRight size={14} />
                            </a>

                        </div>

                    </div>


                    {/* =================================================
                        MOBILE STATS
                    ================================================== */}

                    <div className="mt-6 grid grid-cols-3 border rounded-xl border-white/10 bg-black/60 backdrop-blur-md sm:mt-7 ">

                        {stats.map((item, index) => {

                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        px-2.5
                                        py-3
                                        sm:px-3
                                        rounded-md
                                        

                                        ${index < 3
                                            ? "border-b border-white/10"
                                            : ""
                                        }

                                        ${index % 3 !== 2
                                            ? "border-r border-white/10"
                                            : ""
                                        }
                                    `}
                                >

                                    <Icon
                                        size={19}
                                        strokeWidth={1.5}
                                        className="shrink-0 text-[#e85d3a]"
                                    />

                                    <div>

                                        <div className=" text-[17px] leading-none text-white">
                                            {item.value}
                                        </div>

                                        <div className="mt-0.5 text-[10px] text-white/55 md:text-[12px]">
                                            {item.label}
                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;