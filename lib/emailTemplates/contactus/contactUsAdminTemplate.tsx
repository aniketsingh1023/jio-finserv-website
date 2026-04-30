import React from "react";

interface Props {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactAdminTemplate({
  fullName,
  email,
  phone,
  message,
}: Props) {
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
                style={{ padding: "30px 30px 20px 30px" }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    letterSpacing: "2px",
                    color: "#7a5a2c",
                  }}
                >
                  FINSERV NBFC
                </h1>

                <div
                  style={{
                    width: "60px",
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
                  padding: "10px 30px 20px 30px",
                  fontSize: "18px",
                  color: "#c89c5d",
                  fontWeight: "bold",
                }}
              >
                Contact Us Enquiry
              </td>
            </tr>

            {/* Data Table */}
            <tr>
              <td style={{ padding: "0 30px 30px 30px" }}>
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                    color: "#333333",
                  }}
                >
                  <tr>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#7a5a2c",
                        fontWeight: "bold",
                        width: "120px",
                      }}
                    >
                      Name:
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      {fullName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#7a5a2c",
                        fontWeight: "bold",
                      }}
                    >
                      Email:
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      {email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#7a5a2c",
                        fontWeight: "bold",
                      }}
                    >
                      Phone:
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      {phone}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "15px 0 5px 0",
                        color: "#7a5a2c",
                        fontWeight: "bold",
                      }}
                    >
                      Message:
                    </td>
                    <td />
                  </tr>

                  <tr>
                    <td colSpan={2}>
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
                              padding: "15px",
                              fontSize: "14px",
                              color: "#555555",
                            }}
                          >
                            {message}
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
                  padding: "20px",
                  fontSize: "12px",
                  color: "#999999",
                  borderTop: "1px solid #eee",
                }}
              >
                System Generated Notification
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}