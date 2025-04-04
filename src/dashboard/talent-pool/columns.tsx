import { ApplicantWithActiveApplication } from "@/types/applicant"
import RatingStars from "@/components/ui/rating-starts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    type ColumnDef,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { ArrowUpDown, FileText, MoreHorizontal } from "lucide-react"
import { PDFViewerSheet } from "@/components/ui/pdf-viewer"

export const columns: ColumnDef<ApplicantWithActiveApplication>[] = [
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
        accessorKey: "profilePhotoUrl",
        header: "",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.profilePhotoUrl || ""} alt={`${row.original.firstName} ${row.original.lastName}`} />
                <AvatarFallback>
                    {row.original.firstName?.[0]}{row.original.lastName?.[0]}
                </AvatarFallback>
            </Avatar>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.original.firstName} {row.original.lastName}</div>,
    },
    {
        accessorKey: "activeApplication.stage.name",
        header: "Stage",
        cell: ({ row }) => <div>{row.original.activeApplication?.stage?.name || "Applied"}</div>,
    },
    {
        accessorKey: "activeApplication.aiFit",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                AI Fit Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium ml-4">{row.original.activeApplication?.aiFit || 0}%</div>,
    },
    {
        accessorKey: "sourceType",
        header: "Source",
        cell: ({ row }) => <div>{row.original.sourceType}</div>,
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <RatingStars rating={row.original.rating} />,
        sortingFn: 'basic',
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Date Added
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>,
        sortingFn: 'datetime',
    },
    {
        accessorKey: "activeApplication.jobListing.name",
        header: "Applied Job",
        cell: ({ row }) => (
            <Badge className="rounded-full text-purple-500 bg-purple-50 border-purple-100">
                {row.original.activeApplication?.jobListing?.name || "N/A"}
            </Badge>
        ),
    },
    {
        accessorKey: "resume",
        header: "Resume",
        cell: ({ row }) => {
            const attachment = row.original.activeApplication?.resume
            return (
                <PDFViewerSheet
                    attachment={attachment}
                    triggerElement={
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View resume</span>
                        </Button>
                    }
                />)
        },
        enableSorting: false,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
                        Copy candidate ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Send email</DropdownMenuItem>
                    <DropdownMenuItem>Schedule interview</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]