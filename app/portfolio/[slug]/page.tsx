import React from "react"
import { getClientBySlug, getAllClients } from "@/lib/client-data"
import { notFound } from "next/navigation"
import ClientPageClient from "./client-page-client"

interface ClientPageProps {
  params: {
    slug: string
  }
}

export default function ClientPage({ params }: ClientPageProps) {
  const client = getClientBySlug(params.slug)
  
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
