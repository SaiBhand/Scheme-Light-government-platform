"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Save, User, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { useLanguage } from "@/components/LanguageContext"
import { translations } from "@/lib/translations"

export function ProfileTab({ user }: { user: any }) {
    const { t, language } = useLanguage()
    const { toast } = useToast()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        gender: "",
        occupation: "",
        annual_income: "",
        state: "",
        category: "",
        is_disabled: false,
        is_widow: false,
        is_orphan: false,
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from("user_profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single()

                if (data) {
                    setFormData({
                        full_name: data.full_name || "",
                        age: data.age?.toString() || "",
                        gender: data.gender || "",
                        occupation: data.occupation || "",
                        annual_income: data.annual_income?.toString() || "",
                        state: data.state || "",
                        category: data.category || "",
                        is_disabled: data.is_disabled || false,
                        is_widow: data.is_widow || false,
                        is_orphan: data.is_orphan || false,
                    })
                }
            } catch (error) {
                console.error("Error fetching profile:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [user.id, supabase])

    const handleSave = async () => {
        setSaving(true)
        try {
            const { error } = await supabase
                .from("user_profiles")
                .upsert({
                    id: user.id,
                    full_name: formData.full_name,
                    age: formData.age ? parseInt(formData.age) : null,
                    gender: formData.gender,
                    occupation: formData.occupation,
                    annual_income: formData.annual_income ? parseInt(formData.annual_income) : null,
                    state: formData.state,
                    category: formData.category,
                    is_disabled: formData.is_disabled,
                    is_widow: formData.is_widow,
                    is_orphan: formData.is_orphan,
                    updated_at: new Date().toISOString(),
                })

            if (error) throw error
            toast({
                title: t.profileUpdated,
                description: t.profileSavedSuccess,
            })
        } catch (error) {
            console.error("Error updating profile:", error)
            toast({
                title: t.updateFailed,
                description: t.updateError,
                variant: "destructive",
            })
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <User className="h-8 w-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{t.yourProfile}</h2>
                    <p className="text-slate-500">{t.manageProfile}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t.personalInfo}</CardTitle>
                    <CardDescription>{t.infoUsage}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">{t.fullName}</Label>
                            <Input
                                id="full_name"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                placeholder="e.g. Rajesh Kumar"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">{t.age}</Label>
                            <Input
                                id="age"
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                placeholder="e.g. 35"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">{t.gender}</Label>
                            <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                                <SelectTrigger><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">{t.male}</SelectItem>
                                    <SelectItem value="female">{t.female}</SelectItem>
                                    <SelectItem value="other">{t.other}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">{t.state}</Label>
                            <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                                <SelectTrigger><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                                <SelectContent>
                                    {["andhra-pradesh", "assam", "bihar", "delhi", "gujarat", "karnataka", "maharashtra", "punjab", "rajasthan", "tamil-nadu", "uttar-pradesh", "west-bengal"].map((s) => (
                                        <SelectItem key={s} value={s} className="capitalize">{s.replace("-", " ")}</SelectItem>
                                    ))}
                                    <SelectItem value="other">{t.other}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="occupation">{t.occupation}</Label>
                            <Select value={formData.occupation} onValueChange={(v) => setFormData({ ...formData, occupation: v })}>
                                <SelectTrigger><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">{t.student}</SelectItem>
                                    <SelectItem value="farmer">{t.farmer}</SelectItem>
                                    <SelectItem value="salaried">{t.salariedEmployee}</SelectItem>
                                    <SelectItem value="self-employed">{t.selfEmployed}</SelectItem>
                                    <SelectItem value="unemployed">{t.unemployed}</SelectItem>
                                    <SelectItem value="homemaker">{t.homemaker}</SelectItem>
                                    <SelectItem value="agricultural-worker">{t.agriculturalWorker}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="annual_income">{t.annualIncome}</Label>
                            <Input
                                id="annual_income"
                                type="number"
                                value={formData.annual_income}
                                onChange={(e) => setFormData({ ...formData, annual_income: e.target.value })}
                                placeholder="e.g. 250000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">{t.category}</Label>
                            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                                <SelectTrigger><SelectValue placeholder={t.selectPlaceholder} /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="General">{t.general}</SelectItem>
                                    <SelectItem value="OBC">{t.obc}</SelectItem>
                                    <SelectItem value="SC">{t.sc}</SelectItem>
                                    <SelectItem value="ST">{t.st}</SelectItem>
                                    <SelectItem value="EWS">{t.ews}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <Label className="text-base">{t.specialCategories}</Label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>{t.pwd}</Label>
                                    <p className="text-xs text-muted-foreground">{t.pwdDesc}</p>
                                </div>
                                <Switch
                                    checked={formData.is_disabled}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_disabled: c })}
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>{t.widow}</Label>
                                    <p className="text-xs text-muted-foreground">{t.widowDesc}</p>
                                </div>
                                <Switch
                                    checked={formData.is_widow}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_widow: c })}
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>{t.orphan}</Label>
                                    <p className="text-xs text-muted-foreground">{t.orphanDesc}</p>
                                </div>
                                <Switch
                                    checked={formData.is_orphan}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_orphan: c })}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 bg-slate-50 p-4 rounded-b-lg">
                    <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t.saving}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {t.saveChanges}
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
