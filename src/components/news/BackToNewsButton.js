import Link from "next/link";

const BackToNewsButton = () => {
  return (
    <Link
      href="/news"
      className="flex items-center text-lg font-bold tracking-widest uppercase text-gray-400 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 rotate-180 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
      Back to News
    </Link>
  );
};

export default BackToNewsButton;
