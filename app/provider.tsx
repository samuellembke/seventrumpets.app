"use client"
import {NextUIProvider} from "@nextui-org/react";
import React from "react";

export default function Provider({children}: {children: React.ReactNode}) {
    return (
        <main className="main">
            <NextUIProvider>
                <div className="main-content">
                    { children }
                </div>
            </NextUIProvider>
        </main>
    )
}
