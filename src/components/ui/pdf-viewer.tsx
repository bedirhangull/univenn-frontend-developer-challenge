"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import type { ApplicationAttachment } from "@/types/applicant"

interface PDFViewerSheetProps {
    attachment: ApplicationAttachment | null
    triggerElement?: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
    size?: "sm" | "default" | "lg" | "xl" | "full" | "content"
}

export function PDFViewerSheet({ attachment, triggerElement, side = "right" }: PDFViewerSheetProps) {
    const [open, setOpen] = useState(false)

    if (!attachment) return null

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {triggerElement || (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View resume</span>
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent side={side} className="w-[400px] sm:w-[1200px] sm:max-w-none ">
                <SheetHeader>
                    <SheetTitle>{attachment.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 h-[calc(100vh-8rem)]">
                    <iframe
                        src={`${attachment.url}#toolbar=1&navpanes=1`}
                        className="h-full w-full rounded border"
                        title={attachment.name}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

