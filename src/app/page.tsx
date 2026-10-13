import { Suspense } from "react";
import { headers } from "next/headers";
import { readVisitor } from "@/lib/identity";

export default function Home() {
  return (
    <Suspense
      fallback={
        <main>
          <p>Checking access…</p>
        </main>
      }
    >
      <IdentityStatus />
    </Suspense>
  );
}

async function IdentityStatus() {
  const visitor = await readVisitor(await headers());
  const state = !visitor ? "denied" : visitor.demo ? "demo" : "granted";

  return (
    <main>
      <header>
        <p className="label">Microsoft Entra ID / Vercel Passport</p>
        <h1>Identity and access</h1>
      </header>
      <section className="identity-card" aria-label="Identity status">
        <p role="status" className={`status ${state}`}>
          <span aria-hidden="true" className="status-dot" />
          {!visitor
            ? "Access denied"
            : visitor.demo
              ? "Local demo"
              : "Access granted"}
        </p>
        <p className="description">
          {!visitor
            ? "No verified identity. Sign in through a Passport-protected deployment."
            : visitor.demo
              ? "Sample identity for local development. No Entra sign-in took place."
              : "Your identity is verified through Vercel Passport."}
        </p>
        {visitor ? (
          <>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{visitor.name ?? "Not provided"}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{visitor.email ?? "Not provided"}</dd>
              </div>
              <div>
                <dt>Visitor ID</dt>
                <dd className="mono">{visitor.id}</dd>
              </div>
            </dl>
            <a href="/api/me">
              View identity response <span aria-hidden="true">↗</span>
            </a>
          </>
        ) : null}
      </section>
    </main>
  );
}
