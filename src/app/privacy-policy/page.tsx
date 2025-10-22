import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Privacy Policy</h1>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">1. Information We Collect</h5>
          <p className="card-text">
            We collect information that you provide directly to us, such as when you create an account, 
            subscribe to our newsletter, or contact us. This may include your name, email address, and any other 
            information you choose to provide.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">2. How We Use Your Information</h5>
          <p className="card-text">
            We may use the information we collect to:
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you promotional communications</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">3. Information Sharing</h5>
          <p className="card-text">
            We do not share your personal information with third parties except as described in this Privacy Policy.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">4. Changes to This Policy</h5>
          <p className="card-text">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="text-muted">Last Updated: October 17, 2025</p>
        </div>
      </div>
    </div>
  );
}
