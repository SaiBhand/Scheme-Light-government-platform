"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { schemes } from "@/lib/schemes-data"
import { useLanguage } from "@/components/LanguageContext"

export function FeaturedSchemes() {
    const { t } = useLanguage()

    // Select top 3 schemes or specific ones to feature
    const featuredSchemes = schemes.slice(0, 3)

    return (
        <section className="py-24 bg-slate-50 border-b border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wide mb-4">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            Featured Programs
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Government Schemes</h2>
                        <p className="text-slate-600 text-lg">Explore the most applied-for benefits across the country. Verified and updated regularly.</p>
                    </div>
                    <Link href="#eligibility">
                        <Button variant="outline" className="hidden md:flex">View All Schemes <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredSchemes.map((scheme) => (
                        <Card key={scheme.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col h-full">
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 w-full" />
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                        {scheme.icon}
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                                        {scheme.ministry}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                                    {scheme.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                                    {scheme.simplifiedDescription || scheme.description}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
                                            Benefit: {scheme.benefit}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t border-slate-100 bg-slate-50/50">
                                <Link href={`/scheme/${scheme.id}`} className="w-full">
                                    <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                                        View Details
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="#eligibility">
                        <Button variant="outline" className="w-full">View All Schemes <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
