"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-4">
      <div className="container-fluid py-4 px-3 px-sm-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <Link href="/" className="navbar-brand fw-bold m-0">
              <img
                src="/weblogo.png"
                alt="XMilfNut Logo"
                width={120}
                height={40}
              />
            </Link>
            <p className="text-secondary mt-2 mb-0">
              Daily updated free videos and stars. Explore categories and
              discover trending content.
            </p>
          </div>
          <div className="col-6 col-md-4">
            <div className="fw-semibold mb-2">Fast Use Link</div>
            <ul className="list-unstyled m-0 d-flex flex-wrap gap-3">
              <li>
                <Link className="text-white text-decoration-none" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" href="/stars">
                  Stars
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href="/category/Letest-Video"
                >
                  New Videos
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href="/categories"
                >
                  Categorys
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <div className="fw-semibold mb-2">Top Pornstars</div>
            <ul className="list-unstyled m-0 d-flex flex-wrap gap-3">
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href={`/stars/Angela-White`}
                >
                  Angela White
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href={`/stars/Mia-Malkova`}
                >
                  Mia Malkova
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href={`/stars/Riley-Reid`}
                >
                  Riley Reid
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  href={`/stars/Dillion-Harper`}
                >
                  Dillion Harper
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-top border-secondary mt-4 pt-3 d-flex flex-wrap justify-content-between align-items-center">
          <div className="small text-white ">
            © 2025 xmilfnut. All rights reserved.
          </div>
          <div className="d-flex gap-3 m-3">
            <a
              href="/privacy-policy"
              className="text-white text-decoration-none small"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="text-white text-decoration-none small">
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-white text-decoration-none small"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
