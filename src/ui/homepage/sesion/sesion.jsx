"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sesion = () => {
  const { data: session } = useSession();
  const url = {
    admin: "/cpa",
    secretario: "/academic",
    cursos: "/courses",
  };
  return (
    <Link href={session?.user.role ? url[session?.user.role] : "/login"}>
      {session?.user.role ? "Panel de Control" : "Iniciar Sesión"}
    </Link>
  );
};

export default Sesion;
