"use client"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import Image from 'next/image';
/**
    * AppHeader is a function that returns a React component that renders the header of the app.
    * The header contains the app logo, a navigation bar, and a search box.
    * The function takes no parameters and returns a JSX element.
*/
function AppHeader() {
    return (
        <header className="header-area">
            <Navbar expand="lg" className="main-nav">
                <Container>
                    <Link href="/" className="logo">
                        <Image
                            src="/gov_bc_logo.svg"
                            alt="GOV BC Logo"
                            className="gov_bc_logo"
                            width={100}
                            height={24}
                            priority
                        />
                    </Link>
                </Container>
            </Navbar>
        </header>
    );
}

export default AppHeader;