import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../Css/SiswaData.css';

const SiswaData = () => {
  const [formsiswa, setformsiswa] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const fetchDataSiswa = () => {
    fetch('http://localhost:3030/siswa')
      .then((response) => response.json())
      .then((data) => setformsiswa(data))
      .catch((error) => console.error('Failed to fetch siswa:', error));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/siswa/${id}`)
          .then(() => {
            Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
            fetchDataSiswa();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateSiswa/${id}`);
  };

  return (
    <div className="siswa-data-container">
      <h2 className="siswa-data-title">Data Siswa</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/TambahSiswa')}
        sx={{
          backgroundColor: '#FFB6C1',
          color: 'black',
          marginBottom: 2,
          boxShadow: 2,
        }}
      >
        Tambah Data Siswa
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 4,
          overflowX: 'auto',
          maxWidth: '100%',
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
            <TableRow>
              <TableCell><b>No</b></TableCell>
              <TableCell align="center"><b>Nama</b></TableCell>
              <TableCell align="center"><b>Kelas</b></TableCell>
              <TableCell align="center"><b>Jurusan</b></TableCell>
              <TableCell align="center"><b>NISN</b></TableCell>
              <TableCell align="center"><b>Asal Sekolah</b></TableCell>
              <TableCell align="center"><b>Aksi</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formsiswa.map((SiswaItem, index) => (
              <TableRow
                key={SiswaItem.id}
                hover
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{SiswaItem.nama}</TableCell>
                <TableCell align="center">{SiswaItem.kelas}</TableCell>
                <TableCell align="center">{SiswaItem.jurusan}</TableCell>
                <TableCell align="center">{SiswaItem.nisn}</TableCell>
                <TableCell align="center">{SiswaItem.asal_sekolah}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(SiswaItem.id)}
                  >
                    🗑️
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleUpdate(SiswaItem.id)}
                    sx={{ marginLeft: 1 }}
                  >
                    ✏️
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SiswaData;
