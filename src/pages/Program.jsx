import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dumbbell,
  HeartPulse,
  Leaf,
  CircleGauge,
  Users,
  PersonStanding,
  ArrowRight,
} from "lucide-react";

import { getPrograms } from "../redux/Slicer/programSlice";

const iconMap = {
  Dumbbell,
  HeartPulse,
  Leaf,
  CircleGauge,
  Users,
  PersonStanding,
};

const Program = () => {
  const dispatch = useDispatch();
  const {
    programs,
    loading,
    error,
  } = useSelector((state) => state.program);
  const programList = Array.isArray(programs)
    ? programs
    : [];

  useEffect(() => {
    dispatch(getPrograms(true));
  }, [dispatch]);

  const displayedPrograms = programList
    .filter(
      (item) =>
        item?.isActive === true ||
        item?.isActive === "true"
    )
    .slice(0, 5);

  return (
    <section
      id="programs"
      className="w-full overflow-hidden bg-[#0d0d0d] py-3 text-white sm:py-4 md:py-6 lg:py-8"
    >
      <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">

        <div className="mb-6 text-center sm:mb-7 md:mb-8">

          <h2 className="whitespace-nowrap font-['Bebas_Neue'] text-[24px] leading-none tracking-[0.01em] text-white sm:text-[30px] md:text-[38px] lg:text-[42px]">
            EXPLORE OUR{" "}
            <span className="text-[#e85d3a]">
              PROGRAMS
            </span>
          </h2>

          <p className="mt-1.5 text-[13px] leading-5 text-white/60 md:text-[15px]">
            Diverse training options for every fitness
            level and goal.
          </p>
        </div>

        {/* =====================================================
                    LOADING
                ===================================================== */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center">

              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#e85d3a]" />

              <p className="mt-3 text-sm text-white/60">
                Loading programs...
              </p>

            </div>
          </div>
        )}

        {/* =====================================================
                    ERROR
                ===================================================== */}
        {!loading && error && (
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* =====================================================
                    EMPTY
                ===================================================== */}
        {!loading &&
          !error &&
          displayedPrograms.length === 0 && (
            <div className="flex min-h-[250px] items-center justify-center">
              <p className="text-sm text-white/60">
                No programs available.
              </p>
            </div>
          )}

        {/* =====================================================
                    PROGRAM GRID
                ===================================================== */}
        {!loading &&
          !error &&
          displayedPrograms.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-2.5 xl:gap-3">

              {displayedPrograms.map((item) => {
                const Icon =
                  iconMap[item?.icon] ||
                  Dumbbell;

                return (
                  <article
                    key={item?._id}
                    className="group relative h-[280px] overflow-hidden rounded-lg border border-white/15 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-[#e85d3a]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] md:h-[310px] lg:h-[320px]"
                  >

                    {/* =================================================
                                            BACKGROUND IMAGE
                                        ================================================= */}
                    {item?.image ? (
                      <img
                        src={item.image}
                        alt={
                          `${item?.title || ""} ${item?.subtitle || ""}`.trim() ||
                          "Fitness Program"
                        }
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#151515]" />
                    )}

                    {/* =================================================
                                            IMAGE OVERLAY
                                        ================================================= */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[#080808]/95" />

                    <div className="absolute inset-0 bg-[#e85d3a]/0 transition-colors duration-300 group-hover:bg-[#e85d3a]/5" />

                    {/* =================================================
                                            CARD CONTENT
                                        ================================================= */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-3.5 sm:p-4 lg:p-3 xl:p-3.5">

                      {/* =================================================
                                                ICON
                                            ================================================= */}
                      <div className="flex h-7 w-7 items-center justify-center text-[#e85d3a] sm:h-8 sm:w-8 lg:h-7 lg:w-7">

                        <Icon
                          size={24}
                          strokeWidth={1.5}
                        />

                      </div>

                      {/* =================================================
                                                BOTTOM CONTENT
                                            ================================================= */}
                      <div className="max-w-full">

                        {/* TITLE */}
                        <h3
                          className="font-['Bebas_Neue'] text-[22px] leading-[0.9] tracking-wide text-white sm:text-[24px] lg:text-[19px] xl:text-[21px] line-clamp-2"
                        >
                          {item?.title || "Fitness Program"}

                          {item?.subtitle && (
                            <>
                              {" "}
                              <span className="text-white/90">
                                {item.subtitle}
                              </span>
                            </>
                          )}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className="mt-2 max-w-[95%] line-clamp-2 text-[13px] leading-[1.4] text-white/60 lg:mt-1.5 lg:text-[14px] xl:text-[15px]"
                        >
                          {item?.description ||
                            "Improve your fitness, strength and overall performance."}
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                                            BOTTOM ACCENT
                                        ================================================= */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e85d3a] transition-all duration-300 group-hover:w-full" />

                  </article>
                );
              })}

            </div>
          )}

        {/* =====================================================
                    VIEW ALL BUTTON
                ===================================================== */}
        <div className="mt-5 flex justify-center sm:mt-6 md:mt-7">

          <a
            href="/programs"
            className="group flex h-[40px] items-center gap-2 border border-[#e85d3a] bg-transparent px-6 font-['Barlow'] text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#e85d3a] hover:text-white sm:h-[42px] sm:px-7 sm:text-[10px]"
            style={{
              clipPath:
                "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
            }}
          >
            View All Programs

            <ArrowRight
              size={14}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Program;