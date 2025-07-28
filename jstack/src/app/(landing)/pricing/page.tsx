"use client "

import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { client } from "@/lib/client"


const Page = () => {
    const {user} = useUser()
    const router = useRouter()

    const INCLUDED_FEATURES = [
        "10.000 real-time events per month",
        "10 event categories",
        "Advanced analytics and insights",
        "Priority support",
    ]

    const {} = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post()
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if (url) router.push(url)
        },
    })
}

export default Page