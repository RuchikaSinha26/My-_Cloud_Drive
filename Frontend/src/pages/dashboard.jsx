import React, { useState, useEffect } from 'react';
// Icons import kar rahe hain alag-alag libraries se
import { FaCloudUploadAlt, FaTrash, FaFolder, FaStar, FaRegClock, FaSearch, FaUserCircle } from 'react-icons/fa';
import { MdOutlineDns, MdMoreVert } from 'react-icons/md';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files");
      if (res.ok) {
        const data = await res.json();
        setAllFiles(data);
      }
    } catch (err) { console.error("Fetch failed", err); }
  };

  useEffect(() => { fetchFiles(); }, []);

  const uploadFile = async () => {
    if (!file) return alert("Pehle file select karlo!");
    const fd = new FormData();
    fd.append("file", file);
    try {
      await fetch("http://localhost:5000/api/files/upload", { method: "POST", body: fd });
      setFile(null); // Input clear
      fetchFiles(); // List refresh
    } catch (err) { alert("Upload fail!"); }
  };

  const deleteFile = async (name) => {
    if (window.confirm(`Kya pakka "${name}" delete karni hai?`)) {
      await fetch(`http://localhost:5000/api/files/${name}`, { method: "DELETE" });
      fetchFiles();
    }
  };

  // 1. Sidebar Item Component (Reuse karne ke liye)
  const SidebarItem = ({ icon: Icon, label, active }) => (
    <li style={{
      display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px',
      cursor: 'pointer', borderRadius: '0 25px 25px 0', fontSize: '15px', color: active ? '#1967d2' : '#5f6368',
      backgroundColor: active ? '#e8f0fe' : 'transparent', fontWeight: active ? '500' : 'normal',
      marginTop: '5px'
    }}>
      <Icon size={20} style={{ color: active ? '#1967d2' : '#5f6368' }} />
      {label}
    </li>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* 2. Professional Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #ddd', paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '20px', marginBottom: '30px' }}>
          <FaCloudUploadAlt size={35} style={{ color: '#4285F4' }} />
          <h2 style={{ color: '#5f6368', margin: 0, fontSize: '22px' }}>CloudDrive</h2>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <SidebarItem icon={FaFolder} label="My Drive" active />
          <SidebarItem icon={MdOutlineDns} label="All Files" />
          <SidebarItem icon={FaRegClock} label="Recent" />
          <SidebarItem icon={FaStar} label="Starred" />
          <SidebarItem icon={FaTrash} label="Trash" />
        </ul>
      </div>

      {/* 3. Main Content Area */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Top Search Bar & Profile */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f4', borderRadius: '8px', width: '500px' }}>
            <FaSearch size={18} style={{ color: '#5f6368', marginLeft: '15px', position: 'absolute' }} />
            <input 
              type="text" 
              placeholder="Search in Drive..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '12px 12px 12px 50px', width: '100%', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', outline: 'none', fontSize: '15px' }}
            />
          </div>
          <FaUserCircle size={40} style={{ color: '#ddd', cursor: 'pointer' }} />
        </div>

        {/* 4. Upload Area (Thoda modern box style) */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>Upload New File</h3>
            <p style={{ margin: 0, color: '#5f6368', fontSize: '14px' }}>Select a file to upload to your secure cloud drive</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ padding: '8px' }} />
            <button 
              onClick={uploadFile} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              <FaCloudUploadAlt size={18} /> Upload
            </button>
          </div>
        </div>

        {/* 5. Modern Files Table with Details */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h4 style={{ margin: '0 0 20px 0', color: '#5f6368' }}>Recent Files ({allFiles.length})</h4>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f3f4', textAlign: 'left', color: '#5f6368', fontSize: '13px' }}>
                <th style={{ padding: '12px' }}>File Name</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allFiles.length > 0 ? allFiles
                .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((f, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f3f4', fontSize: '14px', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background="#f8f9fa"} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FaFolder size={18} style={{ color: '#FBBC05' }} /> 
                      <span style={{ cursor: 'pointer', color: '#3c4043' }} title={f.name}>{f.name}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <a 
                          href={`http://localhost:5000/uploads/${f.name}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ color: '#4285F4', textDecoration: 'none', fontWeight: '500', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#e8f0fe', fontSize: '13px' }}>
                          View
                        </a>
                        <FaTrash 
                          onClick={() => deleteFile(f.name)} 
                          style={{ color: '#d93025', cursor: 'pointer', opacity: 0.7 }} 
                          size={16} 
                          title="Delete File"
                        />
                      </div>
                    </td>
                  </tr>
                )) : (
                <tr>
                  <td colSpan="2" style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                    <FaCloudUploadAlt size={40} style={{ color: '#eee', marginBottom: '10px' }} /><br/>
                    No files found. Start uploading!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}