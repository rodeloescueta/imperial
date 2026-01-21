"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, XCircle, Clock, MapPin, Calendar } from "lucide-react"
import { Footer } from "@/components/sections"
import coverageData from "@/data/coverage.json"

// Mock data for maintenance and incidents
const scheduledMaintenance = [
  {
    id: 1,
    title: "Network Upgrade - Imus Area",
    date: "January 25, 2026",
    time: "2:00 AM - 6:00 AM",
    areas: ["Imus"],
    description:
      "We will be performing network upgrades to improve service quality in the Imus area. Brief intermittent connectivity may occur.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Fiber Line Maintenance - Bacoor",
    date: "January 28, 2026",
    time: "3:00 AM - 5:00 AM",
    areas: ["Bacoor"],
    description:
      "Scheduled maintenance on fiber infrastructure. Minimal impact expected.",
    status: "upcoming",
  },
]

const recentIncidents = [
  {
    id: 1,
    title: "Brief Outage in Bacoor",
    date: "January 15, 2026",
    duration: "45 minutes",
    description:
      "A fiber cut caused a brief service interruption. Our team responded quickly and service was restored.",
    status: "resolved",
  },
  {
    id: 2,
    title: "Intermittent Connectivity - Dasmarinas",
    date: "January 10, 2026",
    duration: "2 hours",
    description:
      "Network congestion during peak hours caused slowdowns. Additional capacity has been provisioned.",
    status: "resolved",
  },
]

const getStatusConfig = (status: string) => {
  switch (status) {
    case "operational":
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        dot: "bg-green-500",
        label: "Operational",
      }
    case "degraded":
      return {
        icon: AlertTriangle,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        dot: "bg-yellow-500",
        label: "Degraded",
      }
    case "outage":
      return {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        dot: "bg-red-500",
        label: "Outage",
      }
    default:
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        dot: "bg-green-500",
        label: "Operational",
      }
  }
}

export default function NetworkPage() {
  // All areas operational for now
  const overallStatus = "operational"
  const statusConfig = getStatusConfig(overallStatus)
  const StatusIcon = statusConfig.icon

  return (
    <main className="pt-16">
      {/* Status Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`py-6 ${statusConfig.bg} border-b ${statusConfig.border}`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusConfig.dot} animate-pulse`} />
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            <span className={`font-medium ${statusConfig.color}`}>
              {overallStatus === "operational"
                ? "All Systems Operational"
                : overallStatus === "degraded"
                ? "Some Systems Experiencing Issues"
                : "Major Outage Detected"}
            </span>
          </div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <section className="py-12 section-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Network Status
            </span>
            <h1 className="text-headline text-foreground mb-4">
              Service Status & Maintenance
            </h1>
            <p className="text-subtitle">
              Stay updated on our network health, scheduled maintenance, and
              service updates across Cavite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Status by Area */}
      <section className="py-12 section-light">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-title mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Service Status by Area
            </h2>

            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-foreground">
                        Area
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-foreground">
                        Status
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-foreground hidden sm:table-cell">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {coverageData.covered.map((area, index) => {
                      const areaStatus = getStatusConfig("operational")
                      return (
                        <motion.tr
                          key={area.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-muted/30"
                        >
                          <td className="px-6 py-4 font-medium text-foreground">
                            {area.name}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-2 ${areaStatus.color}`}>
                              <span className={`w-2 h-2 rounded-full ${areaStatus.dot}`} />
                              {areaStatus.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">
                            Just now
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scheduled Maintenance */}
      <section className="py-12 section-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-title mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Scheduled Maintenance
            </h2>

            <div className="space-y-4">
              {scheduledMaintenance.length > 0 ? (
                scheduledMaintenance.map((maintenance, index) => (
                  <motion.div
                    key={maintenance.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {maintenance.title}
                          </h3>
                          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            Upcoming
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {maintenance.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {maintenance.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {maintenance.areas.join(", ")}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">
                          {maintenance.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <p>No scheduled maintenance at this time.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-12 section-light">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-title mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Incidents
            </h2>

            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white border border-border rounded-xl p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {incident.title}
                    </h3>
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Resolved
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{incident.date}</span>
                    <span>Duration: {incident.duration}</span>
                  </div>
                  <p className="text-sm text-foreground">{incident.description}</p>
                </motion.div>
              ))}

              <div className="text-center pt-4">
                <button className="text-primary hover:underline text-sm font-medium">
                  View Full History
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
