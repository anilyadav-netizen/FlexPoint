import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  UserCheck,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getTrainers,
  deleteTrainer,
  clearTrainerError,
  clearTrainerSuccess,
} from "../../redux/Slicer/trainerSlice";

const AdTrainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    trainers = [],
    loading,
    error,
  } = useSelector((state) => state.trainer);

  const [search, setSearch] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // ============================
  // GET TRAINERS
  // ============================
  useEffect(() => {
    dispatch(getTrainers());

    return () => {
      dispatch(clearTrainerError());
      dispatch(clearTrainerSuccess());
    };
  }, [dispatch]);

  // ============================
  // SEARCH
  // ============================
  const filteredTrainers = trainers.filter((trainer) =>
    `${trainer.name || ""} ${trainer.specialty || ""} ${trainer.role || ""
      } ${trainer.number || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ============================
  // STATS
  // ============================
  const totalTrainers = trainers.length;

  const activeTrainers = trainers.filter(
    (trainer) => trainer.isActive
  ).length;

  // ============================
  // DELETE
  // ============================
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    dispatch(deleteTrainer(id));
  };

  // ============================
  // EDIT
  // ============================
  const handleEdit = (trainer) => {
    navigate("/admin/addtrainer", {
      state: {
        trainer,
        isEdit: true,
      },
    });
  };

  // ============================
  // VIEW
  // ============================
  const handleView = (trainer) => {
    setSelectedTrainer(trainer);
  };

  // ============================
  // CLOSE MODAL
  // ============================
  const closeModal = () => {
    setSelectedTrainer(null);
  };

  return (
    <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10 transition-colors duration-300">
      {/* ============================ */}
      {/* HEADER */}
      {/* ============================ */}
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

          <span className="hidden sm:block">
            Add Trainer
          </span>
        </button>
      </div>

      {/* ============================ */}
      {/* STATS */}
      {/* ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* TOTAL */}
        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Total Trainers
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                {totalTrainers}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#2679D1]">
              <Users size={19} />
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Active Trainers
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                {activeTrainers}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#ECFBF5] flex items-center justify-center text-[#38C79A]">
              <UserCheck size={19} />
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] p-4 sm:p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA]">
                Inactive Trainers
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-2">
                {totalTrainers - activeTrainers}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#FFF0F0] flex items-center justify-center text-[#E05252]">
              <Users size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================ */}
      {/* TABLE */}
      {/* ============================ */}
      <div className="bg-white dark:bg-[#1C2529] rounded-xl border border-[#E2E6E8] dark:border-[#303A3F] shadow-sm overflow-hidden mt-4">
        {/* SEARCH */}
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

        {/* ============================ */}
        {/* LOADING */}
        {/* ============================ */}
        {loading && (
          <div className="py-12 text-center text-sm text-[#778387] dark:text-[#AEB7BA]">
            Loading trainers...
          </div>
        )}

        {/* ============================ */}
        {/* ERROR */}
        {/* ============================ */}
        {!loading && error && (
          <div className="py-12 text-center">
            <p className="text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={() => dispatch(getTrainers())}
              className="mt-3 px-4 py-2 bg-[#3420FF] text-white rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ============================ */}
        {/* DATA TABLE */}
        {/* ============================ */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-[#F8F9FB] dark:bg-[#1C2529]">
                <tr className="text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                    Trainer
                  </th>

                  <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                    Number
                  </th>

                  <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                    Specialty
                  </th>

                  <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                    Experience
                  </th>

                  <th className="px-5 py-3.5 text-xs font-semibold text-[#778387] dark:text-[#AEB7BA]">
                    Role
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
                {filteredTrainers.length > 0 ? (
                  filteredTrainers.map((trainer) => (
                    <tr
                      key={trainer._id}
                      className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-[#222D31] transition"
                    >
                      {/* TRAINER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {trainer.image ? (
                            <img
                              src={trainer.image}
                              alt={trainer.name}
                              className="w-9 h-9 rounded-full object-cover border border-[#E2E6E8] dark:border-[#303A3F]"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#EEF6FF] text-[#2679D1] flex items-center justify-center text-sm font-semibold">
                              {trainer.name?.charAt(0)}
                            </div>
                          )}

                          <div>
                            <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] block">
                              {trainer.name}
                            </span>

                            <span className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                              {trainer.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* NUMBER */}
                      <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                        {trainer.number}
                      </td>

                      {/* SPECIALTY */}
                      <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                        {trainer.specialty}
                      </td>

                      {/* EXPERIENCE */}
                      <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                        {trainer.experience}
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                        {trainer.role}
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${trainer.isActive
                            ? "bg-[#ECFBF5] text-[#38C79A]"
                            : "bg-[#FFF0F0] text-[#E05252]"
                            }`}
                        >
                          {trainer.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* VIEW */}
                          <button
                            onClick={() =>
                              handleView(trainer)
                            }
                            className="p-2 rounded-lg bg-[#EEF6FF] text-[#2679D1] hover:bg-[#DCEEFF] transition"
                            title="View Trainer"
                          >
                            <Eye size={15} />
                          </button>

                          {/* EDIT */}
                          <button
                            onClick={() =>
                              handleEdit(trainer)
                            }
                            className="p-2 rounded-lg bg-[#FFF8E8] text-[#E7B84B] hover:bg-[#FFF1C7] transition"
                            title="Edit Trainer"
                          >
                            <Edit size={15} />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                trainer._id,
                                trainer.name
                              )
                            }
                            className="p-2 rounded-lg bg-[#FFF0F0] text-[#E05252] hover:bg-[#FFE0E0] transition"
                            title="Delete Trainer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-12 text-center text-sm text-[#778387] dark:text-[#AEB7BA]"
                    >
                      {search
                        ? "No trainers found."
                        : "No trainers available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* VIEW TRAINER MODAL */}
      {/* ================================================== */}
      {selectedTrainer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7EAED] dark:border-[#303A3F]">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                  Trainer Details
                </h2>

                <p className="text-xs sm:text-sm text-[#778387] dark:text-[#AEB7BA] mt-1">
                  Complete trainer information
                </p>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg bg-[#F5F7F9] dark:bg-[#12181B] text-[#606E6E] dark:text-[#AEB7BA] hover:text-red-500 transition"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6">
              {/* PROFILE */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* IMAGE */}
                <div className="shrink-0">
                  {selectedTrainer.image ? (
                    <img
                      src={selectedTrainer.image}
                      alt={selectedTrainer.name}
                      className="w-28 h-28 rounded-2xl object-cover border border-[#E2E6E8] dark:border-[#303A3F]"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-[#EEF6FF] text-[#2679D1] flex items-center justify-center text-3xl font-bold">
                      {selectedTrainer.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* NAME / ROLE */}
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                    {selectedTrainer.name}
                  </h3>

                  <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                    {selectedTrainer.role}
                  </p>

                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTrainer.isActive
                        ? "bg-[#ECFBF5] text-[#38C79A]"
                        : "bg-[#FFF0F0] text-[#E05252]"
                        }`}
                    >
                      {selectedTrainer.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                {/* NUMBER */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Trainer Number
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.number || "—"}
                  </p>
                </div>

                {/* NAME */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Full Name
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.name || "—"}
                  </p>
                </div>

                {/* ROLE */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Role
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.role || "—"}
                  </p>
                </div>

                {/* SPECIALTY */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Specialty
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.specialty || "—"}
                  </p>
                </div>

                {/* EXPERIENCE */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Experience
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.experience || "—"}
                  </p>
                </div>

                {/* ICON */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Icon
                  </p>

                  <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7] mt-1">
                    {selectedTrainer.icon || "Users"}
                  </p>
                </div>

                {/* STATUS */}
                <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F] sm:col-span-2">
                  <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                    Status
                  </p>

                  <p
                    className={`text-sm font-medium mt-1 ${selectedTrainer.isActive
                      ? "text-[#38C79A]"
                      : "text-[#E05252]"
                      }`}
                  >
                    {selectedTrainer.isActive
                      ? "Active"
                      : "Inactive"}
                  </p>
                </div>
              </div>

              {/* DATES */}
              {(selectedTrainer.createdAt ||
                selectedTrainer.updatedAt) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {selectedTrainer.createdAt && (
                      <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                        <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                          Created At
                        </p>

                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                          {new Date(
                            selectedTrainer.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {selectedTrainer.updatedAt && (
                      <div className="p-4 rounded-xl bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E7EAED] dark:border-[#303A3F]">
                        <p className="text-xs text-[#778387] dark:text-[#8F9A9E]">
                          Last Updated
                        </p>

                        <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">
                          {new Date(
                            selectedTrainer.updatedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E7EAED] dark:border-[#303A3F]">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] text-sm text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#F5F7F9] dark:hover:bg-[#12181B] transition"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const trainer = selectedTrainer;

                  closeModal();

                  handleEdit(trainer);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm hover:bg-[#2818D9] transition"
              >
                <Edit size={15} />
                Edit Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdTrainer;