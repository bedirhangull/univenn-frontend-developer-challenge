/* eslint-disable react-refresh/only-export-components */
"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Star, FileText, Columns2, TableColumnsSplit, Plus, Zap, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

// Define the candidate data type
export type Candidate = {
    id: string
    name: string
    avatar: string
    stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected"
    aiScore: number
    source: string
    rating: number
    dateAdded: string
    appliedJob: string
    resumeUrl: string
}

// Sample candidate data
const data: Candidate[] = [
    {
        id: "c1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        stage: "Screening",
        aiScore: 87,
        source: "LinkedIn",
        rating: 4,
        dateAdded: "2023-10-15",
        appliedJob: "Frontend Developer",
        resumeUrl: "/resumes/alex-johnson.pdf",
    },
    {
        id: "c2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        stage: "Interview",
        aiScore: 92,
        source: "Referral",
        rating: 5,
        dateAdded: "2023-10-12",
        appliedJob: "UX Designer",
        resumeUrl: "/resumes/sarah-williams.pdf",
    },
    {
        id: "c3",
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        stage: "Applied",
        aiScore: 75,
        source: "Indeed",
        rating: 3,
        dateAdded: "2023-10-18",
        appliedJob: "Backend Developer",
        resumeUrl: "/resumes/michael-brown.pdf",
    },
    {
        id: "c4",
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        stage: "Offer",
        aiScore: 95,
        source: "AngelList",
        rating: 5,
        dateAdded: "2023-10-05",
        appliedJob: "Product Manager",
        resumeUrl: "/resumes/emily-davis.pdf",
    },
    {
        id: "c5",
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        stage: "Hired",
        aiScore: 89,
        source: "Company Website",
        rating: 4,
        dateAdded: "2023-09-28",
        appliedJob: "DevOps Engineer",
        resumeUrl: "/resumes/david-wilson.pdf",
    },
]

// Render star ratings
const RatingStars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
        </div>
    )
}

export const columns: ColumnDef<Candidate>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="mr-2"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: "",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.avatar} alt={row.original.name} />
                <AvatarFallback>{row.original.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => {
            const stage = row.getValue("stage") as string
            return <div className="rounded-full">{stage}</div>
        },
    },
    {
        accessorKey: "aiScore",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    AI Fit Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const score = row.getValue("aiScore") as number
            return <div className="font-medium  ml-4">{score}%</div>
        },
    },
    {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => <div>{row.getValue("source")}</div>,
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <RatingStars rating={row.getValue("rating") as number} />,
    },
    {
        accessorKey: "dateAdded",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Date Added
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("dateAdded") as string)
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "appliedJob",
        header: "Applied Job",
        cell: ({ row }) => <Badge className="rounded-full text-purple-500 bg-purple-50 border-purple-100">{row.getValue("appliedJob")}</Badge>,
    },
    {
        accessorKey: "resumeUrl",
        header: "Resume",
        cell: () => (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <FileText className="h-4 w-4" />
                <span className="sr-only">View resume</span>
            </Button>
        ),
        enableSorting: false,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const candidate = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(candidate.id)}>
                            Copy candidate ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                        <DropdownMenuItem>Schedule interview</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function TalentPool() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <ArrowUpDown className="h-4 w-4" /> Sort
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
                                        onSelect={(e) => e.preventDefault()} // Prevent menu close on switch toggle
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Zap className="h-4 w-4" />
                                            <span className="capitalize">{column.id}</span>
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
                                <Columns2 className="h-4 w-4" /> Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <TableColumnsSplit className="h-4 w-4" /> Sheet View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
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
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="border-r" key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="border" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1">
                    <Button variant="outline" onClick={() => console.log("add talent")}>
                        <Plus className="h-4 w-4" />
                        Add Talent
                    </Button>
                </div>
            </div>
        </div>
    )
}

