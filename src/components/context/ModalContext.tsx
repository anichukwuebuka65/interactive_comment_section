import React, { createContext, ReactNode, SetStateAction, useContext, useRef, useState } from "react";

const ModalContex = createContext({})

export function useModalContext () {
   return useContext(ModalContex) as {isModalOpen: boolean, modalFn: {func: () => Promise<void>}, setIsModalOpen: React.Dispatch<SetStateAction<boolean>>}
} 

export default function modalContexProvider({children}: {children: ReactNode}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    let modalRef = useRef({})
    let modalFn = modalRef.current

    return (
        <ModalContex.Provider value={{isModalOpen, setIsModalOpen, modalFn}}>
            {children}
        </ModalContex.Provider>
    )
}

