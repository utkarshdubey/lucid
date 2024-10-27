"use server";
export async function addUserToWaitlist(email: string) {
  try {
    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          metadata: { early_adopter: true },
        }),
      },
    );

    // if (!response.ok) {
    //   throw new Error(`HTTP error ${response.status}`);
    // }

    const data = await response.json();
    console.log("User added to waitlist:", data);
  } catch (error) {
    console.error("Error adding user to waitlist:", error);
  }
}
