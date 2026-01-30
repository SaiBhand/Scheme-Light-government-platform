"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, MoreVertical, FileCheck, FileWarning, Trash2, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function DocumentsPage() {
    const { toast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)

    const [documents, setDocuments] = useState([
        { id: 1, name: "Aadhaar Card", status: "Verified", date: "Jan 15, 2024", type: "Identity" },
        { id: 2, name: "Income Certificate", status: "Pending", date: "Feb 20, 2024", type: "Income" },
        { id: 3, name: "Caste Certificate", status: "Verified", date: "Dec 10, 2023", type: "Identity" },
        { id: 4, name: "Domicile Certificate", status: "Required", date: "-", type: "Residence" },
    ])

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            toast({
                title: "Uploading...",
                description: `Uploading ${file.name}`,
            })
            // Simulate upload delay
            setTimeout(() => {
                toast({
                    title: "Upload Successful",
                    description: `${file.name} has been added to your vault.`,
                })
                // Add mock document
                setDocuments(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        name: file.name.split('.')[0], // Use filename as doc name
                        status: "Pending",
                        date: "Just now",
                        type: "Other"
                    }
                ])
            }, 1500)
        }
    }

    const handleAction = (action: string, doc: any) => {
        if (action === "View") {
            setSelectedDoc(doc.name)
            setViewDialogOpen(true)
        } else if (action === "Delete") {
            setDocuments(prev => prev.filter(d => d.id !== doc.id))
            toast({
                title: "Document Deleted",
                description: `${doc.name} has been removed.`,
                variant: "destructive"
            })
        } else if (action === "Download") {
            toast({
                title: "Download Started",
                description: `Downloading ${doc.name}...`,
            })
        }
    }

    return (
        <div className="p-6 space-y-6">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
            />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documents Vault</h1>
                    <p className="text-muted-foreground mt-2">Securely store and verify your key documents.</p>
                </div>
                <Button onClick={handleUploadClick}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <Card key={doc.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {doc.type}
                            </CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleAction("View", doc)}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction("Download", doc)}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleAction("Delete", doc)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{doc.name}</div>
                                    <div className="text-xs text-muted-foreground">Updated: {doc.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {doc.status === "Verified" ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        <FileCheck className="w-3 h-3 mr-1" />
                                        Verified
                                    </span>
                                ) : doc.status === "Pending" ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                        <FileWarning className="w-3 h-3 mr-1" />
                                        Pending
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                        Missing
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Document Preview: {selectedDoc}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-8 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300">
                        <div className="text-center text-muted-foreground">
                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Preview not available for mock data.</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
