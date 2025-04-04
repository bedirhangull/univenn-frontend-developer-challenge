"use client"

import { Table } from "@tanstack/react-table"
import { ListFilter, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

interface MobileFilterControlsProps<TData> {
    table: Table<TData>
    open: boolean
    onOpenChange: (open: boolean) => void
    formatFieldName: (id: string) => string
}

export function MobileFilterControls<TData>({
    table,
    open,
    onOpenChange,
    formatFieldName,
}: MobileFilterControlsProps<TData>) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <ListFilter className="h-4 w-4" />
                    <span className="sr-only">Filters</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Filters & Columns</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4 p-4">
                    <h3 className="text-sm font-medium">Visible Columns</h3>
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-1">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <div key={column.id} className="flex items-center justify-between py-2">
                                        <div className="flex items-center space-x-2">
                                            <Zap className="h-4 w-4" />
                                            <span className="text-sm">{formatFieldName(column.id)}</span>
                                        </div>
                                        <Switch
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(value)}
                                        />
                                    </div>
                                ))}
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    )
}
