"use client"

import { useEffect, useState, useRef } from "react"
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Columns2, TableColumnsSplit, Plus, Zap, Search, Trash, Sparkle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { fetchApplicants, setPage, resetApplicants } from "@/store/reducers/applicant"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import type { RootState } from "@/store/store"
import { formatFieldName } from "@/lib/format-column-name"
import { columns } from "./columns"
import { useDebounce } from "use-debounce"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MobileFilterControls } from "@/components/ui/mobile-controller"
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading"

export default function TalentPool() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const tableContainerRef = useRef<HTMLDivElement>(null)
    const [filterOpen, setFilterOpen] = useState(false)
    const [showAIInput, setShowAIInput] = useState(false);

    const [searchValue, setSearchValue] = useState<string>("")
    const [debouncedSearchValue] = useDebounce(searchValue, 500)

    const isMobile = useMediaQuery("(max-width: 768px)")

    const { applicants, loading, error, currentPage, pages } = useAppSelector((state: RootState) => state.applicant)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isMobile) {
            setColumnVisibility({
                select: true,
                profilePhotoUrl: true,
                firstName: true,
                "activeApplication.stage.name": true,
                "activeApplication.aiFit": false,
                sourceType: false,
                rating: false,
                createdAt: false,
                "activeApplication.jobListing.name": true,
                resume: true,
                actions: true,
            })
        }
    }, [isMobile])

    const table = useReactTable({
        data: applicants,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useEffect(() => {
        dispatch(fetchApplicants({ page: currentPage, pageSize: 30 }))
    }, [dispatch, currentPage])

    useEffect(() => {
        const handleScroll = () => {
            if (!tableContainerRef.current) return
            const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current
            if (scrollHeight - scrollTop - clientHeight < 100 && !loading && currentPage < pages) {
                dispatch(setPage(currentPage + 1))
            }
        }

        const currentRef = tableContainerRef.current
        currentRef?.addEventListener("scroll", handleScroll)
        return () => currentRef?.removeEventListener("scroll", handleScroll)
    }, [loading, currentPage, pages, dispatch])

    useEffect(() => {
        const column = table.getColumn("firstName")
        if (column) {
            column.setFilterValue(debouncedSearchValue)
        }
    }, [debouncedSearchValue, table])

    const resetAllApplicants = () => {
        dispatch(resetApplicants())
        dispatch(setPage(1))
        dispatch(fetchApplicants({ page: 1, pageSize: 30 }))
    }

    if (loading && currentPage === 1) return <div className="p-4">Loading applicants...</div>
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>

    const mobileFilterControls = (
        <MobileFilterControls
            table={table}
            open={filterOpen}
            onOpenChange={setFilterOpen}
            formatFieldName={formatFieldName}
        />
    )

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center py-4 gap-2">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 md:ml-auto">
                    {mobileFilterControls}
                    <div className="hidden md:flex items-center gap-2">
                        <Button onClick={resetAllApplicants} variant="outline">
                            <Trash className="h-4 w-4" />
                            Reset Applicants
                        </Button>
                        <Button
                            onClick={() => setShowAIInput(!showAIInput)}
                            variant="outline"
                        >
                            <Sparkle className="h-4 w-4" />
                            Ask AI
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Name</DropdownMenuItem>
                                <DropdownMenuItem>AI Score</DropdownMenuItem>
                                <DropdownMenuItem>Date Added</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Columns2 className="h-4 w-4 mr-2" /> Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => (
                                        <DropdownMenuItem
                                            key={column.id}
                                            className="flex items-center justify-between px-4 py-2"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Zap className="h-4 w-4" />
                                                <span className="capitalize">{formatFieldName(column.id)}</span>
                                            </div>
                                            <Switch
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(value)}
                                                className="ml-2"
                                            />
                                        </DropdownMenuItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <TableColumnsSplit className="h-4 w-4 mr-2" /> Sheet View
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Table</DropdownMenuItem>
                                <DropdownMenuItem>Flow</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Export last 7 days</DropdownMenuItem>
                                <DropdownMenuItem>Export last 30 days</DropdownMenuItem>
                                <DropdownMenuItem>Export All</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="rounded-md ">
                <div ref={tableContainerRef} className="relative h-[calc(100vh-180px)] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead className="border-r" key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="border" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center border">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {loading && currentPage > 1 && (
                        <div className="p-4 text-center text-muted-foreground">Loading more applicants...</div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1">
                    <Button variant="outline" onClick={() => console.log("add talent")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Talent
                    </Button>
                </div>
            </div>
            {showAIInput && (
                <AIInputWithLoading
                    onSubmit={(value) => {
                        console.log("AI query:", value);
                    }}
                    className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
                />
            )}
        </div>
    )
}

