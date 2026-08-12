import React, { useState } from "react";
import { Search, Eye, Trash2, CreditCard, CheckCircle, Clock, XCircle, IndianRupee } from "lucide-react";

const initialPayments = [
    { id: "PAY-1001", member: "Rahul Sharma", plan: "Premium Monthly", amount: 999, method: "UPI", date: "12 Aug 2026", status: "Completed" },
    { id: "PAY-1002", member: "Priya Singh", plan: "Premium Quarterly", amount: 2499, method: "Card", date: "11 Aug 2026", status: "Completed" },
    { id: "PAY-1003", member: "Amit Kumar", plan: "Premium Yearly", amount: 7999, method: "UPI", date: "10 Aug 2026", status: "Pending" },
    { id: "PAY-1004", member: "Neha Verma", plan: "Premium Monthly", amount: 999, method: "Net Banking", date: "09 Aug 2026", status: "Completed" },
    { id: "PAY-1005", member: "Rohit Yadav", plan: "Premium Quarterly", amount: 2499, method: "Card", date: "08 Aug 2026", status: "Failed" },
    { id: "PAY-1006", member: "Anjali Gupta", plan: "Premium Yearly", amount: 7999, method: "UPI", date: "07 Aug 2026", status: "Completed" },
];

const Payment = () => {
    const [payments, setPayments] = useState(initialPayments);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedPayment, setSelectedPayment] = useState(null);

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch = `${payment.member} ${payment.id} ${payment.plan}`.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0);
    const completed = payments.filter((p) => p.status === "Completed").length;
    const pending = payments.filter((p) => p.status === "Pending").length;
    const failed = payments.filter((p) => p.status === "Failed").length;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            setPayments(payments.filter((payment) => payment.id !== id));
        }
    };

    return (
        <div className="min-h-full bg-[#F5F7F9] dark:bg-[#12181B] git status
        ">
            <div className="">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7]">Payments</h1>
                    <p className="text-xs sm:text-sm text-[#606E6E] dark:text-[#AEB7BA] mt-1">Manage and track all membership payments</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">₹{totalRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#F3F0FF] dark:bg-[#3420FF]/10 flex items-center justify-center text-[#3420FF]">
                                <IndianRupee size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Completed</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{completed}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Pending</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{pending}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[#FFF7E6] dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Clock size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">Failed</p>
                                <h3 className="text-2xl font-bold text-[#1F272B] dark:text-[#F4F6F7] mt-1">{failed}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
                                <XCircle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="relative w-full md:max-w-md">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778387]" />
                            <input type="text" placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] placeholder:text-[#778387] outline-none focus:border-[#3420FF]" />
                        </div>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-40 px-3 py-2.5 rounded-lg border border-[#E2E6E8] dark:border-[#303A3F] bg-[#F8F9FB] dark:bg-[#12181B] text-sm text-[#1F272B] dark:text-[#F4F6F7] outline-none focus:border-[#3420FF]">
                            <option>All</option>
                            <option>Completed</option>
                            <option>Pending</option>
                            <option>Failed</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#1C2529] border border-[#E2E6E8] dark:border-[#303A3F] rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                        <CreditCard size={19} className="text-[#3420FF]" />
                        <h2 className="text-base font-semibold text-[#1F272B] dark:text-[#F4F6F7]">Payment Transactions</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px]">
                            <thead>
                                <tr className="bg-[#F8F9FB] dark:bg-[#12181B] text-left">
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Transaction</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Member</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Plan</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Amount</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Method</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Date</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA]">Status</th>
                                    <th className="px-5 py-4 text-xs font-semibold text-[#606E6E] dark:text-[#AEB7BA] text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="border-t border-[#E7EAED] dark:border-[#303A3F] hover:bg-[#F8F9FB] dark:hover:bg-white/[0.02] transition">
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-semibold text-[#3420FF]">{payment.id}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{payment.member}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-sm text-[#606E6E] dark:text-[#AEB7BA]">{payment.plan}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1 text-sm font-semibold text-[#1F272B] dark:text-[#F4F6F7]">
                                                <IndianRupee size={14} />
                                                {payment.amount.toLocaleString()}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{payment.method}</td>
                                        <td className="px-5 py-4 text-sm text-[#606E6E] dark:text-[#AEB7BA]">{payment.date}</td>

                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${payment.status === "Completed" ? "bg-green-500 text-white" : payment.status === "Pending" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                                                {payment.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end items-center gap-2">
                                                <button onClick={() => setSelectedPayment(payment)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10 transition">
                                                    <Eye size={15} />
                                                </button>

                                                <button onClick={() => handleDelete(payment.id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-16 text-[#778387] dark:text-[#AEB7BA]">No payments found.</div>
                    )}
                </div>
            </div>

            {selectedPayment && (
                <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-[#1C2529] rounded-xl shadow-2xl border border-[#E2E6E8] dark:border-[#303A3F]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7EAED] dark:border-[#303A3F]">
                            <div>
                                <h2 className="text-lg font-bold text-[#1F272B] dark:text-[#F4F6F7]">Payment Details</h2>
                                <p className="text-xs text-[#778387] dark:text-[#AEB7BA] mt-1">{selectedPayment.id}</p>
                            </div>

                            <button onClick={() => setSelectedPayment(null)} className="w-9 h-9 rounded-lg bg-[#F1F3F4] dark:bg-white/5 text-[#606E6E] dark:text-[#AEB7BA] hover:bg-[#E5E8EA] dark:hover:bg-white/10">
                                <XCircle size={18} className="mx-auto" />
                            </button>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-[#778387]">Member</span>
                                <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedPayment.member}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-[#778387]">Plan</span>
                                <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedPayment.plan}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-[#778387]">Amount</span>
                                <span className="text-sm font-bold text-[#1F272B] dark:text-[#F4F6F7]">₹{selectedPayment.amount.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-[#778387]">Payment Method</span>
                                <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedPayment.method}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-sm text-[#778387]">Date</span>
                                <span className="text-sm font-medium text-[#1F272B] dark:text-[#F4F6F7]">{selectedPayment.date}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-[#778387]">Status</span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${selectedPayment.status === "Completed" ? "bg-green-500 text-white" : selectedPayment.status === "Pending" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                                    {selectedPayment.status}
                                </span>
                            </div>
                        </div>

                        <div className="px-5 pb-5">
                            <button onClick={() => setSelectedPayment(null)} className="w-full py-2.5 rounded-lg bg-[#3420FF] text-white text-sm font-medium hover:bg-[#2818D9] transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                select option{background:#fff;color:#1F272B}
                .dark select option{background:#12181B;color:#F4F6F7}
            `}</style>
        </div>
    );
};

export default Payment;