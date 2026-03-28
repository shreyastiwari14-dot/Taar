import { redirect } from 'next/navigation'
export default function PricingPage() { redirect('/#pricing') }
export const dynamic = 'force-static'
