import Card from '../components/ui/Card'
import { useEffect } from 'react'
import { useTasksStore } from '../state/useTasksStore'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const COLORS = ['#0d9488', '#AADEA7', '#F66D44', '#FEAE65', '#E6F69D', '#AADEA7', '#2D87BB']

export default function Dashboard() {
  const { items, fetch } = useTasksStore()
  useEffect(() => {
    fetch()
  }, [fetch])

  const total = items.length
  const openCount = items.filter((t) => t.status !== 'Closed').length
  const closedCount = items.filter((t) => t.status === 'Closed').length
  const avgHours = total
    ? (items.reduce((a, b) => a + b.estimatedHours, 0) / total).toFixed(1)
    : '0.0'

  const byStatus = Object.entries(
    items.reduce((acc: Record<string, number>, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1
      return acc
    }, {}),
  ).map(([name, value]) => ({ name, value }))
  const byCategory = Object.entries(
    items.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    }, {}),
  ).map(([name, value]) => ({ name, value }))

  const recent = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Open</p>
            <p className="text-2xl font-semibold">{openCount}</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Closed</p>
            <p className="text-2xl font-semibold">{closedCount}</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Avg Est. Hours</p>
            <p className="text-2xl font-semibold">{avgHours}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-semibold">Tasks per Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={byStatus}
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {byStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#1e1e1e" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3 font-semibold">Tasks per Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis allowDecimals={false} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="top" fill="#fff" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-3 font-semibold">Recent Activity</h3>
        <ul className="space-y-2">
          {recent.map((r) => (
            <li key={r.id} className="text-sm">
              {new Date(r.updatedAt).toLocaleString()} — <strong>{r.title}</strong> ({r.status})
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
