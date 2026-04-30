/*****************************************************************************************
 * CONTACT US API ROUTE
 * -----------------------------------------------------------------------------
 * PURPOSE:
 * 1. Receive contact form submission
 * 2. Validate input fields
 * 3. Store message in local JSON file
 * 4. Render premium HTML email templates
 * 5. Send email to Admin
 * 6. Send confirmation email to User
 *
 * RUNTIME: Node.js (NOT Edge)
 *****************************************************************************************/

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/sendEmail";
import { render } from "@react-email/render";
import ContactUserTemplate from "@/lib/emailTemplates/contactus/contactUsUserTemplate";
import ContactAdminTemplate from "@/lib/emailTemplates/contactus/contactUsAdminTemplate";


/*****************************************************************************************
 * REGION: File Storage Configuration
 * -----------------------------------------------------------------------------
 * We store all contact messages inside:
 *    /data/sendMessage.json
 *
 * process.cwd() = Root directory of Next.js project
 * path.join()   = Ensures OS-safe path building
 *****************************************************************************************/

const filePath = path.join(process.cwd(), "data", "contactUsMessage.json");


/*****************************************************************************************
 * REGION: POST Handler
 * -----------------------------------------------------------------------------
 * This function executes when frontend sends:
 *    POST /api/send-message
 *****************************************************************************************/

export async function POST(req: Request) {

  try {

    /**************************************************************************
     * STEP 1: Parse Request Body
     * ------------------------------------------------------------------------
     * Extract data submitted from frontend form.
     **************************************************************************/

    const body = await req.json();
    const { fullName, email, phone, message } = body;


    /**************************************************************************
     * STEP 2: Validate Required Fields
     * ------------------------------------------------------------------------
     * Basic server-side validation.
     * Prevents empty submissions & malformed requests.
     **************************************************************************/

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }


    /**************************************************************************
     * STEP 3: Read Existing Messages from JSON
     * ------------------------------------------------------------------------
     * We read the JSON file, parse it, then append new message.
     **************************************************************************/

    const fileData = fs.readFileSync(filePath, "utf-8");
    const messages = JSON.parse(fileData);


    /**************************************************************************
     * STEP 4: Create New Message Object
     * ------------------------------------------------------------------------
     * - randomUUID() ensures globally unique ID
     * - createdAt timestamp helps for future filtering / sorting
     **************************************************************************/

    const newMessage = {
      id: randomUUID(),
      fullName,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };


    /**************************************************************************
     * STEP 5: Save Message Back to File
     * ------------------------------------------------------------------------
     * Push new entry into array and overwrite file.
     * JSON.stringify with indentation (null, 2) improves readability.
     **************************************************************************/

    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));


    /**************************************************************************
     * STEP 6: Render User Email Template (React → HTML)
     * ------------------------------------------------------------------------
     * @react-email/render converts React component into static HTML.
     * MUST use await because render() returns Promise<string>.
     **************************************************************************/

    const userHtml = await render(
      <ContactUserTemplate
        fullName={fullName}
        message={message}
      />
    );


    /**************************************************************************
     * STEP 7: Render Admin Email Template
     **************************************************************************/

    const adminHtml = await render(
      <ContactAdminTemplate
        fullName={fullName}
        email={email}
        phone={phone}
        message={message}
      />
    );


    /**************************************************************************
     * STEP 8: Send Email to Admin
     * ------------------------------------------------------------------------
     * Admin receives structured premium notification.
     **************************************************************************/

    await sendEmail({
      from: process.env.SUPPORT_EMAIL!,  // Verified sending domain
      to: process.env.ADMIN_EMAIL!,      // Admin inbox
      subject: "Contact Us Enquiry",
      html: adminHtml,
    });


    /**************************************************************************
     * STEP 9: Send Confirmation Email to User
     * ------------------------------------------------------------------------
     * Premium luxury banking styled confirmation email.
     **************************************************************************/

    await sendEmail({
      from: process.env.SUPPORT_EMAIL!,
      to: email,
      subject: "Your enquiry has been received",
      html: userHtml,
    });


    /**************************************************************************
     * STEP 10: Return Success Response
     **************************************************************************/

    return NextResponse.json({ success: true });

  } catch (error) {

    /**************************************************************************
     * ERROR HANDLING
     * ------------------------------------------------------------------------
     * Logs server error and returns safe response.
     * Avoid exposing internal error details to client.
     **************************************************************************/

    console.error("Contact API Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}