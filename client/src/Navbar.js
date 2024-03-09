export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">Totally Not Ticketmaster</a>
        <ul>
            <li>
                <a href="/tickets">Tickets</a>
            </li>
            <li>
                <a href="/users">Users</a>
            </li>
            <li>
                <a href="/purchases">Purchases</a>
            </li>
            <li>
                <a href="/queries">Queries</a>
            </li>
            <li>
                <a href="/viewer">Viewer</a>
            </li>
        </ul>
    </nav>
}