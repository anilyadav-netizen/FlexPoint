import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Star,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdTrainer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const trainers = [
    {
      id: 1,
      name: "Amit Sharma",
      specialty: "Strength Training",
      experience: "5 Years",
      members: 42,
      rating: "4.9",
      status: "Active",
    },
    {
      id: 2,
      name: "Rohit Verma",
      specialty: "Cardio & HIIT",
      experience: "4 Years",
      members: 36,
      rating: "4.8",
      status: "Active",
    },
    {
      id: 3,
      name: "Deepak Singh",
      specialty: "CrossFit",
      experience: "6 Years",
      members: 31,
      rating: "4.7",
      status: "Active",
    },
    {
      id: 4,
      name: "Vikas Gupta",
      specialty: "Yoga & Flexibility",
      experience: "3 Years",
      members: 28,
      rating: "4.6",
      status: "Inactive",
    },
  ];

  const filteredTrainers = trainers.filter((trainer) =>
    `${trainer.name} ${trainer.specialty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
            Trainers
          </h1>
          <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
            Manage all fitness trainers
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/addtrainer")}
          className="flex items-center gap-2 shrink-0 px-4 py-2.5 bg-[#3420FF] text-white rounded-lg text-sm hover:bg-[#2818D9] transition"
        >
          <Plus size={17} />
          <span className="hidden sm:block">Add Trainer</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Total Trainers
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                18
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
              <Users size={19} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Active Trainers
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                16
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]">
              <UserCheck size={19} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Average Rating
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                4.8
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#FFF8E8] flex items-center justify-center text-[#E7B84B]">
              <Star size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm overflow-hidden mt-4">
        {/* Search */}
        <div className="p-4 sm:p-5 border-b border-[#E7EAED] dark:border-[#303A3F]">
          <div className="relative max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
            />

            <input
              type="text"
              placeholder="Search trainer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#9AA3A6] outline-none focus:border-[#3420FF] transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-[#F8F9FB] dark:bg-[#1C2529]">
              <tr className="text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Trainer
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Specialty
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Experience
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Members
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Rating
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Status
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTrainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EEF6FF] text-[#2679D1] flex items-center justify-center text-sm font-semibold">
                        {trainer.name.charAt(0)}
                      </div>

                      <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                        {trainer.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                    {trainer.specialty}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                    {trainer.experience}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                    {trainer.members}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm text-[#E7B84B]">
                      <Star size={14} fill="currentColor" />
                      <span className="text-[#606E6E] dark:text-[#AEB7BA]">
                        {trainer.rating}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trainer.status === "Active"
                          ? "bg-[#ECFBF5] text-[#38C79A]"
                          : "bg-[#FFF0F0] text-[#E05252]"
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-[#EEF6FF] text-[#2679D1] hover:bg-[#DCEEFF] transition">
                        <Eye size={15} />
                      </button>

                      <button className="p-2 rounded-lg bg-[#FFF8E8] text-[#E7B84B] hover:bg-[#FFF1C7] transition">
                        <Edit size={15} />
                      </button>

                      <button className="p-2 rounded-lg bg-[#FFF0F0] text-[#E05252] hover:bg-[#FFE0E0] transition">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdTrainer;