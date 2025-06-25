"use client";
import { ReactNode } from "react";
// import Navigation from "@/components/Navigation";
import Header from "@/app/Header";
interface CategoryLayoutProps {
    children: ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
    return (
        <div className="min-h-screen">
            <Header />

            {children}
        </div>
    );
}