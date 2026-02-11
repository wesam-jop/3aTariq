export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M25 4C14.5066 4 6 12.5066 6 23C6 32.814 22.845 44.921 23.57 45.43C24.42 46.03 25.58 46.03 26.43 45.43C27.155 44.921 44 32.814 44 23C44 12.5066 35.4934 4 25 4ZM25 29C21.686 29 19 26.314 19 23C19 19.686 21.686 17 25 17C28.314 17 31 19.686 31 23C31 26.314 28.314 29 25 29Z"
                className="fill-primary"
            />
            <path
                d="M32 12L18 34"
                stroke="#1F2937"
                strokeWidth="3"
                strokeLinecap="round"
                className="stroke-gray-800"
            />
        </svg>
    );
}
