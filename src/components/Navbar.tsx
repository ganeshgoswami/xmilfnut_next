"use client";
import React, { useEffect, useRef, useState ,KeyboardEvent  } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
 const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (panelRef.current) {
      const content = panelRef.current.querySelector(
        ".panel-content"
      ) as HTMLDivElement | null;
      setPanelHeight(content ? content.scrollHeight : 0);
    }
  }, [open]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?Search=${encodeURIComponent(query)}&page=1`);
      setOpen(false); // Close mobile menu after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid align-items-center">
          <Link className="navbar-brand" href="/">
            <img
              src="/weblogo.png"
              alt="XMilfNut Logo"
              width={120}
              height={40}
            />
          </Link>
          <ul className="navbar-nav d-none d-lg-flex flex-row flex-grow-1 justify-content-evenly mx-4">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                <i className="bi bi-house me-1" aria-hidden="true"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/stars">
                <i className="bi bi-stars me-1" aria-hidden="true"></i>
                Stars
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/category/letest-video">
                <i className="bi bi-collection-play me-1" aria-hidden="true"></i>
                New Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/categories">
                <i className="bi bi-grid-3x3-gap me-1" aria-hidden="true"></i>
                Categories
              </Link>
            </li>
          </ul>

          <form
            className="d-none d-lg-flex ms-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <div className="position-relative">
              <i
                className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              ></i>
              <input
                className="form-control ps-5"
                type="search"
                placeholder="Search videos or models..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </form>

          <button
            type="button"
            className="d-lg-none ms-auto bg-dark border-0 p-2"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-controls="navbar-slide-panel"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i
              className={(open ? "bi bi-x" : "bi bi-list") + " fs-4 text-white"}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </nav>
      <hr className="border-secondary opacity-50 m-0" />

      <div
        id="navbar-slide-panel"
        ref={panelRef}
        className="bg-dark border-top border-secondary d-lg-none"
        style={{
          overflow: "hidden",
          maxHeight: open ? panelHeight : 0,
          transition: "max-height 250ms ease",
        }}
      >
        <div className="panel-content container py-3">
          <form
            className="mb-3"
            role="search"
            onSubmit={handleSearch}
          >
            <div className="position-relative">
              <i
                className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              ></i>
              <input
                className="form-control ps-5"
                type="search"
                placeholder="Search videos or models..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </form>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" href="/">
                <i className="bi bi-house me-2" aria-hidden="true"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/stars">
                <i className="bi bi-stars me-2" aria-hidden="true"></i>
                Stars
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                href="/category/letest-video"
              >
                <i
                  className="bi bi-collection-play me-2"
                  aria-hidden="true"
                ></i>
                New Videos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" href="/categories">
                <i className="bi bi-grid-3x3-gap me-2" aria-hidden="true"></i>
                Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        :global(.navbar .nav-link:hover),
        :global(.navbar .nav-link:focus),
        :global(#navbar-slide-panel .nav-link:hover),
        :global(#navbar-slide-panel .nav-link:focus) {
          color: #e7ff009e !important;
        }
      `}</style>
    </>
  );
}
