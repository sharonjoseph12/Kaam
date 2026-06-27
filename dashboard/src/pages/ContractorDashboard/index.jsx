import { useState, useEffect } from 'react';
import { Users, MapPin, AlertCircle, ShieldAlert } from 'lucide-react';
import { StatCard, SeverityBadge, EmptyState } from '../../components/ui';
import WorkerForm from './WorkerForm';
import SiteForm from './SiteForm';
import SiteQR from './SiteQR';
import MarkAttendance from './MarkAttendance';
import WageSlipGenerator from './WageSlipGenerator';
import AnomalyAlerts from './AnomalyAlerts';
import { supabase } from '../../supabaseClient';

const SiteTable = ({ sites, headers, renderRow, emptyMessage }) => (
  <div className="table-container">
    {sites.length === 0 ? <EmptyState message={emptyMessage || "No sites available"} /> : (
      <table className="data-table">
        <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{sites.map(renderRow)}</tbody>
      </table>
    )}
  </div>
);

// fallow-ignore-next-line complexity
export default function ContractorDashboard() {
  const [sites, setSites] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [disputes, setDisputes] = useState([]);
  
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [showSiteForm, setShowSiteForm] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [attendanceSite, setAttendanceSite] = useState(null);
  const [wageSlipSite, setWageSlipSite] = useState(null);
  const [resolving, setResolving] = useState(null);
  const [activeTab, setActiveTab] = useState('sites');

  // Default contractor ID for demo if not logged in proper
  const contractorId = 1;

  // fallow-ignore-next-line complexity
  const loadData = async () => {
    try {
      const [{ data: sitesData }, { data: assignmentsData }, { data: disputesData }] = await Promise.all([
        supabase.from('sites').select('*').eq('contractor_id', contractorId),
        supabase.from('worker_site_assignments').select(`
          *,
          profiles:worker_id ( full_name, phone )
        `).eq('contractor_id', contractorId),
        supabase.from('disputes').select(`
          *,
          workers:worker_id ( full_name )
        `).eq('contractor_id', contractorId).eq('status', 'pending')
      ]);

      if (sitesData) setSites(sitesData);
      if (assignmentsData) setAssignments(assignmentsData);
      if (disputesData) setDisputes(disputesData);
    } catch (err) {
      console.error("Error loading contractor dashboard data", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [contractorId]);

  const handleResolveDispute = async (id) => {
    setResolving(id);
    try {
      await supabase.from('disputes').update({ status: 'resolved' }).eq('id', id);
      setDisputes(disputes.filter(d => d.id !== id));
    } catch(e) {
      console.error(e);
    } finally {
      setResolving(null);
    }
  };

  const totalWorkers = [...new Set(assignments.map(a => a.worker_id))].length;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Contractor Overview</h1>
        <p>Manage your sites, track attendance, handle disputes, and monitor AI alerts.</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard icon={Users} label="Total Workers" value={totalWorkers} variant="primary" />
        <StatCard icon={MapPin} label="Active Sites" value={sites.length} variant="success" />
        <StatCard icon={AlertCircle} label="Open Disputes" value={disputes.length} variant={disputes.length > 0 ? "warning" : "primary"} />
        <StatCard icon={ShieldAlert} label="AI Alert Status" value="Scanning" variant="warning" />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${activeTab === 'sites' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('sites')}>Sites & Attendance</button>
        <button className={`btn ${activeTab === 'wages' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('wages')}>Wage Slips</button>
        <button className={`btn ${activeTab === 'ai' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('ai')}>AI Alerts</button>
      </div>

      {activeTab === 'sites' && (
        <div className="fade-in">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button className="btn btn-primary" onClick={() => { setShowSiteForm(!showSiteForm); setShowWorkerForm(false); }}>
              {showSiteForm ? 'Close Site Form' : '+ Create New Site'}
            </button>
            <button className="btn btn-primary" onClick={() => { setShowWorkerForm(!showWorkerForm); setShowSiteForm(false); }}>
              {showWorkerForm ? 'Close Worker Form' : '+ Add New Worker'}
            </button>
          </div>

          {showSiteForm && (
            <div style={{ marginBottom: '1rem' }}>
              <SiteForm contractorId={contractorId} onSiteCreated={(newSite) => {
                setSites([...sites, newSite]);
                setShowSiteForm(false);
              }} />
            </div>
          )}

          {showWorkerForm && (
            <div style={{ marginBottom: '1rem' }}>
              <WorkerForm sites={sites} onWorkerAdded={() => {
                loadData();
                setShowWorkerForm(false);
              }} />
            </div>
          )}

          <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card glass-card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}><MapPin size={18} style={{ verticalAlign: 'middle', marginRight: 8 }}/>Your Sites</h3>
              {sites.length === 0 ? <EmptyState message="No sites created yet" /> : (
                <SiteTable 
                  sites={sites} 
                  headers={["Name", "Workers", "Action"]} 
                  renderRow={site => (
                    <tr key={site.id}>
                      <td>{site.name}</td>
                      <td>{assignments.filter(a => a.site_id === site.id).length}</td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => setSelectedSite(site)} style={{ marginRight: '0.5rem' }}>View QR</button>
                        <button className="btn btn-sm btn-primary" onClick={() => setAttendanceSite(site)}>Mark Attendance</button>
                      </td>
                    </tr>
                  )} 
                />
              )}
            </div>
            
            <div>
              {selectedSite && (
                <div className="card glass-card slide-up">
                  <SiteQR site={selectedSite} />
                  <button className="btn btn-sm btn-outline" onClick={() => setSelectedSite(null)} style={{ marginTop: '1rem' }}>Close QR</button>
                </div>
              )}
              {attendanceSite && (
                <div className="card glass-card slide-up">
                  <MarkAttendance 
                    site={attendanceSite} 
                    assignments={assignments.filter(a => a.site_id === attendanceSite.id)} 
                    onAttendanceMarked={() => {
                      setAttendanceSite(null);
                      loadData();
                    }} 
                  />
                  <button className="btn btn-sm btn-outline" onClick={() => setAttendanceSite(null)} style={{ marginTop: '1rem' }}>Cancel</button>
                </div>
              )}
            </div>
          </div>

          {disputes.length > 0 && (
            <div className="card glass-card slide-up" style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Open Disputes</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Worker</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputes.map(d => (
                      <tr key={d.id}>
                        <td>{d.workers?.full_name || 'Unknown'}</td>
                        <td>
                          <SeverityBadge severity="HIGH" label={d.alert_type} />
                        </td>
                        <td>{d.description}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-success" 
                            onClick={() => handleResolveDispute(d.id)}
                            disabled={resolving === d.id}
                          >
                            {resolving === d.id ? 'Resolving...' : 'Accept & Resolve'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'wages' && (
        <div className="fade-in">
          {sites.length === 0 ? (
            <EmptyState message="No sites available for wage slip generation. Please create a site and mark attendance first." />
          ) : (
            <div className="grid-2">
              <div className="card glass-card">
                <h3 style={{ marginBottom: 'var(--space-md)' }}>Select Site for Wage Slips</h3>
                <SiteTable 
                  sites={sites} 
                  headers={["Site Name", "Action"]} 
                  renderRow={site => (
                    <tr key={site.id}>
                      <td>{site.name}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => setWageSlipSite(site)}>Select</button>
                      </td>
                    </tr>
                  )}
                />
              </div>

              <div>
                {wageSlipSite && (
                  <div className="card glass-card slide-up">
                    <WageSlipGenerator 
                      site={wageSlipSite} 
                      assignments={assignments.filter(a => a.site_id === wageSlipSite.id)} 
                      onGenerated={() => setTimeout(() => setWageSlipSite(null), 3000)}
                    />
                    <button className="btn btn-sm btn-outline" onClick={() => setWageSlipSite(null)} style={{ marginTop: '1rem' }}>Close</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'ai' && (
        <AnomalyAlerts />
      )}
    </div>
  );
}
