import { Metadata } from "next"
import { FileText, FileImage, Upload, FolderPlus, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate, formatFileSize } from "@/lib/utils"

export const metadata: Metadata = { title: "Vault | ValeriumPro" }

const mimeIcons: Record<string, React.ElementType> = {
  "application/pdf": FileText,
  "image/png":       FileImage,
  "image/jpeg":      FileImage,
}

const mimeColors: Record<string, string> = {
  "application/pdf": "bg-red-500/10 text-red-400",
  "image/png":       "bg-blue-500/10 text-blue-400",
  "image/jpeg":      "bg-blue-500/10 text-blue-400",
}

const documents = [
  { id: "1", name: "Service Agreement v3.pdf", mimeType: "application/pdf", size: 245000,  folder: "/contracts", createdAt: new Date(Date.now() - 1000*60*60*24*2).toISOString() },
  { id: "2", name: "Brand Guidelines.pdf",     mimeType: "application/pdf", size: 1200000, folder: "/branding",  createdAt: new Date(Date.now() - 1000*60*60*24*7).toISOString() },
  { id: "3", name: "Project Proposal.pdf",     mimeType: "application/pdf", size: 89000,   folder: "/proposals", createdAt: new Date(Date.now() - 1000*60*60*24*14).toISOString() },
  { id: "4", name: "Logo_Final.png",           mimeType: "image/png",       size: 520000,  folder: "/assets",    createdAt: new Date(Date.now() - 1000*60*60*24*21).toISOString() },
  { id: "5", name: "Invoice Template.pdf",     mimeType: "application/pdf", size: 34000,   folder: "/templates", createdAt: new Date(Date.now() - 1000*60*60*24*30).toISOString() },
  { id: "6", name: "Onboarding Checklist.pdf", mimeType: "application/pdf", size: 56000,   folder: "/",          createdAt: new Date(Date.now() - 1000*60*60*24*45).toISOString() },
]

const totalSize = documents.reduce((s, d) => s + d.size, 0)

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium">Vault</h1>
          <span className="text-xs text-muted-foreground">
            {documents.length} files · {formatFileSize(totalSize)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs border-border">
            <FolderPlus className="h-3.5 w-3.5" />
            New folder
          </Button>
          <Button size="sm" className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
            <Upload className="h-3.5 w-3.5" />
            Upload
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-[#fafafa] dark:bg-[#0d0d0d]">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden md:table-cell">Folder</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-muted-foreground">Size</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-muted-foreground hidden sm:table-cell">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents.map((doc) => {
              const Icon = mimeIcons[doc.mimeType] ?? File
              const colorClass = mimeColors[doc.mimeType] ?? "bg-muted text-muted-foreground"
              return (
                <tr key={doc.id} className="hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center ${colorClass}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[13px] font-medium truncate max-w-[280px]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden md:table-cell font-mono">{doc.folder}</td>
                  <td className="px-4 py-3 text-right text-[13px] text-muted-foreground tabular-nums">{formatFileSize(doc.size)}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground hidden sm:table-cell">{formatDate(doc.createdAt, "MMM d, yyyy")}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
