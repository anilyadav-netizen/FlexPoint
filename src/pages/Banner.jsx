import React from "react";
import { ArrowRight } from "lucide-react";

const Banner = () => {
    return (
        <section
            className="relative w-full overflow-hidden border-y border-white/10 bg-[#0d0d0d] py-7 text-white sm:py-8 md:py-9 lg:py-10"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                <div className="relative flex min-h-[125px] items-center justify-between overflow-hidden border border-white/10 bg-[#111111] px-5 py-5 sm:min-h-[140px] sm:px-8 md:min-h-[150px] md:px-10 lg:min-h-[160px] lg:px-12">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
                        style={{
                            backgroundImage:
                                "url('/src/assets/Images/BannerImage.png')",
                        }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-[#080808]/20" />

                    {/* Orange Glow */}
                    <div className="absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#e85d3a]/10 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10">

                        <h2 className="font-['Bebas_Neue'] text-[20px] leading-[0.85] tracking-wide text-white md:text-[28px] lg:text-[36px]">

                            READY TO TRANSFORM

                            <span className="block text-[#e85d3a]">
                                YOUR LIFE?
                            </span>

                        </h2>

                        <p className="mt-2 font-['Barlow'] text-[8px] leading-4 text-white/65 sm:text-[9px] md:text-[10px]">
                            Join today and become a stronger, healthier and happier you.
                        </p>

                    </div>

                    {/* CTA */}
                    <a
                        href="/contact"
                        className="group relative z-10 flex h-[36px] shrink-0 items-center gap-2 bg-[#e85d3a] px-5 font-['Barlow'] text-[8px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49] sm:h-[40px] sm:px-7 sm:text-[9px] md:h-[42px]"
                        style={{
                            clipPath:
                                "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                        }}
                    >
                        Join Our Community

                        <ArrowRight
                            size={14}
                            strokeWidth={1.8}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>

                    {/* Bottom Accent */}
                    <span className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-[#e85d3a]" />

                </div>

            </div>
        </section>
    );
};

export default Banner;