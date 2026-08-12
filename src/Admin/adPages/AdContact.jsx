import React, { useState } from "react";
import { Search, Eye, Trash2, X, Users, Mail, MessageSquare, CheckCircle, Clock, Reply } from "lucide-react";

const initialContacts = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 98765 43210", subject: "Membership Inquiry", message: "I want to know about your premium membership plans.", date: "11 Aug 2026", status: "New" },
    { id: 2, name: "Priya Singh", email: "priya@gmail.com", phone: "+91 98765 12345", subject: "Trainer Inquiry", message: "I would like to know about personal training sessions.", date: "10 Aug 2026", status: "Replied" },
    { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "+91 99887 66554", subject: "General Inquiry", message: "Please share your gym timings and available programs.", date: "09 Aug 2026", status: "Pending" },
    { id: 4, name: "Neha Verma", email: "neha@gmail.com", phone: "+91 98765 11223", subject: "Membership Cancellation", message: "I want to cancel my current membership.", date: "08 Aug 2026", status: "Resolved" },
];

const AdContact = () => {
    const [contacts, setContacts] = useState(initialContacts);
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);

    const filteredContacts = contacts.filter((contact) =>
        `${contact.name} ${contact.email} ${contact.subject}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this inquiry?")) {
            setContacts(contacts.filter((contact) => contact.id !== id));
            if (selectedContact?.id === id) setSelectedContact(null);
        }
    };

    const updateStatus = (id, status) => {
        setContacts(contacts.map((contact) => contact.id === id ? { ...contact, status } : contact));
        setSelectedContact((prev) => prev ? { ...prev, status } : null);
    };

    const getStatusClass = (status) => {
        const classes = {
            New: "bg-blue-500 text-white",
            Pending: "bg-yellow-500 text-white",
            Replied: "bg-purple-500 text-white",
            Resolved: "bg-green-500 text-white",
        };
        return classes[status] || "bg-gray-500 text-white";
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] p-5 sm:p-8 lg:p-10">
            <div className="">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Contact Inquiries</h1>
                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage messages, replies and customer inquiries</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Messages</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{contacts.length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <MessageSquare size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Pending</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{contacts.filter((item) => item.status === "Pending").length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Clock size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Replied</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{contacts.filter((item) => item.status === "Replied").length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <Reply size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Resolved</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{contacts.filter((item) => item.status === "Resolved").length}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                        <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]" />
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <Users size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Contact Messages</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Name</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Contact</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Subject</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Date</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{contact.name}</p>
                                            <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">{contact.email}</p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{contact.phone}</td>
                                        <td className="px-5 py-4 text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{contact.subject}</td>
                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{contact.date}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(contact.status)}`}>
                                                {contact.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button onClick={() => setSelectedContact(contact)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition">
                                                    <Eye size={15} />
                                                </button>

                                                {contact.status !== "Resolved" && (
                                                    <button onClick={() => updateStatus(contact.id, "Resolved")} className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-50 dark:bg-green-500/10 text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20 transition" title="Mark as Resolved">
                                                        <CheckCircle size={15} />
                                                    </button>
                                                )}

                                                <button onClick={() => handleDelete(contact.id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredContacts.length === 0 && <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No contact messages found.</div>}
                </div>
            </div>

            {selectedContact && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">Contact Details</h2>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">Manage inquiry from {selectedContact.name}</p>
                            </div>

                            <button onClick={() => setSelectedContact(null)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F8F9FB] dark:hover:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA]">
                                <X size={19} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Name</p>
                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedContact.name}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Email</p>
                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedContact.email}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Phone</p>
                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedContact.phone}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Date</p>
                                    <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedContact.date}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Subject</p>
                                <p className="text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">{selectedContact.subject}</p>
                            </div>

                            <div>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mb-1">Message</p>
                                <div className="p-3 rounded-lg bg-[#F8F9FB] dark:bg-[#12181B] border border-[#E2E6E8] dark:border-[#303A3F] text-sm leading-6 text-[#606E6E] dark:text-[#AEB7BA]">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-[#778387] dark:text-[#AEB7BA] mb-1.5">Update Status</label>
                                <select value={selectedContact.status} onChange={(e) => updateStatus(selectedContact.id, e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-white dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]">
                                    <option value="New">New</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Replied">Replied</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(selectedContact.status)}`}>
                                    {selectedContact.status}
                                </span>

                                <button onClick={() => setSelectedContact(null)} className="px-5 py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9]">
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