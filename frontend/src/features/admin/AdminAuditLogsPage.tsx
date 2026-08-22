import { useAdminAuditLogs } from './useAdmin'

export function AdminAuditLogsPage() {
  const { data, isLoading } = useAdminAuditLogs()
  const logs = data?.data || []

  return (
    <div className="admin-page">
      <h1>Audit Logs</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Target</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log: any, idx: number) => (
            <tr key={idx}>
              <td>{log.action}</td>
              <td>{log.target_type}: {log.target_id}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
