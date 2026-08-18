import React, { useEffect, useMemo, useState } from "react";
import {
    Search,
    Eye,
    Trash2,
    X,
    Users,
    MessageSquare,
    CheckCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllContacts,
    getContactById,
    deleteContact,
    clearContactError,
    clearContactSuccess,
    clearSelectedContact,
} from "../../redux/Slicer/contactSlice";
import { toast } from "react-toastify";

const AdContact = () => {
    const dispatch = useDispatch();

    const {
        contacts = [],
        selectedContact,
        loading,
        error,
        success,
    } = useSelector((state) => state.contact);

    const [search, setSearch] = useState("");

    // =========================================
    // GET ALL CONTACTS
    // =========================================
    useEffect(() => {
        dispatch(getAllContacts());
    }, [dispatch]);

    // =========================================
    // SUCCESS / ERROR HANDLING
    // =========================================
    useEffect(() => {
        if (success) {
            toast.success(success);
            dispatch(clearContactSuccess());
        }

        if (error) {
            toast.error(error);
            dispatch(clearContactError());
        }
    }, [success, error, dispatch]);

    // =========================================
    // SEARCH
    // =========================================
    const filteredContacts = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return contacts;
        }

        return contacts.filter((contact) => {
            return `${contact.name || ""} ${contact.email || ""} ${
                contact.mobile || ""
            } ${contact.message || ""}`
                .toLowerCase()
                .includes(searchText);
        });
    }, [contacts, search]);

    // =========================================
    // VIEW CONTACT
    // =========================================
    const handleView = async (id) => {
        const result = await dispatch(getContactById(id));

        if (!getContactById.fulfilled.match(result)) {
            toast.error(
                result.payload || "Failed to get contact details"
            );
        }
    };

    // =========================================
    // DELETE CONTACT
    // =========================================
    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this inquiry?"
            )
        ) {
            return;
        }

        const result = await dispatch(deleteContact(id));

        if (deleteContact.fulfilled.match(result)) {
            toast.success(
                result.payload?.message ||
                    "Contact deleted successfully"
            );
        } else {
            toast.error(
                result.payload || "Failed to delete contact"
            );
        }
    };

    // =========================================
    // CLOSE MODAL
    // =========================================
    const handleCloseModal = () => {
        dispatch(clearSelectedContact());
    };

    // =========================================
    // TODAY'S MESSAGES
    // =========================================
    const todaysMessages = contacts.filter((contact) => {
        if (!contact.createdAt) return false;

        const today = new Date();
        const created = new Date(contact.createdAt);

        return today.toDateString() === created.toDateString();
    }).length;

    return (
        <div className="min-h-full bg-[#F5F7F9] p-5 dark:bg-[#12181B] sm:p-8 lg:p-10">
            <div>
                {/* =========================================
                    HEADER
                ========================================= */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-[#1F272B] dark:text-[#F4F6F7] sm:text-2xl">
                        Contact Inquiries
                    </h1>

                    <p className="mt-1 text-xs text-[#606E6E] dark:text-[#AEB7BA] sm:text-sm">
                        Manage customer contact messages
                    </p>
                </div>

                {/* =========================================
                    STATS
                ========================================= */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* TOTAL */}
                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    Total Messages
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {contacts.length}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#3420FF] dark:bg-[#3420FF]/10">
                                <MessageSquare size={20} />
                            </div>
                        </div>
                    </div>

                    {/* NEW */}
                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    New Messages
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {contacts.length}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-500/10">
                                <Users size={20} />
                            </div>
                        </div>
                    </div>

                    {/* TODAY */}
                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    Today's Messages
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {todaysMessages}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-500 dark:bg-yellow-500/10">
                                <MessageSquare size={20} />
                            </div>
                        </div>
                    </div>

                    {/* LATEST */}
                    <div className="rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                    Latest Message
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    {contacts.length > 0 ? "New" : "—"}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500 dark:bg-green-500/10">
                                <CheckCircle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    SEARCH
                ========================================= */}
                <div className="mb-6 rounded-xl border border-[#E2E6E8] bg-white p-4 dark:border-[#303A3F] dark:bg-[#1C2529]">
                    <div className="relative max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]"
                        />

                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full rounded-lg border border-[#E2E6E8] bg-[#F8F9FB] py-2.5 pl-10 pr-4 text-sm text-[#1F272B] outline-none placeholder:text-[#778387] focus:border-[#3420FF] dark:border-[#303A3F] dark:bg-[#12181B] dark:text-[#F4F6F7]"
                        />
                    </div>
                </div>

                {/* =========================================
                    TABLE
                ========================================= */}
                <div className="overflow-hidden rounded-xl border border-[#E2E6E8] bg-white dark:border-[#303A3F] dark:bg-[#1C2529]">
                    <div className="flex items-center gap-2 border-b border-[#E7EAED] px-5 py-4 dark:border-[#303A3F]">
                        <Users
                            size={19}
                            className="text-[#3420FF]"
                        />

                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                            Contact Messages
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] text-left dark:bg-[#12181B]">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Contact
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Message
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Date
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-5 py-16 text-center text-sm text-[#778387]"
                                        >
                                            Loading contact messages...
                                        </td>
                                    </tr>
                                ) : filteredContacts.length > 0 ? (
                                    filteredContacts.map(
                                        (contact) => (
                                            <tr
                                                key={contact._id}
                                                className="border-t border-[#E7EAED] transition hover:bg-[#F8F9FB] dark:border-[#303A3F] dark:hover:bg-white/[0.02]"
                                            >
                                                {/* NAME */}
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                        {contact.name ||
                                                            "—"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                                        {contact.email ||
                                                            "—"}
                                                    </p>
                                                </td>

                                                {/* CONTACT */}
                                                <td className="px-5 py-4">
                                                    <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                        {contact.mobile ||
                                                            "—"}
                                                    </p>
                                                </td>

                                                {/* MESSAGE */}
                                                <td className="max-w-[350px] px-5 py-4">
                                                    <p className="truncate text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                        {contact.message ||
                                                            "—"}
                                                    </p>
                                                </td>

                                                {/* DATE */}
                                                <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">
                                                    {contact.createdAt
                                                        ? new Date(
                                                              contact.createdAt
                                                          ).toLocaleDateString(
                                                              "en-IN",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : "—"}
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleView(
                                                                    contact._id
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F3F4] text-[#606E6E] transition hover:bg-[#E5E8EA] dark:bg-white/5 dark:text-[#AEB7BA] dark:hover:bg-white/10"
                                                            title="View"
                                                        >
                                                            <Eye
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    contact._id
                                                                )
                                                            }
                                                            disabled={
                                                                loading
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/10 dark:hover:bg-red-500/20"
                                                            title="Delete"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-5 py-16 text-center text-[#778387] dark:text-[#AEB7BA]"
                                        >
                                            No contact messages
                                            found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* =========================================
                DETAILS MODAL
            ========================================= */}
            {selectedContact && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg rounded-xl border border-[#E2E6E8] bg-white shadow-2xl dark:border-[#303A3F] dark:bg-[#1C2529]">
                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between border-b border-[#E7EAED] px-5 py-4 dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">
                                    Contact Details
                                </h2>

                                <p className="mt-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                    Message from{" "}
                                    {selectedContact.name}
                                </p>
                            </div>

                            <button
                                onClick={handleCloseModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#606E6E] hover:bg-[#F8F9FB] dark:text-[#AEB7BA] dark:hover:bg-white/5"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {/* MODAL BODY */}
                        <div className="space-y-4 p-5">
                            {/* BASIC DETAILS */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* NAME */}
                                <div>
                                    <p className="mb-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                        Name
                                    </p>

                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedContact.name ||
                                            "—"}
                                    </p>
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <p className="mb-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                        Email
                                    </p>

                                    <p className="break-all text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedContact.email ||
                                            "—"}
                                    </p>
                                </div>

                                {/* PHONE */}
                                <div>
                                    <p className="mb-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                        Phone
                                    </p>

                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedContact.mobile ||
                                            "—"}
                                    </p>
                                </div>

                                {/* DATE */}
                                <div>
                                    <p className="mb-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                        Date
                                    </p>

                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">
                                        {selectedContact.createdAt
                                            ? new Date(
                                                  selectedContact.createdAt
                                              ).toLocaleDateString(
                                                  "en-IN",
                                                  {
                                                      day: "2-digit",
                                                      month: "short",
                                                      year: "numeric",
                                                  }
                                              )
                                            : "—"}
                                    </p>
                                </div>
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <p className="mb-1 text-xs text-[#778387] dark:text-[#AEB7BA]">
                                    Message
                                </p>

                                <div className="max-h-60 overflow-y-auto rounded-lg border border-[#E2E6E8] bg-[#F8F9FB] p-3 text-sm leading-6 text-[#606E6E] dark:border-[#303A3F] dark:bg-[#12181B] dark:text-[#AEB7BA]">
                                    {selectedContact.message ||
                                        "No message"}
                                </div>
                            </div>

                            {/* CLOSE */}
                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleCloseModal}
                                    className="rounded-lg bg-[#3420FF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2818D9]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdContact;