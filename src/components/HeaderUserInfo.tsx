"use client";

interface Props {
  session: Session | null;
}
export default function HeaderUserInfo({ session }: Props) {
  return (
    <>
      {session && (
        <>
          Logged in: {session.user?.name}
          <a href="/api/auth/logout" className="btn">
            Sign out
          </a>
        </>
      )}
      {/* {:else if altSession}
    Logged in: {altSession.user?.name}
    <button on:click={() => signOut()} className="btn">Sign out</button> */}
      {!session && (
        <>
          Logged out
          <a href="/api/auth/login" className="btn">
            Sign In with Auth0
          </a>
        </>
      )}
    </>
  );
}
