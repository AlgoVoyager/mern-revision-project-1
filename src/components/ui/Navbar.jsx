
const Navbar = () => {
    return (<>
        <header className='flex pl-34 px-10 justify-between py-2 border-b items-center'>
            <h2 className="logo">Primo</h2>
            <nav className="links flex gap-5">
                <div>User: Nishant</div>
                <button>Logout</button>
            </nav>
        </header>
    </>
    )
}

export default Navbar