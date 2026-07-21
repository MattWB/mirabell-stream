import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-mist-950 px-4 text-white">
        <div className="text-center">
          <p className="font-mono text-sm text-amber-400">Erreur 404</p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase">Page introuvable</h1>
        </div>
        <Link
          className="mt-6 inline-flex text-sm font-medium text-amber-400 hover:text-amber-300"
          to="/"
        >
          Retourner à l'accueil
        </Link>
      </main>
    </>
  );
}
