import "server-only";
import { getIdentity, PassportIdentityError } from "@vercel/passport";

export type Visitor = {
  id: string;
  name: string | null;
  email: string | null;
  demo: boolean;
};

export async function readVisitor(
  requestHeaders: Headers,
): Promise<Visitor | null> {
  if (
    process.env.NODE_ENV === "development" &&
    !process.env.VERCEL &&
    process.env.PORTAL_DEMO === "true"
  ) {
    return {
      id: "local-demo",
      name: "Alex Morgan",
      email: "alex@example.com",
      demo: true,
    };
  }
  if (!requestHeaders.get("x-vercel-oidc-passport-token")) {
    return null;
  }
  try {
    const identity = await getIdentity(
      { headers: requestHeaders },
      { development: false },
    );
    if (!identity?.verified || !identity.externalSubject) {
      return null;
    }
    return {
      id: identity.externalSubject,
      name: identity.name ?? null,
      email: identity.email ?? null,
      demo: false,
    };
  } catch (error) {
    if (error instanceof PassportIdentityError) {
      return null;
    }
    throw error;
  }
}
