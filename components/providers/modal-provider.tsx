"use client";

import { useEffect, useState } from "react";
import { StoreModal } from "../custom/mod/store-mod";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    )
}