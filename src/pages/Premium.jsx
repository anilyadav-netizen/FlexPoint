import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Check,
    ArrowRight,
    Crown,
} from "lucide-react";

import MobileImage from "../assets/Images/MobileImage.png";
import { getPlans } from "../redux/Slicer/planSlice";

const Premium = () => {
    const dispatch = useDispatch();

    const {
        plans,
        loading,
        error,
    } = useSelector((state) => state.plans);

    useEffect(() => {
        dispatch(getPlans(true));
    }, [dispatch]);

    return (
        <section
            id="membership"
            className="w-full overflow-hidden border-t border-white/10 bg-[#0d0d0d] py-3 text-white sm:py-11 md:py-6 lg:py-8"
        >
            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

                {/* ================= HEADING ================= */}
                <div className="mb-9 flex items-center">
                    <h2 className="whitespace-nowrap font-['Bebas_Neue'] text-[27px] leading-none tracking-[0.02em] text-white sm:text-[31px] md:text-[35px] lg:text-[39px]">
                        MEMBERSHIP{" "}
                        <span className="text-[#e85d3a]">
                            PLANS
                        </span>
                    </h2>
                </div>

                {/* ================= MAIN LAYOUT ================= */}
                <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.43fr] lg:gap-5">

                    {/* ================= PLANS ================= */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">

                        {/* ================= LOADING ================= */}
                        {loading && (
                            <div className="col-span-full flex min-h-[255px] items-center justify-center font-['Barlow'] text-sm text-white/60">
                                Loading membership plans...
                            </div>
                        )}

                        {/* ================= ERROR ================= */}
                        {!loading && error && (
                            <div className="col-span-full flex min-h-[255px] items-center justify-center font-['Barlow'] text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* ================= EMPTY ================= */}
                        {!loading && !error && plans.length === 0 && (
                            <div className="col-span-full flex min-h-[255px] items-center justify-center font-['Barlow'] text-sm text-white/60">
                                No membership plans available.
                            </div>
                        )}

                        {/* ================= DYNAMIC PLANS ================= */}
                        {!loading &&
                            !error &&
                            plans.map((plan) => (
                                <article
                                    key={plan._id}
                                    className={`group relative flex min-h-[255px] flex-col overflow-visible border bg-[#111111] p-5 transition-all duration-300 sm:min-h-[265px] sm:p-4 md:p-5 lg:min-h-[255px] ${
                                        plan.popular
                                            ? "border-[#e85d3a]/70 shadow-[0_0_25px_rgba(232,93,58,0.08)]"
                                            : "border-white/15 hover:border-[#e85d3a]/50"
                                    }`}
                                >

                                    {/* ================= POPULAR BADGE ================= */}
                                    {plan.popular && (
                                        <div
                                            className="absolute -top-[26px] left-0 flex h-[26px] w-[78%] items-center gap-2 bg-[#e85d3a] px-3 font-['Barlow'] text-[8px] font-semibold uppercase tracking-[0.08em] text-white"
                                            style={{
                                                clipPath:
                                                    "polygon(8% 0, 100% 0, 94% 100%, 0 100%)",
                                            }}
                                        >
                                            <Crown
                                                size={11}
                                                strokeWidth={1.8}
                                            />

                                            Most Popular
                                        </div>
                                    )}

                                    {/* ================= PLAN NAME ================= */}
                                    <div className="text-center">
                                        <h3 className="font-['Barlow'] text-[9px] font-medium uppercase tracking-[0.08em] text-white/75">
                                            {plan.name}
                                        </h3>

                                        <div className="mt-2 flex items-end justify-center gap-1">
                                            <span className="font-['Barlow'] text-[25px] font-bold leading-none text-white sm:text-[27px]">
                                                ₹
                                                {Number(
                                                    plan.price
                                                ).toLocaleString("en-IN")}
                                            </span>

                                            <span className="mb-0.5 font-['Barlow'] text-[7px] text-white/45">
                                                /month
                                            </span>
                                        </div>
                                    </div>

                                    {/* ================= FEATURES ================= */}
                                    <div className="mt-5 flex-1 space-y-2.5">

                                        {plan.features?.map(
                                            (feature, index) => (
                                                <div
                                                    key={`${plan._id}-${index}`}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <Check
                                                        size={13}
                                                        strokeWidth={2.5}
                                                        className="mt-[2px] shrink-0 text-[#e85d3a]"
                                                    />

                                                    <span className="font-['Barlow'] text-[14px] leading-[1.4] text-white/70">
                                                        {index + 1}.{" "}
                                                        {feature}
                                                    </span>
                                                </div>
                                            )
                                        )}

                                    </div>

                                    {/* ================= CHOOSE PLAN ================= */}
                                    <button
                                        type="button"
                                        className="group/btn mt-5 flex h-[34px] w-full items-center justify-center gap-2 bg-[#e85d3a] font-['Barlow'] text-[8px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                        style={{
                                            clipPath:
                                                "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
                                        }}
                                    >
                                        Choose Plan

                                        <ArrowRight
                                            size={12}
                                            strokeWidth={1.8}
                                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                        />
                                    </button>

                                    {/* ================= BOTTOM ACCENT ================= */}
                                    <span
                                        className={`absolute bottom-0 left-0 h-[2px] bg-[#e85d3a] transition-all duration-300 ${
                                            plan.popular
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    />
                                </article>
                            )
                        )}

                    </div>

                    {/* ================= PROMOTIONAL IMAGE ================= */}
                    <div className="group relative min-h-[260px] overflow-hidden border border-white/15 bg-[#151515] sm:min-h-[280px] lg:min-h-full">

                        <img
                            src={MobileImage}
                            alt="Fitness Center Membership"
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/40 via-transparent to-[#e85d3a]/5" />

                        {/* PROMO CONTENT */}
                        <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between p-5 sm:min-h-[280px] sm:p-6">

                            <div className="max-w-[180px]">

                                <span className="font-['Barlow'] text-[8px] font-bold uppercase tracking-[0.15em] text-[#e85d3a]">
                                    Train Different
                                </span>

                                <h3 className="mt-2 font-['Bebas_Neue'] text-[24px] leading-[0.88] tracking-wide text-white lg:text-[32px]">
                                    DISCIPLINE TODAY

                                    <span className="block text-[#e85d3a]">
                                        STRENGTH TOMORROW
                                    </span>
                                </h3>

                            </div>

                            {/* JOIN NOW */}
                            <button
                                type="button"
                                className="group/cta flex h-[37px] w-fit items-center gap-2 bg-[#e85d3a] px-6 font-['Barlow'] text-[8px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#f16a49]"
                                style={{
                                    clipPath:
                                        "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
                                }}
                            >
                                Join Now

                                <ArrowRight
                                    size={13}
                                    strokeWidth={1.8}
                                    className="transition-transform duration-300 group-hover/cta:translate-x-1"
                                />
                            </button>

                        </div>

                        {/* BOTTOM ACCENT */}
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e85d3a]" />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Premium;