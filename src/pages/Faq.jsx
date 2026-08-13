import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "WHAT MEMBERSHIP PLANS DO YOU OFFER?",
            answer: "We offer flexible membership plans designed for different fitness goals and schedules. You can choose from monthly, quarterly and long-term plans with access to our training programs and facilities.",
        },
        {
            question: "DO I NEED FITNESS EXPERIENCE TO JOIN?",
            answer: "Not at all. Our programs are suitable for beginners as well as experienced members. Our expert trainers help you choose the right training intensity based on your fitness level and goals.",
        },
        {
            question: "DO YOU PROVIDE PERSONAL TRAINING?",
            answer: "Yes. Our certified trainers provide personalized training sessions based on your goals, fitness level and workout preferences.",
        },
        {
            question: "WHAT TYPES OF WORKOUTS ARE AVAILABLE?",
            answer: "We offer strength training, HIIT, cardio, functional training, flexibility sessions and other fitness programs designed to improve strength, endurance and overall performance.",
        },
        {
            question: "CAN I TRY THE GYM BEFORE GETTING A MEMBERSHIP?",
            answer: "Yes, you can contact our team to learn about available trial sessions and schedule a visit to experience our facilities and training environment.",
        },
        {
            question: "HOW OFTEN SHOULD I WORK OUT?",
            answer: "For most people, training three to five times per week can provide great results. Your ideal schedule depends on your goals, recovery and current fitness level.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#0d0d0d] py-3 text-white md:py-5 lg:py-8">
            <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#e85d3a]/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[#e85d3a]/5 blur-3xl" />

            <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e85d3a]/40 to-transparent" />

            <div className="mx-auto w-full max-w-[110rem] px-6 sm:px-10 lg:px-16 xl:px-[7%]">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-16">

                    {/* LEFT CONTENT */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-[2px] w-6 bg-[#e85d3a]" />
                            <span className="font-['Barlow'] text-[8px] uppercase tracking-[0.18em] text-white/30">
                                Need To Know
                            </span>
                        </div>

                        <h2 className="font-['Bebas_Neue'] text-[24px] leading-[0.9] tracking-wide text-white md:text-[40px] lg:text-[48px]">
                            FREQUENTLY
                            <br />
                            ASKED <span className="text-[#e85d3a]">QUESTIONS</span>
                        </h2>

                        <p className="mt-5 max-w-[400px] font-['Barlow'] text-[10px] leading-[1.7] text-white/45 sm:text-[11px]">
                            Everything you need to know about our memberships, training
                            programs and fitness experience. Can't find your answer?
                            Contact our team and we'll be happy to help.
                        </p>

                        <div className="mt-8 flex items-center gap-3 border-l-2 border-[#e85d3a] pl-4">
                            <div>
                                <p className="font-['Bebas_Neue'] text-[22px] leading-none text-[#e85d3a]">
                                    24/7
                                </p>
                                <p className="mt-1 font-['Barlow'] text-[8px] uppercase tracking-[0.12em] text-white/30">
                                    Support Available
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ LIST */}
                    <div className="border-t border-white/10">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="border-b border-white/10"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="group flex w-full items-center justify-between gap-5 py-5 text-left transition-all duration-300 md:py-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span
                                                className={`pt-0.5 font-['Bebas_Neue'] text-[13px] transition-colors duration-300 ${isOpen ? "text-[#e85d3a]" : "text-white/20"
                                                    }`}
                                            >
                                                0{index + 1}
                                            </span>

                                            <span
                                                className={`font-['Bebas_Neue'] text-[18px] leading-tight tracking-wide transition-colors duration-300 sm:text-[20px] ${isOpen
                                                        ? "text-[#e85d3a]"
                                                        : "text-white group-hover:text-[#e85d3a]"
                                                    }`}
                                            >
                                                {faq.question}
                                            </span>
                                        </div>

                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${isOpen
                                                    ? "border-[#e85d3a] bg-[#e85d3a] text-white"
                                                    : "border-white/15 text-white/40 group-hover:border-[#e85d3a] group-hover:text-[#e85d3a]"
                                                }`}
                                        >
                                            {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="pb-6 pl-9 pr-10">
                                                <p className="max-w-[650px] font-['Barlow'] text-[10px] leading-[1.7] text-white/45 sm:text-[11px]">
                                                    {faq.answer}
                                                </p>

                                                <div className="mt-4 h-[1px] w-8 bg-[#e85d3a]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* BOTTOM STRIP */}
                <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <span className="h-[2px] w-6 bg-[#e85d3a]" />
                        <span className="font-['Barlow'] text-[8px] uppercase tracking-[0.15em] text-white/25">
                            Your Questions. Our Answers.
                        </span>
                    </div>

                    <span className="font-['Barlow'] text-[9px] text-white/30">
                        Ready to start your fitness journey?
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Faq;