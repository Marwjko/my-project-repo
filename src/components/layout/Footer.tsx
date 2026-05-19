
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-200 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="font-headline font-bold text-lg mb-4 text-white">How it works</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/how-it-works" className="hover:text-white transition-colors">Getting Started</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/customer-service" className="hover:text-white transition-colors">Customer Service</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-headline font-bold text-lg mb-4 text-white">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-4 text-white">Popular Cities</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/city/riyadh" className="hover:text-white transition-colors">Riyadh</Link></li>
            <li><Link href="/city/jeddah" className="hover:text-white transition-colors">Jeddah</Link></li>
            <li><Link href="/city/dammam" className="hover:text-white transition-colors">Dammam</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 MyOffers. All Rights Reserved. Part 1 - Web Systems Project.</p>
          <p>College of Computers and Information Technology | Taif University</p>
        </div>
      </div>
    </footer>
  )
}
