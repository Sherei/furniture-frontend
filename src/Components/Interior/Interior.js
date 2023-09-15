import React from 'react'

const Interior = () => {
    return <>
        <>
            {/*Main Navigation*/}
            <header>
                {/* Jumbotron */}
                <div className="p-3 text-center bg-white border-bottom">
                    <div className="container">
                        <div className="row">
                            {/* Left elements */}
                            <div className="col-md-4 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                                <a href="#!" className="ms-md-2">
                                    <img
                                        src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                                        height={35}
                                    />
                                </a>
                            </div>
                            {/* Left elements */}
                            {/* Center elements */}
                            <div className="col-md-4">
                                <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0">
                                    <input
                                        autoComplete="off"
                                        type="search"
                                        className="form-control rounded"
                                        placeholder="Search"
                                    />
                                    <span className="input-group-text border-0 d-none d-lg-flex">
                                        <i className="fas fa-search" />
                                    </span>
                                </form>
                            </div>
                            {/* Center elements */}
                            {/* Right elements */}
                            <div className="col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                                <div className="d-flex">
                                    {/* Cart */}
                                    <a className="text-reset me-3" href="#">
                                        <span>
                                            <i className="fas fa-shopping-cart" />
                                        </span>
                                        <span className="badge rounded-pill badge-notification bg-danger">
                                            1
                                        </span>
                                    </a>
                                    {/* Notification */}
                                    <div className="dropdown">
                                        <a
                                            className="text-reset me-3 dropdown-toggle hidden-arrow"
                                            href="#"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-bell" />
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Some news
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Another news
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Something else here
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Languages */}
                                    <div className="dropdown">
                                        <a
                                            className="text-reset dropdown-toggle me-3 hidden-arrow"
                                            href="#"
                                            id="navbarDropdown"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="flag flag-united-kingdom m-0" />
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-united-kingdom" />
                                                    English
                                                    <i className="fa fa-check text-success ms-2" />
                                                </a>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-poland" />
                                                    Polski
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-china" />
                                                    中文
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-japan" />
                                                    日本語
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-germany" />
                                                    Deutsch
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-france" />
                                                    Français
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-spain" />
                                                    Español
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-russia" />
                                                    Русский
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    <i className="flag flag-portugal" />
                                                    Português
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* User */}
                                    <div className="dropdown">
                                        <a
                                            className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
                                            href="#"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                                                className="rounded-circle"
                                                height={22}
                                                alt=""
                                                loading="lazy"
                                            />
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    My profile
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Right elements */}
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    {/* Container wrapper */}
                    <div className="container justify-content-center justify-content-md-between">
                        {/* Left links */}
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item me-2 me-lg-0">
                                <a
                                    className="nav-link"
                                    role="button"
                                    data-mdb-toggle="sidenav"
                                    data-mdb-target="#sidenav-1"
                                    aria-controls="#sidenav-1"
                                    aria-haspopup="true"
                                >
                                    <i className="fas fa-bars me-1" />
                                    <span>Categories</span>
                                </a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="#">
                                    Bestsellers
                                </a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="#">
                                    Inspirations
                                </a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="#">
                                    Blog
                                </a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="#">
                                    Contact
                                </a>
                            </li>
                        </ul>
                        {/* Left links */}
                        <button
                            className="btn btn-outline-primary"
                            data-mdb-ripple-color="dark"
                            type="button"
                        >
                            Download app
                            <i className="fas fa-download ms-2" />
                        </button>
                    </div>
                    {/* Container wrapper */}
                </nav>
                {/* Navbar */}
                {/* Sidenav */}
                <div
                    id="sidenav-1"
                    className="sidenav"
                    role="navigation"
                    data-mdb-hidden="true"
                    data-mdb-accordion="true"
                >
                    <ul className="sidenav-menu">
                        <li className="sidenav-item">
                            <a className="sidenav-link">
                                <i className="fas fa-layer-group pe-3" />
                                <span>Categories</span>
                            </a>
                            <ul className="sidenav-collapse show">
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Dresses</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Shirts</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Jeans</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Shoes</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Accessories</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Jewelry</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidenav-item">
                            <a className="sidenav-link">
                                <i className="fas fa-gem pe-3" />
                                <span>Brands</span>
                            </a>
                            <ul className="sidenav-collapse">
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Brand 1</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Brand 2</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Brand 3</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Brand 4</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidenav-item">
                            <a className="sidenav-link">
                                <i className="fas fa-gift pe-3" />
                                <span>Discounts</span>
                            </a>
                            <ul className="sidenav-collapse">
                                <li className="sidenav-item">
                                    <a className="sidenav-link">-70%</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">-50%</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Any</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidenav-item">
                            <a className="sidenav-link">
                                <i className="fas fa-fire-alt pe-3" />
                                <span>Popular</span>
                            </a>
                            <ul className="sidenav-collapse">
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Jewelry</a>
                                </li>
                                <li className="sidenav-item">
                                    <a className="sidenav-link">Snickers</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidenav-item">
                            <a className="sidenav-link">
                                <i className="fab fa-hotjar pe-3" />
                                <span>Today's bestseller</span>
                            </a>
                            <div className="card mx-3">
                                <div
                                    className="bg-image hover-zoom ripple"
                                    data-mdb-ripple-color="light"
                                >
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/shoes%20(3).jpg"
                                        className="w-100"
                                    />
                                    <a href="#!">
                                        <div className="mask">
                                            <div className="d-flex justify-content-start align-items-end h-100">
                                                <h5>
                                                    <span className="badge bg-danger ms-2">-10%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="hover-overlay">
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                            />
                                        </div>
                                    </a>
                                </div>
                                <div className="card-body">
                                    <a href="" className="text-reset">
                                        <p className="mb-2">Pink snickers</p>
                                    </a>
                                    <p className="mb-0">
                                        <s>$61.99</s>
                                        <strong className="ms-2 text-danger">$50.99</strong>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Sidenav */}
                {/* Background image */}
                <div
                    id="intro"
                    className="bg-image shadow-1-strong"
                    style={{
                        backgroundImage: "url(https://mdbootstrap.com/img/new/slides/310.jpg)",
                        height: 500
                    }}
                >
                    <div
                        className="mask text-white"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                    >
                        <div className="container d-flex align-items-center justify-content-center text-center h-100">
                            <div className="text-white">
                                <h1 className="mb-3">Autumn sale</h1>
                                <h4 className="mb-4">Promotions up to 70%!</h4>
                                <a
                                    className="btn btn-outline-light btn-lg mb-3"
                                    href="#!"
                                    role="button"
                                >
                                    See the promotional offer
                                    <i className="fas fa-gem ms-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background image */}
            </header>
            {/*Main Navigation*/}
        </>

    </>
}

export default Interior