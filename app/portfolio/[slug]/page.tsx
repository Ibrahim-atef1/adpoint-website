import React from "react"
import { getClientBySlug, getAllClients } from "@/lib/client-data"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import the client component
const ClientPageClient = dynamic(() => import("./client-page-client"), {
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
})

interface ClientPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { slug } = await params
  const client = getClientBySlug(slug)
  
  if (!client) {
    notFound()
  }

  return <ClientPageClient client={client} />
}

// Generate static params for all clients
export async function generateStaticParams() {
  const clients = getAllClients()
  return clients.map((client) => ({
    slug: client.slug,
  }))
}
