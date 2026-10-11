function formatValue(value, field) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item, field)).join(', ')
  }

  if (typeof value === 'object') {
    return value.name || value.username || value._id || JSON.stringify(value)
  }

  if (field === 'date' || field.endsWith('At')) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: field === 'date' ? 'short' : undefined,
      }).format(date)
    }
  }

  return String(value)
}

function ResourcePage({ title, description, records, columns, loading, error, emptyMessage }) {
  return (
    <section aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1 className="page-title" id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        {!loading && !error && (
          <span className="record-count">
            {records.length} {records.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Couldn’t load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state" role="status">
          <span aria-hidden="true" className="spinner-border spinner-border-sm" />
          <span>Loading {title.toLowerCase()}…</span>
        </div>
      ) : !error && records.length === 0 ? (
        <div className="empty-state">
          <h2>Nothing here yet</h2>
          <p>{emptyMessage}</p>
        </div>
      ) : !error ? (
        <div className="table-responsive data-card">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                {columns.map(({ field, label }) => <th key={field} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || `${title}-${index}`}>
                  {columns.map(({ field }) => (
                    <td key={field}>{formatValue(record[field], field)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default ResourcePage
