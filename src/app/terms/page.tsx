import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Terms and Conditions</h1>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">1. Acceptance of Terms</h5>
          <p className="card-text">
            By accessing and using this website, you accept and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">2. Use License</h5>
          <p className="card-text">
            Permission is granted to temporarily download one copy of the materials on our website for personal,
            non-commercial transitory viewing only.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">3. User Responsibilities</h5>
          <p className="card-text">
            As a user, you agree not to:
            <ul>
              <li>Use the website in any way that could damage or overburden the website</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Use the website for any illegal purpose</li>
              <li>Upload or transmit any harmful or malicious code</li>
            </ul>
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">4. Limitation of Liability</h5>
          <p className="card-text">
            In no event shall we be liable for any damages arising out of the use or inability to use the materials on our website.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">5. Changes to Terms</h5>
          <p className="card-text">
            We reserve the right to modify these terms at any time. Your continued use of the website after any such changes constitutes your acceptance of the new Terms and Conditions.
          </p>
          <p className="text-muted">Last Updated: October 17, 2025</p>
        </div>
      </div>
    </div>
  );
}
