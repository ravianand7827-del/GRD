import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Refund Policy', description: 'Refund and cancellation policy of GRD Travels.' };

export default function RefundPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-brand-navy-dark">
      <section className="py-16 bg-brand-navy text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-3">Refund <span className="text-brand-gold">Policy</span></h1>
        <p className="text-white/60">Last updated: January 2025</p>
      </section>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-brand-navy rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-brand-navy dark:text-white mb-4">Cancellation & Refund Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="px-4 py-3 text-left rounded-tl-xl">Cancellation Notice</th>
                    <th className="px-4 py-3 text-left rounded-tr-xl">Refund Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                  {[
                    ['30+ days before travel', '100% refund'],
                    ['15-29 days before travel', '90% refund'],
                    ['7-14 days before travel', '70% refund'],
                    ['3-6 days before travel', '50% refund'],
                    ['Less than 3 days', 'No refund'],
                    ['No show', 'No refund'],
                  ].map(([notice, refund]) => (
                    <tr key={notice} className="hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="px-4 py-3 text-gray-600 dark:text-white/70">{notice}</td>
                      <td className={`px-4 py-3 font-medium ${refund === 'No refund' ? 'text-red-500' : 'text-green-600'}`}>{refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {[
            { title: 'How to Cancel', content: 'To cancel your booking, contact us via email at booking@grdtravels.com or call +91 8595995437 with your Booking ID. Cancellations must be made in writing.' },
            { title: 'Refund Processing', content: 'Approved refunds are processed within 7-10 working days to the original payment method. Bank processing times may vary.' },
            { title: 'Non-Refundable Items', content: 'Visa fees, travel insurance premiums, and any third-party bookings made on your behalf are non-refundable.' },
            { title: 'Force Majeure', content: 'In case of cancellations due to natural disasters, government restrictions, or other force majeure events, we will offer a full credit note valid for 12 months.' },
          ].map((section) => (
            <div key={section.title} className="mb-5">
              <h3 className="font-semibold text-brand-navy dark:text-white mb-2">{section.title}</h3>
              <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
