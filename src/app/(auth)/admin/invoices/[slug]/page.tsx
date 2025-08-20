"use client";
import React, { use, useRef } from "react";
import Head from "next/head";
import { invoices } from "@/constants/invoices";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Printer, Undo2 } from "lucide-react";

interface SingleInvoiceProps {
  params: Promise<{ slug: string }>;
}

export default function InvoiceDetailPage({ params }: SingleInvoiceProps) {
  const { slug } = use(params);
  const invoice = invoices.find((invoice) => invoice.id === slug);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  if (!invoice) {
    return notFound;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Invoice {invoice.invoiceNumber} - CRMS</title>
        <meta
          name="description"
          content={`Invoice details for ${invoice.invoiceNumber}`}
        />
      </Head>

      <div className="invoice-container mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-bold">CRMS</h1>
            <p className="mt-1 text-sm text-gray-500">
              3099 Kennedy Court Framingham, MA 01702
            </p>
          </div>
          {/* Invoice Info */}
          <div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Invoice No:</p>
                <p className="font-semibold text-secondary">
                  #{invoice.invoiceNumber}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Issue Date:</p>
                <p className="font-semibold">{invoice.issueDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Due Date:</p>
                <p className="font-semibold">{invoice.dueDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* From/To Information */}
        <div className="border-b p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="mb-2 font-medium text-gray-600">From</p>
              <p className="font-semibold">Thomas Lawler</p>
              <p className="text-sm text-gray-600">
                2077 Chicago Avenue Orosi, CA 93647
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Email: tarala2445@gmail.com
              </p>
              <p className="text-sm text-gray-600">Phone: +1 987 654 3210</p>
            </div>
            <div>
              <p className="mb-2 font-medium text-gray-600">To</p>
              <p className="font-semibold">{invoice.client.name}</p>
              <p className="text-sm text-gray-600">
                {invoice.client.location.country}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Email: {invoice.client.email}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {invoice.client.phone}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-2 font-medium text-gray-600">Payment Status</p>
                <span className="inline-flex items-center rounded-md bg-main px-3 py-1 text-sm font-medium text-white">
                  {invoice.paymentStatus}
                </span>
              </div>
              <div ref={qrCodeRef} className="mt-4 flex justify-end">
                <div className="rounded-lg border bg-white p-2">
                  {/* QR Code will be generated here */}
                  <div className="flex h-24 w-24 items-center justify-center bg-gray-200 text-xs text-gray-500">
                    QR Code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice For */}
        <div className="border-b p-6">
          <p className="font-medium text-gray-600">Invoice For</p>
          <p className="font-semibold">Design & Development of Website</p>
        </div>

        {/* Items Table */}
        <div className="border-b p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Job Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${item.unitPrice.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      $100
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals and Notes */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="mb-2 font-medium text-gray-600">
                Terms and Conditions
              </p>
              <p className="text-sm text-gray-600">
                Please pay within 15 days from the date of invoice, overdue
                interest @ 14% will be charged on delayed payments.
              </p>
              <p className="mb-2 mt-4 font-medium text-gray-600">Notes</p>
              <p className="text-sm text-gray-600">
                Please quote invoice number when remitting funds.
              </p>
            </div>
            <div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">$5500</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Discount(0%)</span>
                  <span className="font-medium">$400</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">VAT(5%)</span>
                  <span className="font-medium">$54</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-gray-200 py-2 pt-2">
                  <span className="font-semibold text-gray-800">
                    Total Amount
                  </span>
                  <span className="font-bold text-main">
                    ${invoice.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Amount in Words: Dollar Five thousand Seven Seventy Five
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="flex flex-col items-end gap-2 border-t p-6">
          <p className="text-sm font-medium">Ted M. Davis</p>
          <p className="text-xs text-gray-600">Assistant Manager</p>
        </div>

        {/* Payment Information */}
        <div className="border-t p-6">
          <p className="mb-2 text-center text-4xl">CRMS</p>
          <p className="text-center text-xs text-gray-600">
            Payment Made Via bank transfer / Cheque in the name of Thomas Lawler
          </p>
          <div className="mt-4 flex justify-center gap-4 font-medium">
            <p className="text-xs">
              <span className="text-xs font-medium text-gray-600">
                Bank Name:
              </span>{" "}
              HDFC Bank
            </p>
            <p className="text-xs">
              <span className="text-xs font-medium text-gray-600">
                Account Number:
              </span>{" "}
              45366287987
            </p>
            <p className="text-xs">
              <span className="text-xs font-medium text-gray-600">IFSC:</span>{" "}
              HDFC0018159
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="no-print mx-auto mt-6 flex max-w-4xl justify-end space-x-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-md bg-main px-4 py-2 text-xs font-medium text-white transition duration-200"
        >
          <Printer size={15} /> Print Invoice
        </button>
        <Link
          href={"/admin/invoices"}
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-xs font-medium text-white transition duration-200 hover:bg-black/80"
        >
          <Undo2 size={15} /> Back to Invoices
        </Link>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-container,
          .invoice-container * {
            visibility: visible;
          }
          .invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
