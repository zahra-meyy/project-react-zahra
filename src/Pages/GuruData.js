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
import TextField from '@mui/material/TextField'; // Import TextField for search
import '../Css/GuruData.css';

const GuruData = () => {
  const [formguru, setformGuru] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3030/guru')
      .then((response) => response.json())
      .then((data) => setformGuru(data))
      .catch((error) => console.error('Failed to fetch guru:', error));
  }, []);

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
          .delete(`http://localhost:3030/guru/${id}`)
          .then(() => {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Data berhasil dihapus.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              setformGuru(formguru.filter((guru) => guru.id !== id)); // Menyegarkan data setelah dihapus
            });
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            Swal.fire({
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat menghapus data.',
              icon: 'error',
              confirmButtonText: 'Coba Lagi',
            });
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateGuru/${id}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the data based on the search query
  const filteredGuru = formguru.filter((guru) =>
    guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guru.mapel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="guru-data-container">
      <h2 className="guru-data-title">Data Guru</h2>

      <TextField
        label="Search Guru"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/TambahGuru')}
        sx={{
          backgroundColor: '#FFB6C1',
          color: 'black',
          marginBottom: 2,
          boxShadow: 2,
        }}
      >
        Tambah Data Guru
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
              <TableCell align="center"><b>Mapel</b></TableCell>
              <TableCell align="center"><b>NIK</b></TableCell>
              <TableCell align="center"><b>Jenis Kelamin</b></TableCell>
              <TableCell align="center"><b>Jabatan</b></TableCell>
              <TableCell align="center"><b>Aksi</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGuru.map((guruItem, index) => (
              <TableRow key={guruItem.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="center">{guruItem.nama}</TableCell>
                <TableCell align="center">{guruItem.mapel}</TableCell>
                <TableCell align="center">{guruItem.nik}</TableCell>
                <TableCell align="center">{guruItem.jenis_kelamin}</TableCell>
                <TableCell align="center">{guruItem.jabatan}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(guruItem.id)}
                  >
                    🗑️
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleUpdate(guruItem.id)}
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

export default GuruData;
