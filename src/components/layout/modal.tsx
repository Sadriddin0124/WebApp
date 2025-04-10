import React, { useEffect, useCallback, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";


const Modal = ({
    open,
    setOpen,
    content,
    styles,
    blur,
    dontClose
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    content: JSX.Element,
    styles?: CSSProperties
    blur?: boolean
    dontClose?: boolean
}) => {

    // Close modal on Escape key press
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // if (event.key === "Escape") {
        //     setOpen(false);
        // }
    }, []);

    useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleKeyDown]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className={`${blur && "backdrop-blur-sm"} fixed -top-4 left-0 w-screen h-[120vh] bg-[#000000a7] bg-opacity-50 z-40 px-3`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />
                    {/* Modal Content */}
                    <div className="fixed z-50 top-0 left-0 !mt-0 w-full h-screen flex justify-center items-center"

                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            style={styles}
                            className="absolute w-full max-w-[400px] p-6 bg-white rounded-xl shadow-lg "
                        >
                            {/* Close Button */}
                            {dontClose || <div
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <IoClose className="w-5 h-5" />
                            </div>}
                            {content}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
