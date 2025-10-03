import React, { useState } from 'react';
import './Payment2.css';

const PaymentGateway2 = () => {
  // 1. State for managing payment and order data
  const [paymentDetails, setPaymentDetails] = useState({
    cardType: 'VISA',
    cardNumber: '**** **** **** **72',
    expiryDate: '07/35',
  });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 1099,
    tax: 0,
    total: 1099,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

  // 2. Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Set submitting state to true to disable the button and show a loading indicator
    setIsSubmitting(true);
    setSubmissionStatus(null); // Reset status

    // 3. Simulate an API call or a payment processing delay
    setTimeout(() => {
      // Simulate success or failure
      const success = Math.random() > 0.1; // 90% chance of success
      if (success) {
        setSubmissionStatus('success');
        console.log("Payment successful! Order details:", orderSummary);
      } else {
        setSubmissionStatus('error');
        console.error("Payment failed. Please try again.");
      }
      setIsSubmitting(false); // Reset submitting state
    }, 2000); // 2-second delay to simulate network latency
  };

  // 4. Function to handle editing payment details (placeholder)
  const handleEditPayment = () => {
    alert("This would open a form to edit payment details.");
    // In a real application, you would render a new component or a modal here.
  };

  return (
    <div className="payment-gateway-container">
      <div className="payment-gateway-card">
        <h1 className="payment-gateway-title">Payment Gateway</h1>
        <div className="content-wrapper">
          <div className="left-panel">
            {/* ... (Illustration part remains the same) ... */}
            <div className="illustration-wrapper">
              <div className="illustration-placeholder">
                <div className="phone-screen">
                  <div className="header">
                    <span className="back-arrow">←</span>
                    <span className="screen-title">PAYMENTS</span>
                  </div>
                  <div className="card-info">
                    <span className="card-type">💳 Card</span>
                    <span className="card-number">•••• •••• •••• 1234</span>
                  </div>
                  <div className="card-balance">
                    <div className="balance-label">Payments Balance</div>
                    <div className="balance-amount">$45.00</div>
                  </div>
                  <button className="pay-button">Pay $45.00</button>
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel">
            {/* The payment details section */}
            <h2>Please confirm and submit</h2>
            <p className="terms-text">By clicking submit, you agree to Terms of Use and Privacy Policy</p>

            <form onSubmit={handleSubmit}>
              <div className="payment-section">
                <div className="section-header">
                  <h3>Payment</h3>
                  <button type="button" className="edit-link" onClick={handleEditPayment}>Edit</button>
                </div>
                <div className="payment-method">
                  <span className="method-label">{paymentDetails.cardType}</span>
                  <span className="card-number-masked">{paymentDetails.cardNumber}</span>
                  <span className="expiry-date">{paymentDetails.expiryDate}</span>
                </div>
              </div>

              <div className="order-summary-section">
                <h3>Order Summary</h3>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span className="amount">₹ {orderSummary.subtotal}</span>
                </div>
                <div className="summary-line">
                  <span>Tax</span>
                  <span className="amount">₹ {orderSummary.tax}</span>
                </div>
                <hr />
                <div className="summary-line total-line">
                  <span>Total</span>
                  <span className="amount">₹ {orderSummary.total}</span>
                </div>
              </div>

              {/* Submission Status Message */}
              {submissionStatus === 'success' && (
                <p className="status-message success">Payment submitted successfully! 🎉</p>
              )}
              {submissionStatus === 'error' && (
                <p className="status-message error">Payment failed. Please try again. 😔</p>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway2;