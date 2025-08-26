import React from "react";
import Link from "next/link";
function page() {
  return (
    <div>
      <h1>Welcome to the Bubble Chat</h1>
      <nav>
        <ul>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/auth/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default page;
