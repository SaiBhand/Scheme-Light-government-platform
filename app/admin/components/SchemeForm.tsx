"use client"

import React, { useState } from "react"
import { X, Plus, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function SchemeForm({ onClose, onSave, initialData, t }: { onClose: () => void, onSave: (data: any) => void, initialData?: any, t: any }) {
    const [formData, setFormData] = useState(initialData || {
        name: "",
        ministry: "",
        icon: "📜",
        benefit: "",
        targetGroup: "",
        keyBenefits: [""],
        eligibility: {
            ageMin: "",
            ageMax: "",
            incomeMax: "",
            categories: [],
            occupations: [],
            states: [],
            gender: "Both",
            targetGroups: [""]
        },
        documents: [""],
        applicationMode: "Online",
        applyUrl: ""
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
                    <X className="w-5 h-5" />
                </Button>

                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-black">{initialData ? t.editScheme : t.addNewScheme}</h2>
                    <p className="text-sm text-slate-500">Fill in the details to curate a new government scheme</p>
                </div>

                <CardContent className="p-8 space-y-10">
                    {/* Section: Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <Info className="w-3.5 h-3.5" /> Basic Information
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2 col-span-2">
                                <Label className="text-xs font-bold">Scheme Name</Label>
                                <Input placeholder="e.g. Ladli Behna Yojana" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Icon Emoji</Label>
                                <Input placeholder="📜" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Ministry</Label>
                                <Input placeholder="e.g. Ministry of Women & Child Development" value={formData.ministry} onChange={e => setFormData({ ...formData, ministry: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Target Group Summary</Label>
                                <Input placeholder="e.g. Women citizens of India" value={formData.targetGroup} onChange={e => setFormData({ ...formData, targetGroup: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold">Primary Benefit Summary</Label>
                            <Textarea placeholder="Briefly describe what the citizen gets..." value={formData.benefit} onChange={e => setFormData({ ...formData, benefit: e.target.value })} />
                        </div>
                    </div>

                    {/* Section: Eligibility */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Eligibility Criteria
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Min Age</Label>
                                <Input type="number" placeholder="18" value={formData.eligibility.ageMin} onChange={e => setFormData({ ...formData, eligibility: { ...formData.eligibility, ageMin: e.target.value } })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Max Age</Label>
                                <Input type="number" placeholder="60" value={formData.eligibility.ageMax} onChange={e => setFormData({ ...formData, eligibility: { ...formData.eligibility, ageMax: e.target.value } })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Max Income (Annual ₹)</Label>
                                <Input type="number" placeholder="250000" value={formData.eligibility.incomeMax} onChange={e => setFormData({ ...formData, eligibility: { ...formData.eligibility, incomeMax: e.target.value } })} />
                            </div>
                        </div>
                    </div>

                    {/* Section: URLs */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Application Mode</Label>
                                <Select value={formData.applicationMode} onValueChange={v => setFormData({ ...formData, applicationMode: v })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Online">Online</SelectItem>
                                        <SelectItem value="Offline">Offline</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold">Official Application URL</Label>
                                <Input placeholder="https://..." value={formData.applyUrl} onChange={e => setFormData({ ...formData, applyUrl: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-8" onClick={() => onSave(formData)}>Save Scheme</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
