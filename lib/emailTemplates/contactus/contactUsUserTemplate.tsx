import React from "react";

interface Props {
  fullName: string;
  message: string;
}

export default function ContactUserTemplate({ fullName, message }: Props) {
  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{
        backgroundColor: "#f8f5ef",
        padding: "30px 10px",
        fontFamily: "Georgia, serif",
      }}
    >
      <tr>
        <td align="center">
          {/* Main Card */}
          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            style={{
              maxWidth: "600px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e0d8",
            }}
          >
            {/* Header */}
            <tr>
              <td
                align="center"
                style={{
                  padding: "40px 30px 20px 30px",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    letterSpacing: "3px",
                    color: "#7a5a2c",
                  }}
                >
                  FINSERV NBFC
                </h1>

                <div
                  style={{
                    width: "70px",
                    height: "2px",
                    backgroundColor: "#c89c5d",
                    margin: "15px auto 0 auto",
                  }}
                />
              </td>
            </tr>

            {/* Title */}
            <tr>
              <td
                style={{
                  padding: "10px 30px",
                  fontSize: "20px",
                  color: "#c89c5d",
                  fontWeight: "bold",
                }}
              >
                Thank You for Contacting Us
              </td>
            </tr>

            {/* Greeting */}
            <tr>
              <td
                style={{
                  padding: "10px 30px",
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#333333",
                }}
              >
                Dear {fullName},
              </td>
            </tr>

            {/* Message Body */}
            <tr>
              <td
                style={{
                  padding: "10px 30px",
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#333333",
                }}
              >
                We appreciate your interest in our financial services.
                Our relationship team will review your request and
                connect with you shortly. Your message is as follows:
              </td>
            </tr>

            {/* Highlighted Message Box */}
            <tr>
              <td style={{ padding: "20px 30px" }}>
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    backgroundColor: "#f8f5ef",
                    borderLeft: "4px solid #c89c5d",
                  }}
                >
                  <tr>
                    <td
                      style={{
                        padding: "20px",
                        fontSize: "15px",
                        lineHeight: "24px",
                        color: "#555555",
                      }}
                    >
                      {message}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

           {/* Dual Premium CTA Section */}
<tr>
  <td align="center" style={{ padding: "30px" }}>
    <table cellPadding="0" cellSpacing="0" width="100%">
      <tr>
        <td align="center">

          {/* Primary CTA */}
          <table cellPadding="0" cellSpacing="0" style={{ marginBottom: "15px" }}>
            <tr>
              <td
                align="center"
                style={{
                  padding: "14px 30px",
                  borderRadius: "4px",
                  backgroundColor: "#c89c5d", // ✅ correct way
                }}
              >
                <a
                  href="https://jiofinserv.org/"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    display: "inline-block",
                  }}
                >
                  EXPLORE OUR SERVICES
                </a>
              </td>
            </tr>
          </table>

          {/* Secondary CTA */}
          <table cellPadding="0" cellSpacing="0">
            <tr>
              <td
                align="center"
                style={{
                  padding: "12px 28px",
                  border: "1px solid #c89c5d",
                  borderRadius: "4px",
                }}
              >
                <a
                  href="https://jiofinserv.org/emi-calculator"
                  style={{
                    color: "#7a5a2c",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    display: "inline-block",
                  }}
                >
                  CALCULATE EMI
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </td>
</tr>

            {/* Footer */}
            <tr>
              <td
                align="center"
                style={{
                  padding: "30px",
                  fontSize: "13px",
                  color: "#999999",
                  borderTop: "1px solid #eee",
                }}
              >
                © {new Date().getFullYear()} Finserv NBFC  
                <br />
                Excellence in Financial Solutions
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}