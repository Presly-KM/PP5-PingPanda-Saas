"use client"

import { Event, EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { client } from "@/lib/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ArrowUpDown, BarChart } from "lucide-react"
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils"
import { Heading } from "@/components/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CategoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}

export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "today"
  )

  // https://localhost:3000/dashboard/category/sale?page=5&limit=30
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "30", 10)

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  })

  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
  })

  const { data, isFetching } = useQuery({
    queryKey: [
      "events",
      category.name,
      pagination.pageIndex,
      pagination.pageSize,
      activeTab,
    ],
    queryFn: async () => {
      const res = await client.category.getEventsByCategoryName.$get({
        name: category.name,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTab,
      })

      return await res.json()
    },
    refetchOnWindowFocus: false,
    enabled: pollingData.hasEvents,
  })

  const columns: ColumnDef<Event>[] = useMemo(                                   // Ici on utilise useMemo pour mémoriser les colonnes et éviter de les recalculer à chaque rendu
    () => [
      {
        accessorKey: "category",
        header: "Category",
        cell: () => <span>{category.name || "Uncategorized"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString()
        },
      },
      ...(data?.events[0]
        ? Object.keys(data.events[0].fields as object).map((field) => ({          // Ici on utilise Object.keys pour récupérer les clés des champs de l'événement
            accessorFn: (row: Event) =>
              (row.fields as Record<string, any>)[field],                         // Ici on utilise un accessorFn pour accéder à la valeur du champ dans l'objet fields
            header: field,
            cell: ({ row }: { row: Row<Event> }) =>
              (row.original.fields as Record<string, any>)[field] || "-",         // Ici on utilise row.original pour accéder à l'événement original et récupérer la valeur du champ
          }))
        : []),
      {
        accessorKey: "deliveryStatus",                                            // Ici on ajoute une colonne pour le statut de livraison
        header: "Delivery Status",                                                // Ici on définit l'en-tête de la colonne
        cell: ({ row }) => (                                                      // Ici on utilise une fonction pour afficher le statut de livraison
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-red-100 text-red-800":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-yellow-100 text-yellow-800":
                row.getValue("deliveryStatus") === "PENDING",
            })}
          >
            {row.getValue("deliveryStatus")}                                      {/* Ici on affiche la valeur du statut de livraison */}
          </span>
        ),
      },
    ],

    [category.name, data?.events]                                                 // Ici on utilise useMemo pour mémoriser les colonnes et éviter de les recalculer à chaque rendu. Par exemple, si la catégorie change ou si les événements changent, les colonnes seront recalculées.
  )

  const [sorting, setSorting] = useState<SortingState>([])                        // Ici on initialise l'état de tri avec un tableau vide
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])      // Ici on initialise l'état des filtres de colonnes avec un tableau vide

  const table = useReactTable({                                                   // Ici on utilise useReactTable pour créer une instance de table avec les données et les colonnes
    data: data?.events || [],                                                     // Ici on utilise les événements récupérés par la requête ou un tableau vide si les données ne sont pas encore disponibles
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  /**
   * I FORGOT THIS IN THE VIDEO
   * Update URL when pagination changes
   */
  const router = useRouter()

  useEffect(() => {                                                            // Ici on utilise useEffect pour mettre à jour l'URL lorsque la pagination change
    const searchParams = new URLSearchParams(window.location.search)           // Ici on crée un objet URLSearchParams à partir de l'URL actuelle
    searchParams.set("page", (pagination.pageIndex + 1).toString())
    searchParams.set("limit", pagination.pageSize.toString())
    router.push(`?${searchParams.toString()}`, { scroll: false })
  }, [pagination, router])
  
  /**
   * END OF WHAT I FORGOT IN THE VIDEO
   */

  const numericFieldSums = useMemo(() => {                                      // Ici on calcule les sommes des champs numériques
    if (!data?.events || data.events.length === 0) return {}                    // Ici on vérifie si les événements existent et s'il y en a au moins un. Ainsi, dans le cas où il n'y a pas d'événements, on retourne un objet vide.

    const sums: Record<                                                         // Ici on initialise un objet pour stocker les sommes des champs numériques
      string,                                                                   // Ici on utilise un Record pour indiquer que les clés sont des chaînes de caractères et les valeurs sont des objets contenant les sommes. Les Record sont utiles pour créer des objets dynamiques avec des clés connues à l'avance. 
      {
        total: number
        thisWeek: number
        thisMonth: number
        today: number
      }
    > = {}

    const now = new Date()                                                       // Ici on récupère la date actuelle pour comparer les dates des événements
    const weekStart = startOfWeek(now, { weekStartsOn: 0 })                      // Ici on calcule le début de la semaine en cours, en considérant que la semaine commence le dimanche (0)
    const monthStart = startOfMonth(now)                                         // Ici on calcule le début du mois en cours

    data.events.forEach((event) => {                                             // Ici on parcourt chaque événement pour calculer les sommes des champs numériques
      const eventDate = event.createdAt

      Object.entries(event.fields as object).forEach(([field, value]) => {
        if (typeof value === "number") {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 }
          }

          sums[field].total += value

          if (
            isAfter(eventDate, weekStart) ||
            eventDate.getTime() === weekStart.getTime()
          ) {
            sums[field].thisWeek += value
          }

          if (
            isAfter(eventDate, monthStart) ||
            eventDate.getTime() === monthStart.getTime()
          ) {
            sums[field].thisMonth += value
          }

          if (isToday(eventDate)) {
            sums[field].today += value
          }
        }
      })
    })

    return sums
  }, [data?.events])

  const NumericFieldSumCards = () => {
    if (Object.keys(numericFieldSums).length === 0) return null

    return Object.entries(numericFieldSums).map(([field, sums]) => {
      const relevantSum =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
          ? sums.thisWeek
          : sums.thisMonth

      return (
        <Card key={field}>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
            <p className="text-xs/5 text-muted-foreground">
              {activeTab === "today"
                ? "today"
                : activeTab === "week"
                ? "this week"
                : "this month"}
            </p>
          </div>
        </Card>
      )
    })
  }

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "today" | "week" | "month")
        }}
      >
        <TabsList className="mb-2">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <Card className="border-2 border-brand-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm/6 font-medium">Total Events</p>
                <BarChart className="size-4 text-muted-foreground" />
              </div>

              <div>
                <p className="text-2xl font-bold">{data?.eventsCount || 0}</p>
                <p className="text-xs/5 text-muted-foreground">
                  Events{" "}
                  {activeTab === "today"
                    ? "today"
                    : activeTab === "week"
                    ? "this week"
                    : "this month"}
                </p>
              </div>
            </Card>

            <NumericFieldSumCards />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <Heading className="text-3xl">Event overview</Heading>
          </div>
        </div>

        <Card contentClassName="px-6 py-4">                                {/* Ici on utilise le composant Card pour afficher le tableau des événements */}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>                                                                           {/* Ici on utilise le composant TableBody pour afficher les lignes du tableau */}
              {isFetching ? (                                                                      // Ici on affiche un état de chargement si les données sont en cours de récupération
                [...Array(5)].map((_, rowIndex) => (                                                // Ici on crée un tableau de 5 éléments pour afficher des lignes de chargement
                  <TableRow key={rowIndex}>                                                      {/* Ici on utilise TableRow pour chaque ligne de chargement */}
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>                                                  {/* Ici on utilise TableCell pour chaque cellule de chargement */}
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />       {/* Ici on utilise une div avec des classes pour créer un effet de chargement */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (                                           // Ici on vérifie si le tableau a des lignes à afficher
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isFetching}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isFetching}
        >
          Next
        </Button>
      </div>
    </div>
  )
}