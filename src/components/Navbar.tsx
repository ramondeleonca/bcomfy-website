export default function Navbar() {
    return (
        <nav className="fixed top-3 left-3 right-3 p-2 rounded-2xl bg-white bg-opacity-25 backdrop-blur-lg z-[100]">
            <a href="/">
                <img src="/logos/logo.png" alt="" className="w-12 aspect-square" />
            </a>
        </nav>
    )
}