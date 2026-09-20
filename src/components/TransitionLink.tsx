"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

export function TransitionLink({ children, href, className, style, ...props }: any) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If it's the same page, just scroll to top or do nothing
    if (pathname === href || href.toString().startsWith(pathname + "#") || href.toString().startsWith("#")) return;
    
    e.preventDefault();
    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
      setTimeout(() => {
        router.push(href.toString());
      }, 750);
    } else {
      router.push(href.toString());
    }
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} style={style} {...props}>
      {children}
    </Link>
  );
}


