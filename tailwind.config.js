/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                admin: {
                    darkBg: "#12181B",
                    darkSidebar: "#171F23",
                    darkCard: "#1C2529",
                    darkHover: "#222D31",
                    darkBorder: "#303A3F",
                    darkText: "#F4F6F7",
                    darkSecondary: "#AEB7BA",
                    darkMuted: "#778387",

                    primary: "#3420FF",
                    success: "#38C79A",
                    chartBlue: "#2679D1",
                    chartPink: "#C03BB7",
                    chartYellow: "#E7B84B",
                },
            },
        },
    },

    plugins: [],
};